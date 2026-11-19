"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#091B2C]"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Top Accent: Fading line with central bronze diamond */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#B08D57]/50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#B08D57]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#B08D57]/50" />
            </div>

            {/* Main Title: Heritage Luxury Serif */}
            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-[0.3em] sm:tracking-[0.5em] text-[#F8F4EC] font-light ml-[0.3em] sm:ml-[0.5em]"
            >
              GRAPHIPACKS
            </motion.h1>

            {/* Subtitle: Heritage Specification */}
            <motion.p
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
              className="uppercase text-[0.65rem] sm:text-xs tracking-[0.4em] text-[#B08D57] font-medium ml-[0.4em]"
            >
              FLEXIBLE PACKAGING • EST. 1984
            </motion.p>

            {/* Bottom Accent: Subtle centered gradient rule */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B08D57]/70 to-transparent mt-4" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
