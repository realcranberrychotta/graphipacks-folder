"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function HeroParallax() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 120]);
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", () => {
    setIsScrolling(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
    >
      <motion.div
        style={{ y: backgroundY, willChange: isScrolling ? "transform" : "auto" }}
        className="absolute inset-0 opacity-15"
      >
        {/* Subtle engineering precision grid providing light optical depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(166,134,76,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(166,134,76,0.1)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </motion.div>
    </div>
  );
}
