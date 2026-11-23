"use client";

import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * ScrollReveal: Content visible by default, never hiding content on scroll.
 */
export default function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps) {
  return (
    <div className={className} data-scroll-reveal>
      {children}
    </div>
  );
}
