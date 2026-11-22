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
    setMounted(true);
    try {
      if (localStorage.getItem("graphipacks-intro-seen") === "true") {
        setIsReturnVisit(true);
      }
    } catch {}
  }, []);

  // If user already requested reduced motion, mark as skipped
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsSkipped(true);
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
      // Ensure 3D machine continues running and rotating perpetually
      window.__machine?.play?.();
    }
  };

  // Skip button is rendered on the first visit only. Hidden on return visits or when reduced motion is requested.
  if (!mounted || isReturnVisit || shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute top-16 md:top-20 right-4 sm:right-6 lg:right-8 z-30 pointer-events-auto">
      {isSkipped ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B08D57]/20 bg-[#0F2A44]/80 backdrop-blur-md px-3 py-1 text-xs font-mono tracking-wider text-[#EFE8DC]/60 select-none">
          <Check className="h-3 w-3 text-[#B08D57]" aria-hidden="true" />
          <span>Animation skipped</span>
        </span>
      ) : (
        <button
          type="button"
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#B08D57]/30 bg-[#0F2A44]/80 backdrop-blur-md px-3 py-1 text-xs font-mono tracking-wider text-[#EFE8DC]/80 hover:text-white hover:border-[#B08D57]/60 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#B08D57] cursor-pointer"
          aria-label="Skip animation"
        >
          <SkipForward className="h-3 w-3 text-[#B08D57]" aria-hidden="true" />
          <span>Skip animation</span>
        </button>
      )}
    </div>
  );
}
