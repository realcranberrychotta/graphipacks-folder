"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

interface HeroHeadlineProps {
  className?: string;
  centered?: boolean;
}

export default function HeroHeadline({
  className = "",
  centered = false,
}: HeroHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isStarted, setIsStarted] = useState(Boolean(shouldReduceMotion));
  const [isReturnVisit, setIsReturnVisit] = useState(false);

  // Fire entrance reveal immediately after the preloader unmounts, or immediately on return visit / reduced motion
  useEffect(() => {
    let introSeen = false;
    try {
      introSeen = localStorage.getItem("graphipacks-intro-seen") === "true";
    } catch {}

    if (shouldReduceMotion || introSeen) {
      setIsReturnVisit(true);
      setIsStarted(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsStarted(true);
    }, 850);

    const handleSkip = () => {
      setIsStarted(true);
    };

    window.addEventListener("skip-hero-animation", handleSkip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("skip-hero-animation", handleSkip);
    };
  }, [shouldReduceMotion]);

  const instant = shouldReduceMotion || isReturnVisit;

  // Stagger 80ms between words; total duration under 1.5s
  const containerVariants: Variants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: instant ? 0 : 0.08,
        delayChildren: instant ? 0 : 0.04,
      },
    },
  };

  // Word-by-word reveal: each word fading in from slight blur (blur 4px → 0) and rising 8px (y: 8 → 0)
  // 300ms ease-in-out per word. Stays static after reveal.
  const wordVariants: Variants = {
    hidden: instant
      ? { opacity: 1, filter: "blur(0px)", y: 0 }
      : { opacity: 0, filter: "blur(4px)", y: 8 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: instant ? 0 : 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={`relative inline-block select-none overflow-visible ${className}`}>
      {/* ─── Semantic Display H1 Headline in Solid Warm Ivory ─── */}
      <motion.h1
        variants={containerVariants}
        initial={instant ? "visible" : "hidden"}
        animate={isStarted || instant ? "visible" : "hidden"}
        className={`relative inline-block select-none overflow-visible m-0 p-0 font-serif font-[family-name:var(--font-display)] ${
          centered ? "text-center" : "text-left"
        }`}
      >
        {/* Top line: Italic light serif (Flexible Packaging) */}
        <span
          className={`block font-serif font-[family-name:var(--font-display)] italic font-light tracking-tight text-[22px] xs:text-[25px] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[50px] leading-tight sm:leading-none whitespace-normal text-[#F8F4EC] ${
            centered ? "text-center" : ""
          }`}
        >
          <motion.span
            variants={wordVariants}
            className="hero-reveal-word inline-block mr-[0.28em]"
          >
            Flexible
          </motion.span>
          <motion.span
            variants={wordVariants}
            className="hero-reveal-word inline-block"
          >
            Packaging
          </motion.span>
        </span>

        {/* Bottom block: Bold uppercase architectural block (SOLUTION PROVIDERS) */}
        <span
          className={`block font-serif font-[family-name:var(--font-display)] font-black uppercase tracking-[0.04em] text-[28px] xs:text-[34px] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[60px] 2xl:text-[62px] leading-[1.08] sm:leading-[0.92] text-[#F8F4EC] mt-1.5 sm:mt-3 ${
            centered ? "text-center" : ""
          }`}
        >
          <motion.span
            variants={wordVariants}
            className={`hero-reveal-word ${
              centered ? "inline-block mr-[0.24em] sm:mr-0 sm:block" : "block"
            }`}
          >
            SOLUTION
          </motion.span>
          <motion.span
            variants={wordVariants}
            className={`hero-reveal-word ${
              centered ? "inline-block sm:block" : "block"
            }`}
          >
            PROVIDERS
          </motion.span>
        </span>
      </motion.h1>
    </div>
  );
}

export { HeroHeadline };
