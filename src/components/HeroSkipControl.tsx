"use client";

import { useState, useEffect } from "react";
import { SkipForward, Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export default function HeroSkipControl() {
  const [isSkipped, setIsSkipped] = useState(false);
  const [isReturnVisit, setIsReturnVisit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      try {
        if (localStorage.getItem("graphipacks-intro-seen") === "true") {
          setIsReturnVisit(true);
        }
      } catch {}
    });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      queueMicrotask(() => {
        setIsSkipped(true);
      });
    }
  }, [shouldReduceMotion]);

  const handleSkip = () => {
    setIsSkipped(true);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("graphipacks-intro-seen", "true");
      } catch {}
      document.documentElement.setAttribute("data-skip-animation", "true");
      window.dispatchEvent(new CustomEvent("skip-hero-animation"));
      window.__machine?.play?.();
    }
  };

  if (!mounted || isReturnVisit || shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute top-16 md:top-20 right-4 sm:right-6 lg:right-8 z-30 pointer-events-auto">
      {isSkipped ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A6864C]/30 bg-[#27080F] px-3 py-1 text-xs font-mono tracking-wider text-[#F6F2EB]/70 select-none">
          <Check className="h-3 w-3 text-[#A6864C]" aria-hidden="true" />
          <span>Animation skipped</span>
        </span>
      ) : (
        <button
          type="button"
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#A6864C]/40 bg-[#27080F] px-3 py-1 text-xs font-mono tracking-wider text-[#F6F2EB]/90 hover:text-[#A6864C] hover:border-[#A6864C] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#A6864C] cursor-pointer"
          aria-label="Skip animation"
        >
          <SkipForward className="h-3 w-3 text-[#A6864C]" aria-hidden="true" />
          <span>Skip Animation</span>
        </button>
      )}
    </div>
  );
}
