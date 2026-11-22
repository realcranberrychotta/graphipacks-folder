"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

interface StaggerContextValue {
  isGridVisible: boolean;
}

const StaggerContext = createContext<StaggerContextValue>({
  isGridVisible: false,
});

interface StaggerCardsGridProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function StaggerCardsGrid({
  children,
  className = "",
  threshold = 0.08,
  rootMargin = "0px 0px -40px 0px",
}: StaggerCardsGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isGridVisible, setIsGridVisible] = useState(Boolean(shouldReduceMotion));
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Respect user motion preference immediately
    if (shouldReduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsGridVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // Use IntersectionObserver only (no scroll listener)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGridVisible(true);
          observer.disconnect(); // Disconnect once triggered
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <StaggerContext.Provider value={{ isGridVisible }}>
      <div ref={containerRef} className={className} data-stagger-grid>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

interface StaggerCardProps {
  children: ReactNode;
  index: number;
  staggerMs?: number;
  durationMs?: number;
  className?: string;
}

export function StaggerCard({
  children,
  index,
  staggerMs = 80,
  durationMs = 250,
  className = "",
}: StaggerCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { isGridVisible } = useContext(StaggerContext);
  const [isSelfVisible, setIsSelfVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(Boolean(shouldReduceMotion));
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  // Fallback: Individual card observer (for deep links, jumps, or fast scrolling)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = cardRef.current;
    if (!el || isSelfVisible || isGridVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSelfVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -20px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isSelfVisible, isGridVisible, prefersReducedMotion]);

  const active = isGridVisible || isSelfVisible || prefersReducedMotion || Boolean(shouldReduceMotion);

  return (
    <div
      ref={cardRef}
      className={`h-full ${className}`}
      data-stagger-card
      data-visible={active ? "true" : "false"}
      style={
        prefersReducedMotion
          ? {
              opacity: 1,
              transform: "none",
              transition: "none",
              willChange: "auto",
            }
          : {
              opacity: active ? 1 : 0,
              transform: active ? "none" : "translateY(24px)",
              transitionProperty: "opacity, transform",
              transitionDuration: `${durationMs}ms`,
              transitionTimingFunction: "ease-in-out",
              transitionDelay: active ? `${index * staggerMs}ms` : "0s",
              willChange: active ? "auto" : "opacity, transform",
            }
      }
    >
      {children}
    </div>
  );
}
