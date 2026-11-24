"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollYProgress, "change", () => {
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
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-navy via-steel to-red pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        willChange: isScrolling ? "transform" : "auto",
      }}
    />
  );
}
