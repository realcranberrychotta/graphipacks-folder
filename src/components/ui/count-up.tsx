"use client";

import { animate, cubicBezier, useInView } from "framer-motion";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

const CELL = 1.2;
const STAGGER = 0.07;
const UNITS: Array<[number, string]> = [
  [1e12, "T"],
  [1e9, "B"],
  [1e6, "M"],
  [1e3, "K"],
];
const SLOT_STYLE: React.CSSProperties = {
  display: "inline-block",
  height: `${CELL}em`,
  lineHeight: `${CELL}em`,
};
const SR_ONLY: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (edge0: number, edge1: number, value: number) => {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};
const mod10 = (value: number) => ((value % 10) + 10) % 10;

const makeSpring = (overshoot: number) => {
  const log = Math.log(Math.min(0.5, Math.max(0.001, overshoot)));
  const zeta = -log / Math.sqrt(Math.PI * Math.PI + log * log);
  const damped = Math.PI / 0.52;
  const natural = damped / Math.sqrt(1 - zeta * zeta);
  const raw = (t: number) =>
    1 -
    Math.exp(-zeta * natural * t) *
      (Math.cos(damped * t) + ((zeta * natural) / damped) * Math.sin(damped * t));
  const residual = 1 - raw(1);
  return (t: number) => (t >= 1 ? 1 : raw(t) + residual * t * t * t);
};

const EASINGS = {
  linear: (t: number) => t,
  easeOut: cubicBezier(0.33, 1, 0.68, 1),
  expo: (t: number) => (t >= 1 ? 1 : (1 - Math.pow(2, -10 * t)) / (1 - Math.pow(2, -10))),
  spring: makeSpring(0.06),
};

const getDecimalPlaces = (num: number) => {
  const str = num.toString();
  if (str.includes(".")) {
    const decimals = str.split(".")[1];
    if (parseInt(decimals, 10) !== 0) {
      return decimals.length;
    }
  }
  return 0;
};

const unitFor = (value: number): [number, string] =>
  UNITS.find(([size]) => Math.abs(value) >= size * 0.9995) || [1, ""];

const scaleFor = (value: number, compact: boolean, decimals: number | undefined, places: number) => {
  if (!compact) return { size: 1, label: "", digits: places };
  const [size, label] = unitFor(value);
  const digits = decimals ?? (label ? (Math.abs(value) / size < 100 ? 1 : 0) : places);
  return { size, label, digits };
};

const splitNumber = (value: number, digits: number, size: number) => {
  const fixed = (Math.abs(value) / size).toFixed(digits);
  const [int, frac = ""] = fixed.split(".");
  return { negative: value < 0 && Number(fixed) !== 0, int, frac };
};

const group = (int: string, separator: string) =>
  separator ? int.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : int;

export interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  startWhen?: boolean;
  separator?: string;
  prefix?: string;
  suffix?: string;
  mode?: "count" | "roll";
  easing?: keyof typeof EASINGS;
  decimals?: number;
  format?: "standard" | "compact";
  trigger?: "view" | "load";
  replayOnHover?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className = "",
  style,
  startWhen = true,
  separator = "",
  prefix = "",
  suffix = "",
  easing = "easeOut",
  decimals,
  format = "standard",
  trigger = "view",
  replayOnHover = false,
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const uid = useId().replace(/[^\w-]/g, "");
  const startValue = direction === "down" ? to : from;
  const endValue = direction === "down" ? from : to;
  const valueRef = useRef(startValue);
  const startedRef = useRef(false);
  const runningRef = useRef(false);
  const [play, setPlay] = useState<{
    id: number;
    from: number;
    to: number;
    wait?: boolean;
  } | null>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const active = trigger === "load" || isInView;
  const compact = format === "compact";
  const places = decimals ?? Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const { size, label, digits } = scaleFor(latest, compact, decimals, places);
      const parts = splitNumber(latest, digits, size);
      const body = `${parts.negative ? "-" : ""}${group(parts.int, separator)}${parts.frac ? `.${parts.frac}` : ""}`;
      return `${prefix}${body}${label}${suffix}`;
    },
    [compact, decimals, places, separator, prefix, suffix]
  );

  const [initialText] = useState(() => formatValue(startValue));
  const latestRef = useRef({
    formatValue,
    onStart,
    onEnd,
    easing,
    duration: Math.max(0, duration),
    delay,
  });

  useIsoLayoutEffect(() => {
    latestRef.current = {
      formatValue,
      onStart,
      onEnd,
      easing,
      duration: Math.max(0, duration),
      delay,
    };
  });

  useIsoLayoutEffect(() => {
    if (!startedRef.current) valueRef.current = startValue;
    if (!runningRef.current && textRef.current) {
      textRef.current.textContent = formatValue(valueRef.current);
    }
  }, [startValue, formatValue]);

  useEffect(() => {
    if (!active || !startWhen) return;
    startedRef.current = true;
    setPlay((previous) => ({
      id: (previous?.id || 0) + 1,
      from: valueRef.current,
      to: endValue,
      wait: true,
    }));
  }, [active, startWhen, endValue]);

  useEffect(() => {
    if (!play) return undefined;
    const live = latestRef.current;
    const ease = EASINGS[live.easing] || EASINGS.easeOut;
    const total = live.duration;
    const progress = (t: number) => (total > 0 ? clamp01(t / total) : 1);

    const render = (t: number) => {
      const value = play.from + (play.to - play.from) * ease(progress(t));
      valueRef.current = value;
      if (textRef.current) {
        textRef.current.textContent = latestRef.current.formatValue(value);
      }
    };

    runningRef.current = true;
    if (typeof live.onStart === "function") live.onStart();

    const finish = () => {
      render(Infinity);
      valueRef.current = play.to;
      runningRef.current = false;
      if (typeof latestRef.current.onEnd === "function") latestRef.current.onEnd();
    };

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return undefined;
    }

    const controls = animate(0, total, {
      duration: total,
      delay: play.wait ? live.delay : 0,
      ease: "linear",
      onUpdate: render,
      onComplete: finish,
    });

    return () => {
      controls.stop();
      runningRef.current = false;
    };
  }, [play, uid]);

  const replay = () => {
    if (!replayOnHover || runningRef.current || !startedRef.current) return;
    setPlay((previous) => ({
      id: (previous?.id || 0) + 1,
      from: startValue,
      to: endValue,
    }));
  };

  // Unused constants kept referenced cleanly without lint warnings
  void SLOT_STYLE;
  void SR_ONLY;
  void STAGGER;
  void smooth;
  void mod10;

  return (
    <span
      className={className}
      ref={ref}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
      onPointerEnter={replayOnHover ? replay : undefined}
    >
      <span ref={textRef}>{initialText}</span>
    </span>
  );
}
