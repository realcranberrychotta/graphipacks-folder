"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

interface GoldFoilHeadingProps {
  className?: string;
}

export default function GoldFoilHeading({ className = "" }: GoldFoilHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 250, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 28 });

  // Center the spotlight on mount so the idle sheen is centered
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  };

  const foilGradient = useMotionTemplate`radial-gradient(180px circle at ${springX}px ${springY}px, #ffffff 0%, #F1FAEE 25%, #A8DADC 60%, #457B9D 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {/* Layer 1: Base Matte Sheen Layer — Always Visible */}
      <span className="block font-serif font-extrabold text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.14em] leading-tight select-none bg-gradient-to-b from-[#F1FAEE] via-[#A8DADC] to-[#457B9D] bg-clip-text text-transparent">
        GRAPHIPACKS PRIVATE LIMITED
      </span>

      {/* Layer 2: Interactive Specular Steel Foil Overlay */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none font-serif font-extrabold text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.14em] leading-tight"
        style={{
          backgroundImage: foilGradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
        animate={{ opacity: isHovered ? 1 : 0.35 }}
        transition={{ duration: 0.3 }}
      >
        GRAPHIPACKS PRIVATE LIMITED
      </motion.span>
    </div>
  );
}

export { GoldFoilHeading };
