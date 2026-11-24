"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Module-scoped in-memory state: resets on hard reload / full page reload,
// persists across soft client-side route transitions to prevent re-flashes.
let hasPreloadedInSession = false;

export default function Preloader() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Only show on Home page on initial load in this page lifecycle
  const isHome = pathname === "/";
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return !isHome || hasPreloadedInSession;
  });

  const [count, setCount] = useState<number>(0);
  const [isContentEntered, setIsContentEntered] = useState<boolean>(false);
  const [isContentFading, setIsContentFading] = useState<boolean>(false);
  const [isLifting, setIsLifting] = useState<boolean>(false);

  const animFrameRef = useRef<number>(0);
  const readyTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    // If not Home or already preloaded in this browser session, clean up and exit
    if (!isHome || hasPreloadedInSession || isDismissed) {
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("preloader-active");
        document.documentElement.classList.remove("show-intro");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
      return;
    }

    // Prefers-reduced-motion: dismiss immediately without animation
    if (shouldReduceMotion) {
      setIsDismissed(true);
      hasPreloadedInSession = true;
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("preloader-active");
        document.documentElement.classList.remove("show-intro");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
      return;
    }

    // Lock body scroll while curtain is active
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    // Stage 1 Entrance: subtle fade-in and slight slide-up of inner text
    const enterTimer = setTimeout(() => {
      setIsContentEntered(true);
    }, 50);

    const startTime = performance.now();
    let is3DReady = false;
    let completionStartTime: number | null = null;
    let countAtReady = 0;
    let finished = false;

    // Helper to start the Stage 2 & 3 exit sequence once count reaches 100
    const startCurtainExit = () => {
      if (finished) return;
      finished = true;
      setCount(100);

      // 1. Brief pause (~120ms) at 100
      setTimeout(() => {
        // 2. Gently fade out the inner pre-loader text (200ms)
        setIsContentFading(true);

        setTimeout(() => {
          // 3. Slide the entire Dark Navy curtain upward off the viewport (750ms)
          setIsLifting(true);

          // Restore body scroll as soon as curtain starts lifting
          if (typeof document !== "undefined") {
            document.documentElement.classList.remove("preloader-active");
            document.documentElement.classList.remove("show-intro");
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
          }

          // 4. Fully unmount from DOM after curtain wipe finishes
          setTimeout(() => {
            setIsDismissed(true);
            hasPreloadedInSession = true;
          }, 750);
        }, 200);
      }, 120);
    };

    // Frame-based count animation loop
    const tick = (now: number) => {
      if (finished) return;

      if (!is3DReady) {
        // Count from 000 up to 090 over ~1.1s (using ease-out curve)
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / 1100);
        // Ease-out quadratic progression towards 90
        const currentVal = Math.floor((1 - Math.pow(1 - progress, 2)) * 90);
        setCount(currentVal);
      } else {
        // 3D is ready (or timeout hit): rapidly and smoothly accelerate from current to 100
        if (completionStartTime === null) {
          completionStartTime = now;
          countAtReady = count;
        }
        const completeElapsed = now - completionStartTime;
        const completeProgress = Math.min(1, completeElapsed / 180);
        const finalVal = Math.min(
          100,
          Math.floor(countAtReady + (100 - countAtReady) * completeProgress)
        );
        setCount(finalVal);

        if (finalVal >= 100) {
          startCurtainExit();
          return;
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    const on3DReady = () => {
      if (readyTriggeredRef.current) return;
      readyTriggeredRef.current = true;
      is3DReady = true;
    };

    if (typeof window !== "undefined") {
      // Listen for 3D scene first frame ready event
      if ((window as unknown as { __graphipacks3DReady?: boolean }).__graphipacks3DReady) {
        on3DReady();
      } else {
        window.addEventListener("graphipacks-3d-ready", on3DReady, { once: true });
      }

      // Allow user skip action to immediately trigger exit
      window.addEventListener("skip-hero-animation", () => {
        on3DReady();
        startCurtainExit();
      }, { once: true });

      // Mobile screen (< 768px): 3D machine is not loaded, signal ready after 600ms
      if (window.innerWidth < 768) {
        setTimeout(on3DReady, 600);
      }

      // Hard safety fallback timeout: 2.2s
      const fallbackTimer = setTimeout(() => {
        on3DReady();
      }, 2200);

      return () => {
        clearTimeout(enterTimer);
        clearTimeout(fallbackTimer);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        window.removeEventListener("graphipacks-3d-ready", on3DReady);
      };
    }

    return () => {
      clearTimeout(enterTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHome, isDismissed, shouldReduceMotion]);

  if (isDismissed || !isHome) {
    return null;
  }

  return (
    <div
      id="site-preloader"
      className={cn(
        "fixed inset-0 z-[9999] bg-navy select-none overflow-hidden",
        isLifting && "pointer-events-none"
      )}
      style={{
        backgroundColor: "var(--color-dark-navy, #1D3557)",
        transform: isLifting ? "translateY(-100%)" : "translateY(0%)",
        transition: isLifting
          ? "transform 750ms cubic-bezier(0.76, 0, 0.24, 1)"
          : undefined,
        willChange: isLifting ? "transform" : undefined,
      }}
      aria-hidden={isLifting}
      role="status"
      aria-label="Loading Graphipacks"
    >
      {/* Blueprint Grid Lines Pattern (Ultra-subtle #A8DADC at 6-8% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-powder-blue, #A8DADC) 1px, transparent 1px), linear-gradient(to bottom, var(--color-powder-blue, #A8DADC) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Inner Content Wrapper: Handles Entrance and Gentle Fade-out */}
      <div
        className={cn(
          "relative w-full h-full flex items-center justify-center transition-all duration-400 ease-out",
          isContentEntered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2",
          isContentFading && "opacity-0 transition-opacity duration-200"
        )}
      >
        {/* 4-Corner Micro-Labels */}
        {/* Top-Left: Madurai Plant */}
        <div className="absolute top-0 left-0 p-6 sm:p-10 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-powder/70">
          MADURAI PLANT
        </div>

        {/* Top-Right: Rotogravure & Blown Film */}
        <div className="absolute top-0 right-0 p-6 sm:p-10 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-powder/70 text-right">
          8-COLOUR ROTOGRAVURE &bull; BLOWN FILM
        </div>

        {/* Bottom-Left: Flexible Packaging & Est. 1984 */}
        <div className="absolute bottom-0 left-0 p-6 sm:p-10 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-powder/70">
          <span>FLEXIBLE PACKAGING</span>
          <span className="mx-2 text-steel/60">&bull;</span>
          <span className="text-red font-semibold">EST. 1984</span>
        </div>

        {/* Bottom-Right: Live Animated 3-Digit Counter */}
        <div className="absolute bottom-0 right-0 p-6 sm:p-10 font-mono text-xs sm:text-sm tracking-widest tabular-nums uppercase text-background/85 text-right font-medium">
          {String(count).padStart(3, "0")}
        </div>

        {/* Centered Brand Lockup */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center px-6">
          {/* Top Emblem: Hairline lines with central Imperial Red diamond */}
          <div className="flex items-center gap-3">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-powder/30" />
            <div className="w-2.5 h-2.5 rotate-45 bg-red shadow-[0_0_10px_rgba(230,57,70,0.7)]" />
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-powder/30" />
          </div>

          {/* Wordmark: Wide-tracked uppercase GRAPHIPACKS in heading serif font */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.35em] text-background ml-[0.35em]">
            GRAPHIPACKS
          </h1>

          {/* Subtitle: Tracked-out PRIVATE LIMITED • MADURAI */}
          <p className="font-mono uppercase text-xs sm:text-sm tracking-[0.25em] text-powder/75 ml-[0.25em]">
            PRIVATE LIMITED &bull; MADURAI
          </p>
        </div>
      </div>
    </div>
  );
}
