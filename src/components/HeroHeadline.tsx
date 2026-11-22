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

  // Entrance variants: clean optical emergence (instantly visible on return visit or reduced motion)
  const containerVariants: Variants = {
    hidden: instant
      ? { opacity: 1, filter: "none", y: 0 }
      : { opacity: 0, filter: "blur(10px)", y: 16 },
    visible: {
      opacity: 1,
      filter: "none",
      y: 0,
      transition: {
        duration: instant ? 0 : 1.0,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: instant ? 0 : 0.16,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: instant
      ? { opacity: 1, filter: "none", y: 0 }
      : { opacity: 0, filter: "blur(10px)", y: 16 },
    visible: {
      opacity: 1,
      filter: "none",
      y: 0,
      transition: {
        duration: instant ? 0 : 1.0,
        ease: [0.16, 1, 0.3, 1],
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
        {/* Top line: Italic light serif */}
        <motion.span
          variants={lineVariants}
          className={`block font-serif font-[family-name:var(--font-display)] italic font-light tracking-tight text-[22px] xs:text-[25px] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[50px] leading-tight sm:leading-none whitespace-nowrap sm:whitespace-normal text-[#F8F4EC] ${
            centered ? "text-center" : ""
          }`}
        >
          Flexible Packaging
        </motion.span>

        {/* Bottom block: Bold uppercase architectural block */}
        <motion.span
          variants={lineVariants}
          className={`block font-serif font-[family-name:var(--font-display)] font-black uppercase tracking-[0.04em] text-[28px] xs:text-[34px] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[60px] 2xl:text-[62px] leading-[1.08] sm:leading-[0.92] text-[#F8F4EC] mt-1.5 sm:mt-3 ${
            centered ? "text-center" : ""
          }`}
        >
          SOLUTION<br />PROVIDERS
        </motion.span>
      </motion.h1>
    </div>
  );
}

export { HeroHeadline };
