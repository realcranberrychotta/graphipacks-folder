"use client";

import * as React from "react";
import { useEffect, useState, useRef, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export const DEFAULT_PRODUCTS = [
  "Agriculture Mulch Film",
  "Grow Bags",
  "Coir Pith 50L & 5kg Block Bags",
  "Laminated Rolls & Pouches",
  "PP & LLDPE Bags",
  "Wicketted Poly Bags",
];

interface ProductTypewriterProps {
  items?: string[];
  prefix?: string;
  className?: string;
}

export default function ProductTypewriter({
  items,
  prefix = "WE MAKE:",
  className = "",
}: ProductTypewriterProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const itemsKey = items ? items.join("::") : "";
  const resolvedItems = useMemo(() => {
    if (items && items.length > 0) return items;
    return DEFAULT_PRODUCTS;
  }, [itemsKey]);

  const [displayText, setDisplayText] = useState("");
  const [isSkipped, setIsSkipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(!shouldReduceMotion);

  const stateRef = useRef({
    itemIndex: 0,
    subIndex: 0,
    isDeleting: false,
    isPaused: false,
    isPlaying: !shouldReduceMotion,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInViewRef = useRef(true);
  const itemsRef = useRef(resolvedItems);
  const currentDelayRef = useRef(60);
  const lastTickTimeRef = useRef(0);
  const tickRef = useRef<() => void>(() => {});

  useEffect(() => {
    itemsRef.current = resolvedItems;
  }, [resolvedItems]);

  const scheduleNextTick = (delay: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    currentDelayRef.current = delay;
    lastTickTimeRef.current = performance.now();
    timerRef.current = setTimeout(() => {
      tickRef.current();
    }, delay);
  };

  const tick = () => {
    const { itemIndex, subIndex, isDeleting } = stateRef.current;
    const currentWord = itemsRef.current[itemIndex] || "";

    if (!isDeleting) {
      if (subIndex < currentWord.length) {
        setDisplayText(currentWord.substring(0, subIndex + 1));
        stateRef.current.subIndex = subIndex + 1;
        scheduleNextTick(65);
      } else {
        stateRef.current.isDeleting = true;
        stateRef.current.isPaused = true;
        scheduleNextTick(1800);
      }
    } else {
      if (stateRef.current.isPaused) {
        stateRef.current.isPaused = false;
      }
      if (subIndex > 0) {
        setDisplayText(currentWord.substring(0, subIndex - 1));
        stateRef.current.subIndex = subIndex - 1;
        scheduleNextTick(35);
      } else {
        stateRef.current.isDeleting = false;
        stateRef.current.itemIndex = (itemIndex + 1) % itemsRef.current.length;
        scheduleNextTick(400);
      }
    }
  };

  useEffect(() => {
    tickRef.current = tick;
  });

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stateRef.current.isPlaying = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setIsPlaying(true);
      stateRef.current.isPlaying = true;
      scheduleNextTick(100);
    }
  };

  useEffect(() => {
    const handleSkip = () => {
      setIsSkipped(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      setDisplayText(itemsRef.current.join(" · "));
    };
    window.addEventListener("skip-hero-animation", handleSkip);
    return () => window.removeEventListener("skip-hero-animation", handleSkip);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(resolvedItems[0]);
      return;
    }

    scheduleNextTick(200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [shouldReduceMotion, resolvedItems]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center gap-2 sm:gap-3 py-1.5 px-3 sm:px-4 rounded-full border border-powder/40 bg-navy ${className}`}
    >
      <div className="flex items-center gap-1.5 xs:gap-2 shrink-0 select-none">
        <span
          className="h-1.5 w-1.5 rounded-full bg-red"
          aria-hidden="true"
        />
        <span className="font-mono text-[10px] xs:text-[11px] sm:text-xs font-bold tracking-[0.16em] sm:tracking-[0.22em] text-powder uppercase whitespace-nowrap">
          {prefix}
        </span>
      </div>

      <div className="flex items-center shrink min-w-0 font-sans text-xs xs:text-[13px] sm:text-base md:text-lg font-semibold text-background tracking-tight break-words whitespace-normal sm:whitespace-nowrap">
        <span className="text-background select-none">
          {displayText}
        </span>
        {!shouldReduceMotion && !isSkipped && isPlaying && (
          <span
            className="text-red ml-0.5 sm:ml-1 font-mono font-bold animate-pulse select-none inline-block shrink-0"
            aria-hidden="true"
          >
            |
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleTogglePlay}
        aria-label={
          isPlaying
            ? "Pause product showcase"
            : "Play product showcase"
        }
        title={
          isPlaying
            ? "Pause product showcase"
            : "Play product showcase"
        }
        className="relative ml-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-powder/40 bg-navy text-powder hover:border-powder hover:text-background transition-colors duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-powder after:content-[''] after:absolute after:-inset-2.5 sm:after:-inset-2"
      >
        {isPlaying ? (
          <Pause className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />
        ) : (
          <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-0.5" aria-hidden="true" />
        )}
      </button>

      <span className="sr-only">
        Graphipacks produces: {resolvedItems.join(", ")}
      </span>
    </div>
  );
}
