"use client";

import { useState, useEffect } from "react";
import { SkipForward, Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export default function HeroSkipControl() {
  const [isSkipped, setIsSkipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // If user already requested reduced motion, mark as skipped
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsSkipped(true);
    }
  }, [shouldReduceMotion]);

  const handleSkip = () => {
    setIsSkipped(true);
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-skip-animation", "true");
      window.dispatchEvent(new CustomEvent("skip-hero-animation"));
      window.__machine?.pause?.();
    }
  };

  // If reduced motion is natively active, no skip button needed as motion is already disabled
  if (shouldReduceMotion) {
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
