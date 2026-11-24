"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Dynamically import 3D model with next/dynamic and ssr: false
const AgenticFactory3D = dynamic(() => import("@/components/ui/agentic-factory-3d"), {
  ssr: false,
});

export default function HomeHeroFactory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
      // On skip, ensure machine continues running and rotating perpetually
      if (typeof window !== "undefined") {
        window.__machine?.play?.();
      }
    };

    window.addEventListener("skip-hero-animation", handleSkip);

    return () => {
      media.removeEventListener("change", handler);
      window.removeEventListener("skip-hero-animation", handleSkip);
    };
  }, []);

  // IntersectionObserver: Load 3D model when in view, and pause when scrolled past hero
  useEffect(() => {
    if (!mounted || !isDesktop || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (!visible) {
          // User scrolled past hero: pause 3D animation to save resources
          if (typeof window !== "undefined") {
            window.__machine?.pause?.();
          }
        } else if (!shouldReduceMotionRef.current) {
          // Hero back in view: resume 3D animation
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

  // Parallax effect: 3D machine / hero photo moves slightly slower than the headline on scroll
  // As the user scrolls down, headline moves up at normal speed (1.0x),
  // while the 3D machine moves up at about 0.5x speed (translateY = scrollY * 0.5), lagging behind gently.
  // Transform only, no scale, no rotation, no bounce. Maximum movement 40px total.
  // Disabled completely if prefers-reduced-motion is active.
  const { scrollY } = useScroll();
  const rawParallaxY = useTransform(scrollY, [0, 80], [0, 40], { clamp: true });
  const parallaxY = shouldReduceMotion ? 0 : rawParallaxY;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[720px] overflow-hidden"
      style={{ contain: "layout paint" }}
    >
      <motion.div
        style={{
          y: parallaxY,
        }}
        className="hero-parallax-machine relative w-full h-full"
      >
        {/* 3D Manufacturing Plant Tour: Loaded on demand with next/dynamic when on desktop and not reduced motion */}
        {isDesktop && isInView && !shouldReduceMotion && (
          <div className="relative z-10 w-full h-full hero-factory-3d-wrap">
            <style>{`
              .hero-factory-3d-wrap #scene,
              .hero-factory-3d-wrap #labels {
                transform-origin: 80% 48%;
                transform: scale(0.72) translate(-1%, -1%);
              }
              @media (min-width: 1440px) {
                .hero-factory-3d-wrap #scene,
                .hero-factory-3d-wrap #labels {
                  transform: scale(0.72) translate(0%, -1%);
                }
              }
              @media (min-width: 1600px) {
                .hero-factory-3d-wrap #scene,
                .hero-factory-3d-wrap #labels {
                  transform: scale(0.72) translate(1%, -1%);
                }
              }
            `}</style>
            <AgenticFactory3D
              embed
              height={720}
              onReady={() => {
                if (typeof window !== "undefined") {
                  (window as unknown as { __graphipacks3DReady?: boolean }).__graphipacks3DReady = true;
                  window.dispatchEvent(new CustomEvent("graphipacks-3d-ready"));
                }
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
