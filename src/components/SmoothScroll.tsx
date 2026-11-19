"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion: if reduced motion is requested, do NOT initialize smooth scrolling
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    // Dynamic header height to offset anchor link scrolling (111px on lg screens, 104px on mobile/tablet)
    const getHeaderOffset = () => {
      return window.innerWidth >= 1024 ? -111 : -104;
    };

    // Initialize Lenis with lerp of 0.09 for a smooth, weighted feel (between 0.08 and 0.1)
    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.2,
      smoothWheel: true,
      autoRaf: false, // Driven by requestAnimationFrame per user requirement
      anchors: false, // Handled with custom header offset below
      prevent: (node) => {
        // Prevent Lenis on Infrastructure page or inside any element with data-lenis-prevent
        return (
          window.location.pathname === "/infrastructure" ||
          window.location.pathname.startsWith("/infrastructure") ||
          node.hasAttribute("data-lenis-prevent") ||
          !!node.closest("[data-lenis-prevent]")
        );
      },
    });

    lenisRef.current = lenis;

    // Immediately stop Lenis if on /infrastructure route
    if (pathname === "/infrastructure" || pathname?.startsWith("/infrastructure/")) {
      lenis.stop();
    } else {
      lenis.start();
    }

    // Drive Lenis with requestAnimationFrame loop
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Anchor links handler accounting for sticky header height
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
              offset: getHeaderOffset(),
            });
            window.history.pushState(null, "", hash);
          }
        } catch {
          // Ignore invalid selector
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
              offset: getHeaderOffset(),
              immediate: false,
            });
          }
        } catch {
          // Ignore
        }
      }, 150);
    }

    // Handle reduced motion changes dynamically
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync route transitions with Lenis
  useEffect(() => {
    if (!lenisRef.current) return;
    if (pathname === "/infrastructure" || pathname?.startsWith("/infrastructure/")) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
      lenisRef.current.resize();
    }
  }, [pathname]);

  return null;
}
