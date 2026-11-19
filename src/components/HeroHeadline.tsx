"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  type Variants,
} from "framer-motion";

interface HeroHeadlineProps {
  className?: string;
}

export default function HeroHeadline({ className = "" }: HeroHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isEntranceComplete, setIsEntranceComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 220, damping: 26 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 26 });

  // Fire entrance reveal immediately after the 800ms preloader unmounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  // Ensure interactive state is fully enabled once entrance choreography settles
  useEffect(() => {
    if (isStarted) {
      const timer = setTimeout(() => {
        setIsEntranceComplete(true);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isStarted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEntranceComplete) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEntranceComplete) return;
    setIsHovered(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Entrance variants: blur and optical emergence
  const containerVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(14px)", y: 16 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.18,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(14px)", y: 16 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // High-contrast bronze/ivory cursor spotlight gradient
  const spotlightGradient = useMotionTemplate`radial-gradient(280px circle at ${springX}px ${springY}px, #ffffff 0%, #F8F4EC 30%, #B08D57 65%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block select-none overflow-visible ${className}`}
    >
      {/* ─── Photonic Light Sweep Flare (Single Entrance Exposure Sweep) ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-12 -inset-x-12 sm:-inset-x-20 overflow-hidden z-20"
      >
        <motion.div
          className="w-full h-full absolute inset-0 pointer-events-none"
          initial={{ x: "-120%" }}
          animate={isStarted ? { x: "220%" } : { x: "-120%" }}
          transition={{
            duration: 1.4,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            className="absolute -top-1/2 -bottom-1/2 w-36 sm:w-56 bg-gradient-to-r from-transparent via-[#fffdf5] to-transparent pointer-events-none shadow-[0_0_50px_rgba(248,244,236,0.8),0_0_25px_rgba(176,141,87,0.6)]"
            style={{
              rotate: "15deg",
              mixBlendMode: "screen",
            }}
            initial={{ opacity: 0 }}
            animate={
              isStarted ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }
            }
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.15, 0.85, 1],
            }}
          />
        </motion.div>
      </div>

      {/* ─── Semantic Display H1 Headline (Base Layer) ─── */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate={isStarted ? "visible" : "hidden"}
        onAnimationComplete={() => setIsEntranceComplete(true)}
        className="relative inline-block select-none overflow-visible m-0 p-0 font-serif font-[family-name:var(--font-display)]"
      >
        {/* Top line: Italic light serif */}
        <motion.span
          variants={lineVariants}
          className="block font-serif font-[family-name:var(--font-display)] italic font-light tracking-tight text-[22px] xs:text-[25px] sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-none whitespace-nowrap sm:whitespace-normal text-[#F8F4EC]"
        >
          Flexible Packaging
        </motion.span>

        {/* Bottom block: Bold uppercase architectural block */}
        <motion.span
          variants={lineVariants}
          className="block font-serif font-[family-name:var(--font-display)] font-black uppercase tracking-[0.04em] sm:tracking-[0.06em] text-[28px] xs:text-[34px] sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] sm:leading-[0.92] text-[#F8F4EC] mt-1.5 sm:mt-3"
        >
          SOLUTION<br />PROVIDERS
        </motion.span>
      </motion.h1>

      {/* ─── Interactive Specular Spotlight Overlay (Follows Mouse On Hover) ─── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-visible"
        animate={{ opacity: isEntranceComplete && isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="block font-serif font-[family-name:var(--font-display)] italic font-light tracking-tight text-[22px] xs:text-[25px] sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-none whitespace-nowrap sm:whitespace-normal"
          style={{
            backgroundImage: spotlightGradient,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Flexible Packaging
        </motion.span>
        <motion.span
          className="block font-serif font-[family-name:var(--font-display)] font-black uppercase tracking-[0.04em] sm:tracking-[0.06em] text-[28px] xs:text-[34px] sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] sm:leading-[0.92] mt-1.5 sm:mt-3"
          style={{
            backgroundImage: spotlightGradient,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          SOLUTION<br />PROVIDERS
        </motion.span>
      </motion.div>
    </div>
  );
}

export { HeroHeadline };
