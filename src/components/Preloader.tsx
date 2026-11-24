"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Preloader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (shouldReduceMotion) {
      setIsVisible(false);
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("show-intro");
      }
      return;
    }

    // Show full-screen intro animation ONLY on a visitor's first visit to Home in this browser
    const isHome = pathname === "/";
    let hasSeenIntro = false;
    try {
      hasSeenIntro = localStorage.getItem("graphipacks-intro-seen") === "true";
    } catch {
      // ignore
    }

    if (isHome && !hasSeenIntro) {
      setIsVisible(true);

      const finishIntro = () => {
        setIsVisible(false);
        try {
          localStorage.setItem("graphipacks-intro-seen", "true");
        } catch {}
        if (typeof document !== "undefined") {
          document.documentElement.classList.remove("show-intro");
        }
      };

      const timer = setTimeout(finishIntro, 800);

      window.addEventListener("skip-hero-animation", finishIntro);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("skip-hero-animation", finishIntro);
      };
    } else {
      setIsVisible(false);
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("show-intro");
      }
    }
  }, [pathname, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Top Accent: Fading line with central diamond */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-steel/50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-red" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-steel/50" />
            </div>

            {/* Main Title: Heritage Luxury Serif */}
            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-[0.3em] sm:tracking-[0.5em] text-background font-light ml-[0.3em] sm:ml-[0.5em]"
            >
              GRAPHIPACKS
            </motion.h1>

            {/* Subtitle: Heritage Specification */}
            <motion.p
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.05 }}
              className="uppercase text-[0.65rem] sm:text-xs tracking-[0.4em] text-steel font-medium ml-[0.4em]"
            >
              FLEXIBLE PACKAGING • EST. 1984
            </motion.p>

            {/* Bottom Accent: Subtle centered gradient rule */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-steel/70 to-transparent mt-4" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
