"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// Dynamically import 3D model with next/dynamic and ssr: false
const AgenticFactory3D = dynamic(() => import("@/components/ui/agentic-factory-3d"), {
  ssr: false,
});

export default function HomeHeroFactory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isSkippedRef = useRef(false);
  const shouldReduceMotionRef = useRef(Boolean(shouldReduceMotion));

  useEffect(() => {
    shouldReduceMotionRef.current = Boolean(shouldReduceMotion);
  }, [shouldReduceMotion]);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    media.addEventListener("change", handler);

    const handleSkip = () => {
      setIsSkipped(true);
      isSkippedRef.current = true;
      if (typeof window !== "undefined") {
        window.__machine?.pause?.();
      }
    };

    window.addEventListener("skip-hero-animation", handleSkip);

    return () => {
      media.removeEventListener("change", handler);
      window.removeEventListener("skip-hero-animation", handleSkip);
    };
  }, []);

  // IntersectionObserver: Load 3D model when in view, and stop 3D animation when scrolled past hero
  useEffect(() => {
    if (!mounted || !isDesktop || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (!visible) {
          // User scrolled past hero: stop 3D animation
          if (typeof window !== "undefined") {
            window.__machine?.pause?.();
          }
        } else if (!isSkippedRef.current && !shouldReduceMotionRef.current) {
          // Hero back in view: resume 3D animation if not skipped and motion not reduced
          if (typeof window !== "undefined") {
            window.__machine?.play?.();
          }
        }
      },
      { rootMargin: "50px", threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted, isDesktop]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[720px] overflow-hidden"
      style={{ contain: "layout paint" }}
    >
      {/* Static Flexo photo fallback — always shown on mobile (<768px), while 3D loads, or when reduced motion / skipped */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/infrastructure/infra-01-flexo-ink-rollers.jpg"
          alt="Graphipacks Flexographic Printing Production Line"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0F2A44]/70 backdrop-blur-[1px]" />
      </div>

      {/* 3D Manufacturing Plant Tour: Loaded on demand with next/dynamic only when in view on desktop, and disabled if reduced motion or skipped */}
      {isDesktop && isInView && !shouldReduceMotion && !isSkipped && (
        <div className="relative z-10 w-full h-full">
          <AgenticFactory3D embed height={720} />
        </div>
      )}
    </div>
  );
}
