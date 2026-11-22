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
  "Wicked Poly Bags",
];

interface ProductTypewriterProps {
  items?: string[];
  prefix?: string;
  className?: string;
}

export default function ProductTypewriter({
  items,
  prefix = "We make :",
  className = "",
}: ProductTypewriterProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Stable items list: default to the 6 core products if none provided
  const resolvedItems = useMemo(() => {
    if (items && items.length > 0) return items;
    return DEFAULT_PRODUCTS;
  }, [items ? items.join("::") : ""]);

  const [displayText, setDisplayText] = useState("");
  const [isSkipped, setIsSkipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(!shouldReduceMotion);
  const [isFinished, setIsFinished] = useState(false);

  // Animation state in refs so timers are never interrupted by re-renders
  const stateRef = useRef({
    itemIndex: 0,
    subIndex: 0,
    isDeleting: false,
    isPaused: false,
    isPlaying: !shouldReduceMotion,
    isFinished: false,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInViewRef = useRef(true);
  const itemsRef = useRef(resolvedItems);
  const currentDelayRef = useRef(60);
  const lastTickTimeRef = useRef(0);
  const tickRef = useRef<() => void>(() => {});

  // Keep itemsRef synchronized
  useEffect(() => {
    itemsRef.current = resolvedItems;
  }, [resolvedItems]);

  // Keep stateRef.current.isPlaying synchronized
  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
  }, [isPlaying]);

  // Listen for skip hero animation event
  useEffect(() => {
    const handleSkip = () => {
      setIsSkipped(true);
      setIsPlaying(false);
      stateRef.current.isPlaying = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setDisplayText(resolvedItems[0] || "");
    };

    window.addEventListener("skip-hero-animation", handleSkip);
    return () => window.removeEventListener("skip-hero-animation", handleSkip);
  }, [resolvedItems]);

  // Handle prefers-reduced-motion: freeze on first product name statically
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsPlaying(false);
      setIsFinished(false);
      stateRef.current.isPlaying = false;
      stateRef.current.isFinished = false;
      setDisplayText(resolvedItems[0] || "");
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [shouldReduceMotion, resolvedItems]);

  useEffect(() => {
    // If reduced motion is requested or animation was skipped, show first product instantly with no timer/animation
    if (shouldReduceMotion || isSkipped) {
      setDisplayText(resolvedItems[0] || "");
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const scheduleNextTick = (delay: number) => {
      currentDelayRef.current = delay;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (stateRef.current.isPlaying && !stateRef.current.isFinished) {
        timerRef.current = setTimeout(tick, delay);
      }
    };

    const tick = () => {
      lastTickTimeRef.current = performance.now();

      if (!isInViewRef.current || !stateRef.current.isPlaying || stateRef.current.isFinished) {
        timerRef.current = null;
        return;
      }

      const currentItems = itemsRef.current;
      if (!currentItems || currentItems.length === 0) return;

      // Safely bound itemIndex
      if (stateRef.current.itemIndex >= currentItems.length) {
        stateRef.current.itemIndex = 0;
      }

      const currentItem = currentItems[stateRef.current.itemIndex] || "";
      let nextDelay = 60; // Forward typing speed: 60ms

      if (stateRef.current.isPaused) {
        // Finished 2-second hold at full word -> start backspacing
        stateRef.current.isPaused = false;
        stateRef.current.isDeleting = true;
        nextDelay = 35; // Deleting speed: 35ms
      } else if (stateRef.current.isDeleting) {
        if (stateRef.current.subIndex > 0) {
          stateRef.current.subIndex -= 1;
          nextDelay = 35; // Deleting speed: 35ms
        } else {
          // Finished deleting -> move to next product in order
          stateRef.current.isDeleting = false;
          stateRef.current.itemIndex = stateRef.current.itemIndex + 1;
          nextDelay = 350; // Pause before typing next product: 350ms
        }
      } else {
        // Typing forward
        if (stateRef.current.subIndex < currentItem.length) {
          stateRef.current.subIndex += 1;
          nextDelay = 60; // Typing speed: 60ms
        } else {
          // Fully typed out
          // If this is the last product (index 5 of 6 products), STOP permanently!
          const isLast = stateRef.current.itemIndex >= currentItems.length - 1;
          if (isLast) {
            stateRef.current.isFinished = true;
            stateRef.current.isPlaying = false;
            setIsFinished(true);
            setIsPlaying(false);
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
            return;
          }

          // Not the last product -> hold for 2 seconds (2000ms), then delete
          stateRef.current.isPaused = true;
          nextDelay = 2000; // Hold for 2 seconds
        }
      }

      const activeItem = currentItems[stateRef.current.itemIndex] || "";
      setDisplayText(activeItem.substring(0, stateRef.current.subIndex));

      scheduleNextTick(nextDelay);
    };

    tickRef.current = tick;

    // Start typing if playing and not finished
    if (stateRef.current.isPlaying && !stateRef.current.isFinished) {
      scheduleNextTick(100);
    }

    // IntersectionObserver: Pause when out of view, resume immediately when back in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        isInViewRef.current = inView;
        if (inView) {
          // Component back in view: resume typing immediately if playing
          if (!timerRef.current && stateRef.current.isPlaying && !stateRef.current.isFinished) {
            scheduleNextTick(60);
          }
        } else {
          // Out of view: pause timer
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Mobile / Touch / Tab resume handlers: ensure typing never stalls on touch devices
    const handleResume = () => {
      if (document.visibilityState === "hidden") return;

      const now = performance.now();
      const elapsed = now - lastTickTimeRef.current;

      // If timer stalled during backgrounding or touch scroll, restart immediately if playing
      if (isInViewRef.current && stateRef.current.isPlaying && !stateRef.current.isFinished) {
        if (!timerRef.current || elapsed > currentDelayRef.current + 400) {
          tick();
        }
      }
    };

    document.addEventListener("visibilitychange", handleResume);
    window.addEventListener("touchstart", handleResume, { passive: true });
    window.addEventListener("touchend", handleResume, { passive: true });
    window.addEventListener("focus", handleResume);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleResume);
      window.removeEventListener("touchstart", handleResume);
      window.removeEventListener("touchend", handleResume);
      window.removeEventListener("focus", handleResume);
    };
  }, [shouldReduceMotion, isSkipped]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFinished) {
      // Restart full cycle from product 0
      stateRef.current = {
        itemIndex: 0,
        subIndex: 0,
        isDeleting: false,
        isPaused: false,
        isPlaying: true,
        isFinished: false,
      };
      setIsFinished(false);
      setIsPlaying(true);
      setDisplayText("");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        tickRef.current();
      }, 100);
      return;
    }

    if (isPlaying) {
      // Pause in place
      stateRef.current.isPlaying = false;
      setIsPlaying(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {
      // Play / Resume
      stateRef.current.isPlaying = true;
      setIsPlaying(true);
      if (stateRef.current.subIndex === 0 && displayText === "") {
        stateRef.current.subIndex = 1;
        const current = itemsRef.current[stateRef.current.itemIndex] || "";
        setDisplayText(current.substring(0, 1));
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        tickRef.current();
      }, 60);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center flex-nowrap max-w-[calc(100vw-1.5rem)] sm:max-w-max rounded-lg border border-[#B08D57]/30 bg-[#0F2A44]/70 px-2.5 py-1.5 xs:px-3 sm:px-4 sm:py-2.5 gap-1.5 xs:gap-2 sm:gap-3 backdrop-blur-xl md:backdrop-blur-2xl transition-colors hover:border-[#B08D57]/60 ${className}`}
      role="region"
      aria-label="Product Showcase"
    >
      {/* Category / Prefix Marker */}
      <div className="flex items-center gap-1.5 xs:gap-2 shrink-0 select-none">
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#B08D57]"
          aria-hidden="true"
        />
        <span className="font-mono text-[10px] xs:text-[11px] sm:text-xs font-bold tracking-[0.16em] sm:tracking-[0.22em] text-[#B08D57] uppercase whitespace-nowrap">
          {prefix}
        </span>
      </div>

      {/* Dynamic Animated Text Line */}
      <div className="flex items-center shrink min-w-0 font-sans text-xs xs:text-[13px] sm:text-base md:text-lg font-semibold text-[#F8F4EC] tracking-tight whitespace-nowrap">
        <span className="text-[#F8F4EC] select-none">
          {displayText}
        </span>
        {!shouldReduceMotion && !isSkipped && isPlaying && !isFinished && (
          <span
            className="inline-block w-[2px] h-3.5 xs:h-4 sm:h-5 bg-[#B08D57] ml-1 xs:ml-1.5 shrink-0"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Typewriter Play / Pause / Restart Control */}
      <button
        type="button"
        onClick={handleTogglePlay}
        aria-label={
          isFinished
            ? "Restart product showcase"
            : isPlaying
            ? "Pause product showcase"
            : "Play product showcase"
        }
        title={
          isFinished
            ? "Restart product showcase"
            : isPlaying
            ? "Pause product showcase"
            : "Play product showcase"
        }
        className="ml-1 inline-flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded border border-[#B08D57]/30 bg-[#091B2C]/80 text-[#B08D57] hover:border-[#B08D57] hover:bg-[#1B3D5E]/60 hover:text-[#F8F4EC] transition-all duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#B08D57]"
      >
        {isPlaying ? (
          <Pause className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden="true" />
        ) : (
          <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-0.5" aria-hidden="true" />
        )}
      </button>

      {/* Accessible text for screen readers */}
      <span className="sr-only">
        Graphipacks produces: {resolvedItems.join(", ")}
      </span>
    </div>
  );
}
