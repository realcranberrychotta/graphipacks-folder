"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// In-memory module-scoped flag: resets to false on every full page load or
// browser refresh (F5 / Cmd+R), and flips to true once the curtain finishes
// lifting so client-side Next.js navigation (Home -> Products -> Home) does not replay it.
let hasPlayedOnThisLoad = false;

function unlockDocumentScroll() {
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("preloader-active", "show-intro");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
}

export default function Preloader() {
  const pathname = usePathname();
  const framerReducedMotion = useReducedMotion();

  const isHome = pathname === "/";
  const [isDismissed, setIsDismissed] = useState<boolean>(
    () => !isHome || hasPlayedOnThisLoad
  );

  const [count, setCount] = useState<number>(0);
  const [isContentEntered, setIsContentEntered] = useState<boolean>(false);
  const [isContentFading, setIsContentFading] = useState<boolean>(false);
  const [isLifting, setIsLifting] = useState<boolean>(false);

  const animFrameRef = useRef<number>(0);
  const readyTriggeredRef = useRef<boolean>(false);
  const currentCountRef = useRef<number>(0);

  useEffect(() => {
    if (!isHome || hasPlayedOnThisLoad || isDismissed) {
      unlockDocumentScroll();
      return;
    }

    const motionQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    // Only users with OS prefers-reduced-motion: reduce explicitly enabled skip the count-up
    if (framerReducedMotion || motionQuery?.matches) {
      hasPlayedOnThisLoad = true;
      setIsDismissed(true);
      unlockDocumentScroll();
      return;
    }

    // Lock body scroll while Dark Navy curtain is active
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    const addTimer = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    // Stage 1 Entrance: crisp fade-in and slide-up via GPU transform/opacity
    addTimer(() => {
      setIsContentEntered(true);
    }, 30);

    const startTime = performance.now();
    let is3DReady = false;
    let completionStartTime: number | null = null;
    let countAtReady = 0;
    let finished = false;

    const startCurtainExit = () => {
      if (finished) return;
      finished = true;
      currentCountRef.current = 100;
      setCount(100);

      // 1. Brief pause (70ms) at 100
      addTimer(() => {
        // 2. Fade out inner pre-loader text (150ms)
        setIsContentFading(true);

        addTimer(() => {
          // 3. Slide Dark Navy curtain upward off viewport (480ms)
          setIsLifting(true);
          unlockDocumentScroll();

          // 4. Unmount and mark in-memory flag once curtain finishes lifting
          addTimer(() => {
            hasPlayedOnThisLoad = true;
            setIsDismissed(true);
          }, 480);
        }, 150);
      }, 70);
    };

    const tick = (now: number) => {
      if (finished) return;

      if (!is3DReady) {
        // Count 000 -> 090 over ~550ms using ease-out quadratic curve
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / 550);
        const currentVal = Math.floor((1 - Math.pow(1 - progress, 2)) * 90);
        currentCountRef.current = currentVal;
        setCount(currentVal);
      } else {
        // 3D ready or timeout hit: smoothly accelerate from current count to 100 in 150ms
        if (completionStartTime === null) {
          completionStartTime = now;
          countAtReady = currentCountRef.current;
        }
        const completeElapsed = now - completionStartTime;
        const completeProgress = Math.min(1, completeElapsed / 150);
        const finalVal = Math.min(
          100,
          Math.floor(countAtReady + (100 - countAtReady) * completeProgress)
        );
        currentCountRef.current = finalVal;
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

    const onSkip = () => {
      on3DReady();
      startCurtainExit();
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        finished = true;
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        hasPlayedOnThisLoad = true;
        setIsDismissed(true);
        unlockDocumentScroll();
      }
    };

    if ((window as unknown as { __graphipacks3DReady?: boolean }).__graphipacks3DReady) {
      on3DReady();
    } else {
      window.addEventListener("graphipacks-3d-ready", on3DReady, { once: true });
    }

    window.addEventListener("skip-hero-animation", onSkip, { once: true });
    motionQuery?.addEventListener?.("change", onMotionChange);

    // Mobile (< 768px): 3D machine is not loaded, signal ready at 400ms (~1.25s total)
    if (window.innerWidth < 768) {
      addTimer(on3DReady, 400);
    }

    // Hard max fallback timeout: signal ready by 1150ms so total duration stays <= 2.0s
    addTimer(on3DReady, 1150);

    return () => {
      timers.forEach(clearTimeout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("graphipacks-3d-ready", on3DReady);
      window.removeEventListener("skip-hero-animation", onSkip);
      motionQuery?.removeEventListener?.("change", onMotionChange);
    };
  }, [isHome, isDismissed, framerReducedMotion]);

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
        transform: isLifting ? "translate3d(0, -100%, 0)" : "translate3d(0, 0, 0)",
        transition: isLifting
          ? "transform 480ms cubic-bezier(0.76, 0, 0.24, 1)"
          : undefined,
        willChange: isLifting ? "transform" : undefined,
      }}
      aria-hidden={isLifting}
      role="status"
      aria-label="Loading Graphipacks"
    >
      {/* Blueprint Grid Lines Pattern (Ultra-subtle #A8DADC at 7% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-powder-blue, #A8DADC) 1px, transparent 1px), linear-gradient(to bottom, var(--color-powder-blue, #A8DADC) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Inner Content Wrapper: GPU transform + opacity only */}
      <div
        className={cn(
          "relative w-full h-full flex items-center justify-center transition-[transform,opacity] duration-300 ease-out",
          isContentEntered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2",
          isContentFading && "opacity-0 transition-opacity duration-150"
        )}
      >
        {/* 4-Corner Micro-Labels */}
        <div className="absolute top-0 left-0 p-5 sm:p-10 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-powder/70">
          MADURAI PLANT
        </div>

        <div className="absolute top-0 right-0 p-5 sm:p-10 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-powder/70 text-right max-w-[55vw] sm:max-w-none">
          8-COLOUR ROTOGRAVURE &bull; BLOWN FILM
        </div>

        <div className="absolute bottom-0 left-0 p-5 sm:p-10 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-powder/70">
          <span>FLEXIBLE PACKAGING</span>
          <span className="mx-2 text-steel/60">&bull;</span>
          <span className="text-red font-semibold">EST. 1984</span>
        </div>

        <div className="absolute bottom-0 right-0 p-5 sm:p-10 font-mono text-xs sm:text-sm tracking-widest tabular-nums uppercase text-background/85 text-right font-medium">
          {String(count).padStart(3, "0")}
        </div>

        {/* Centered Brand Lockup */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-powder/30" />
            <div className="w-2.5 h-2.5 rotate-45 bg-red shadow-[0_0_10px_rgba(230,57,70,0.7)]" />
            <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-powder/30" />
          </div>

          <h1 className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.18em] sm:tracking-[0.28em] text-background ml-[0.18em] sm:ml-[0.28em]">
            GRAPHIPACKS
          </h1>

          <p className="font-mono uppercase text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-powder/75 ml-[0.2em] sm:ml-[0.25em]">
            PRIVATE LIMITED &bull; MADURAI
          </p>
        </div>
      </div>
    </div>
  );
}
