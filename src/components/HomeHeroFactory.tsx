"use client";

import React, { Component, useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { MACHINE_STATIONS, type MachineStationConfig } from "@/lib/machine-stations";

// Dynamically import 3D model with next/dynamic and ssr: false
const AgenticFactory3D = dynamic(() => import("@/components/ui/agentic-factory-3d"), {
  ssr: false,
});

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  onError: () => void;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class MachineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function MachineFallbackVisual({
  activeStationId,
  onSelectStation,
}: {
  activeStationId: string | null;
  onSelectStation: (id: string) => void;
}) {
  return (
    <div
      data-machine-fallback="true"
      className="relative w-full h-full flex items-center justify-center p-2 md:justify-end md:p-0 md:pr-4 lg:pr-8"
    >
      <div className="relative w-full h-full rounded-xl border border-[#A8DADC]/55 bg-[#F1FAEE]/60 overflow-hidden md:w-[56%] md:h-[540px] md:max-w-[740px] md:rounded-2xl md:border-[#A8DADC]/45 md:bg-[#F1FAEE]/45">
        <Image
          src="/images/machine-3d-fallback.webp"
          alt="Graphipacks 6-station flexible packaging manufacturing line"
          fill
          priority
          sizes="(max-width: 767px) 92vw, (max-width: 1280px) 56vw, 720px"
          className="object-contain p-2 sm:p-4 select-none"
        />

        {/* Interactive Hotspot Pins over Static Fallback */}
        {MACHINE_STATIONS.map((station) => {
          const isActive = activeStationId === station.id;
          return (
            <button
              key={station.id}
              type="button"
              data-hotspot-id={station.id}
              aria-label={`Inspect station ${station.numeral}: ${station.title}`}
              aria-pressed={isActive}
              onClick={() => onSelectStation(station.id)}
              style={{
                left: station.fallbackPin.left,
                top: station.fallbackPin.top,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 w-[30px] h-[30px] rounded-full bg-[#1D3557] text-[#F1FAEE] font-mono text-[11px] font-bold inline-flex items-center justify-center shadow-md transition-colors duration-200 cursor-pointer border ${
                isActive
                  ? "border-[#E63946] ring-3 ring-[#E63946]/35"
                  : "border-[#A8DADC] hover:border-[#F1FAEE]"
              }`}
            >
              <span>{station.numeral}</span>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#E63946] border border-[#F1FAEE]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HomeHeroFactory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [hasEnteredView, setHasEnteredView] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [activeStationId, setActiveStationId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const shouldReduceMotionRef = useRef(Boolean(shouldReduceMotion));

  const activeStation: MachineStationConfig | null =
    MACHINE_STATIONS.find((s) => s.id === activeStationId) ?? null;

  const signal3DReady = useCallback(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __graphipacks3DReady?: boolean }).__graphipacks3DReady = true;
      window.dispatchEvent(new CustomEvent("graphipacks-3d-ready"));
    }
  }, []);

  const handleFallback = useCallback(() => {
    setUseFallback(true);
    signal3DReady();
  }, [signal3DReady]);

  useEffect(() => {
    shouldReduceMotionRef.current = Boolean(shouldReduceMotion);
    if (typeof window !== "undefined" && shouldReduceMotion) {
      window.__machine?.pause?.();
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    setMounted(true);

    const media = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => {
      setIsDesktop(media.matches);
    };
    syncViewport();
    media.addEventListener("change", syncViewport);

    if (!checkWebGLSupport()) {
      handleFallback();
    }

    const handleSkip = () => {
      if (typeof window !== "undefined" && !shouldReduceMotionRef.current) {
        window.__machine?.play?.();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveStationId(null);
      }
    };

    window.addEventListener("skip-hero-animation", handleSkip);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      media.removeEventListener("change", syncViewport);
      window.removeEventListener("skip-hero-animation", handleSkip);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFallback]);

  // IntersectionObserver: Mount once in view, and pause/resume 3D RAF loop when scrolled out of viewport
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible) {
          setHasEnteredView(true);
        }
        if (!visible) {
          if (typeof window !== "undefined") {
            window.__machine?.pause?.();
          }
        } else if (!shouldReduceMotionRef.current) {
          if (typeof window !== "undefined") {
            window.__machine?.play?.();
          }
        }
      },
      { rootMargin: "50px", threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  // Parallax effect on desktop hero machine only (disabled on reduced motion & mobile)
  const { scrollY } = useScroll();
  const rawParallaxY = useTransform(scrollY, [0, 80], [0, 40], { clamp: true });
  const parallaxY = !isDesktop || shouldReduceMotion ? 0 : rawParallaxY;

  const frameHeight = isDesktop ? 720 : 280;

  const fallbackNode = (
    <MachineFallbackVisual
      activeStationId={activeStationId}
      onSelectStation={(id) => setActiveStationId(id)}
    />
  );

  const specOverlayCard = (
    <AnimatePresence mode="wait">
      {activeStation && (
        <motion.div
          key={activeStation.id}
          role="region"
          aria-label={`Station ${activeStation.numeral} specifications`}
          data-station-card={activeStation.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 p-4 rounded-lg bg-[#1D3557] border border-[#A8DADC]/40 text-[#F1FAEE] shadow-[0_12px_32px_rgba(29,53,87,0.28)] md:mt-0 md:pointer-events-auto md:absolute md:top-24 md:right-6 lg:right-10 md:w-[300px] md:z-20 md:rounded-xl md:border-[#A8DADC] md:bg-[#1D3557]/[0.94]"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E63946] shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#A8DADC]">
                STATION {activeStation.numeral}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveStationId(null)}
              aria-label="Close station details and reset to overview"
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#A8DADC]/35 text-[#F1FAEE]/85 hover:bg-[#457B9D]/40 hover:text-[#F1FAEE] transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-[#F1FAEE]">
            {activeStation.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#F1FAEE]/85 font-sans">
            {activeStation.spec}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const stationPillBar = (
    <div
      role="group"
      aria-label="Machine station views"
      className="pointer-events-auto mt-3 flex flex-wrap items-center justify-center gap-1.5 w-full md:mt-0 md:w-auto md:absolute md:bottom-12 md:right-6 lg:right-10 md:z-20 md:justify-end md:max-w-[54%]"
    >
      <button
        type="button"
        onClick={() => setActiveStationId(null)}
        aria-pressed={activeStationId === null}
        data-station-pill="overview"
        className={`min-h-[34px] rounded-full px-3 py-1 font-mono text-[11px] font-semibold border transition-colors duration-200 cursor-pointer ${
          activeStationId === null
            ? "bg-[#1D3557] text-[#F1FAEE] border-[#1D3557]"
            : "bg-[#F1FAEE] text-[#1D3557] border-[#A8DADC] hover:border-[#457B9D]"
        }`}
      >
        Overview
      </button>
      {MACHINE_STATIONS.map((station) => {
        const isActive = activeStationId === station.id;
        return (
          <button
            key={station.id}
            type="button"
            onClick={() => setActiveStationId(station.id)}
            aria-pressed={isActive}
            data-station-pill={station.id}
            className={`inline-flex items-center gap-1.5 min-h-[34px] rounded-full px-3 py-1 font-mono text-[11px] font-semibold border transition-colors duration-200 cursor-pointer ${
              isActive
                ? "bg-[#1D3557] text-[#F1FAEE] border-[#1D3557]"
                : "bg-[#F1FAEE] text-[#1D3557] border-[#A8DADC] hover:border-[#457B9D]"
            }`}
          >
            {isActive && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#E63946] shrink-0" aria-hidden="true" />
            )}
            <span>
              {station.numeral} {station.shortLabel}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full md:h-[720px] md:overflow-hidden"
      style={{ contain: "layout paint" }}
    >
      <div className="relative w-full h-[280px] rounded-xl border border-[#A8DADC]/60 bg-[#F1FAEE]/50 overflow-hidden md:h-full md:rounded-none md:border-0 md:bg-transparent">
        <motion.div
          style={{
            y: parallaxY,
          }}
          className="hero-parallax-machine relative w-full h-full"
        >
          {mounted && hasEnteredView && (
            <div className="relative z-10 w-full h-full hero-factory-3d-wrap">
              {useFallback ? (
                fallbackNode
              ) : (
                <MachineErrorBoundary onError={handleFallback} fallback={fallbackNode}>
                  <AgenticFactory3D
                    embed
                    height={frameHeight}
                    activeStationId={activeStationId}
                    onSelectStation={(id) => setActiveStationId(id)}
                    onFallback={handleFallback}
                    onReady={signal3DReady}
                  />
                </MachineErrorBoundary>
              )}
            </div>
          )}
        </motion.div>

      </div>

      {/* Station Spec Card: normal flow below canvas on mobile, corner overlay on desktop */}
      {specOverlayCard}

      {/* Compact Station Selector Pill Row */}
      {stationPillBar}
    </div>
  );
}
