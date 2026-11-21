"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Lightweight scroll animation component.
 * Uses native IntersectionObserver only (no scroll event listeners or RAF scroll loops).
 * Transitions opacity and transform for high-performance 60fps GPU acceleration.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Respect reduced motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect once revealed
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={className}
      data-scroll-reveal
      data-visible={isVisible ? "true" : "false"}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(24px)",
        transitionProperty: "opacity, transform",
        transitionDuration: "250ms",
        transitionTimingFunction: "ease-in-out",
        transitionDelay: isVisible ? `${delay}s` : "0s",
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
