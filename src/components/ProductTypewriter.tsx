"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface ProductTypewriterProps {
  items: string[];
  prefix?: string;
  className?: string;
}

export default function ProductTypewriter({
  items,
  prefix = "We make :",
  className = "",
}: ProductTypewriterProps) {
  const shouldReduceMotion = useReducedMotion();
  const [itemIndex, setItemIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    if (shouldReduceMotion) {
      const interval = setInterval(() => {
        setItemIndex((prev) => (prev + 1) % items.length);
      }, 3200);
      return () => clearInterval(interval);
    }

    const currentItem = items[itemIndex] || "";

    // 1. When paused at the full word, wait before starting backspace
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    // 2. When backspacing has reached the beginning, pause briefly then move to next word
    if (isDeleting && subIndex === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setItemIndex((prev) => (prev + 1) % items.length);
      }, 350);
      return () => clearTimeout(timeout);
    }

    // 3. When deleting, decrement one character
    if (isDeleting) {
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev - 1);
      }, 35);
      return () => clearTimeout(timeout);
    }

    // 4. When full word is typed, pause
    if (subIndex === currentItem.length) {
      const timeout = setTimeout(() => {
        setIsPaused(true);
      }, 100);
      return () => clearTimeout(timeout);
    }

    // 5. When typing forward, increment one character
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + 1);
    }, 60);
    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, isPaused, itemIndex, items, shouldReduceMotion]);

  const displayedText = shouldReduceMotion
    ? items[itemIndex]
    : items[itemIndex]?.substring(0, subIndex) || "";

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-3 rounded-xl border border-[#B08D57]/20 border-t-[#F8F4EC]/30 bg-[#0F2A44]/40 px-4 py-2.5 backdrop-blur-xl md:backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(248,244,236,0.2),0_10px_25px_rgba(9,27,44,0.5)] transition-all hover:border-[#B08D57]/50 ${className}`}
      role="region"
      aria-label="Product Showcase"
    >
      {/* Category / Prefix Marker */}
      <div className="flex items-center gap-2 shrink-0 select-none">
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#B08D57] shadow-[0_0_8px_rgba(176,141,87,0.8)]"
          aria-hidden="true"
        />
        <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#B08D57] uppercase">
          {prefix}
        </span>
      </div>

      {/* Dynamic Animated Text Line */}
      <div className="flex items-center min-h-[1.5rem] font-sans text-sm sm:text-base md:text-lg font-semibold text-[#F8F4EC] tracking-tight">
        <span className="text-[#F8F4EC] drop-shadow-sm">{displayedText}</span>
        {!shouldReduceMotion && (
          <span
            className="inline-block w-[2px] h-4 sm:h-5 bg-[#B08D57] ml-1.5 animate-pulse shadow-[0_0_8px_rgba(176,141,87,0.7)]"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Accessible text for screen readers */}
      <span className="sr-only">
        Graphipacks produces: {items.join(", ")}
      </span>
    </div>
  );
}
