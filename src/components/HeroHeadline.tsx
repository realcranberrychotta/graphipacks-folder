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

  useEffect(() => {
    let introSeen = false;
    try {
      introSeen = localStorage.getItem("graphipacks-intro-seen") === "true";
    } catch {}

    if (shouldReduceMotion || introSeen) {
      queueMicrotask(() => {
        setIsReturnVisit(true);
        setIsStarted(true);
      });
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

  const containerVariants: Variants = {
    hidden: instant
      ? { opacity: 1, filter: "none", y: 0 }
      : { opacity: 0, filter: "none", y: 16 },
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
      : { opacity: 0, filter: "none", y: 16 },
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
      {/* ─── Semantic Display H1 Headline in Honeydew ─── */}
      <motion.h1
        variants={containerVariants}
        initial={instant ? "visible" : "hidden"}
        animate={isStarted || instant ? "visible" : "hidden"}
        className={`relative inline-block select-none overflow-visible m-0 p-0 font-serif font-[family-name:var(--font-display)] ${
          centered ? "text-center" : "text-left"
        }`}
      >
        {/* Subtle Lithographic Registration Crosshair framing the headline */}
        <span 
          aria-hidden="true" 
          className="absolute -top-4 -left-4 font-mono text-xs text-steel/50 select-none hidden sm:inline-block pointer-events-none"
        >
          ┌ ⊕
        </span>
        <span 
          aria-hidden="true" 
          className="absolute -top-4 -right-4 font-mono text-xs text-steel/50 select-none hidden sm:inline-block pointer-events-none"
        >
          ⊕ ┐
        </span>

        {/* Top line: Italic light serif with letterpress ink tone */}
        <motion.span
          variants={lineVariants}
          style={{ textShadow: "0 1px 0 rgba(241, 250, 238, 0.9)" }}
          className={`block font-serif font-[family-name:var(--font-display)] italic font-light tracking-tight text-[22px] xs:text-[25px] sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] 2xl:text-[50px] leading-tight sm:leading-none whitespace-nowrap sm:whitespace-normal text-ink ${
            centered ? "text-center" : ""
          }`}
        >
          Flexible Packaging
        </motion.span>

        {/* Bottom block: Bold uppercase architectural block with tactile ink weight */}
        <motion.span
          variants={lineVariants}
          style={{ textShadow: "0 1px 0 rgba(241, 250, 238, 0.85)" }}
          className={`block font-serif font-[family-name:var(--font-display)] font-black uppercase tracking-[0.04em] text-[28px] xs:text-[34px] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[60px] 2xl:text-[62px] leading-[1.08] sm:leading-[0.92] text-ink mt-1.5 sm:mt-3 ${
            centered ? "text-center" : ""
          }`}
        >
          SOLUTION<br />PROVIDERS
        </motion.span>

        {/* Die-line corner bottom marks */}
        <span 
          aria-hidden="true" 
          className="absolute -bottom-3 -left-4 font-mono text-xs text-steel/50 select-none hidden sm:inline-block pointer-events-none"
        >
          └
        </span>
        <span 
          aria-hidden="true" 
          className="absolute -bottom-3 -right-4 font-mono text-xs text-steel/50 select-none hidden sm:inline-block pointer-events-none"
        >
          ┘
        </span>
      </motion.h1>
    </div>
  );
}

export { HeroHeadline };
