"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Disable Lenis on mobile screens under 768px — use native scrolling on mobile only.
    // 2. Respect prefers-reduced-motion: if reduced motion is requested, do NOT initialize Lenis.
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    // Initialize Lenis on desktop (>= 768px) with lerp of 0.09 for smooth, weighted feel
    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.2,
      smoothWheel: true,
      autoRaf: false, // Driven by requestAnimationFrame loop below
      anchors: false, // Handled with custom header offset below
      prevent: (node) => {
        return (
          node.hasAttribute("data-lenis-prevent") ||
          !!node.closest("[data-lenis-prevent]")
        );
      },
    });

    lenisRef.current = lenis;
    lenis.start();

    // Drive Lenis with requestAnimationFrame loop
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Anchor links handler accounting for desktop sticky header height (72px)
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      if (!hash || hash === "#") return;

      const isCurrentPage =
        href.startsWith("#") ||
        href.startsWith(window.location.pathname + "#") ||
        (href.startsWith("/") && href.slice(0, hashIndex) === window.location.pathname);

      if (isCurrentPage) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, {
              offset: -72,
            });
            window.history.pushState(null, "", hash);
          }
        } catch {
          // Ignore
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(() => {
        try {
          const targetEl = document.querySelector(window.location.hash);
          if (targetEl) {
            lenis.scrollTo(targetEl, {
              offset: -72,
              immediate: false,
            });
          }
        } catch {
          // Ignore
        }
      }, 150);
    }

    // Listen to resize and reduced motion changes
    const mediaQueryMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaQueryMobile = window.matchMedia("(max-width: 767px)");

    const handleConstraintChange = () => {
      if (window.innerWidth < 768 || mediaQueryMotion.matches) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      }
    };

    mediaQueryMotion.addEventListener("change", handleConstraintChange);
    mediaQueryMobile.addEventListener("change", handleConstraintChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      mediaQueryMotion.removeEventListener("change", handleConstraintChange);
      mediaQueryMobile.removeEventListener("change", handleConstraintChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync route transitions with Lenis
  useEffect(() => {
    if (!lenisRef.current) return;
    lenisRef.current.start();
    lenisRef.current.resize();
  }, [pathname]);

  return null;
}
