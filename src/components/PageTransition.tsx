"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isFirstMount = useRef(true);
  const [curtainKey, setCurtainKey] = useState<string | null>(null);

  // Scroll to top immediately when new route mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // On initial mount, let the Preloader handle the entrance without double-curtaining
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Trigger quick 350ms Dark Navy curtain wipe on subsequent route transitions
    setCurtainKey(pathname + "-" + Date.now());
  }, [pathname]);

  // Respect prefers-reduced-motion: if Reduce Motion is on, disable transition completely
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <div className="page-transition-wrapper relative flex-1 w-full flex flex-col">
      {/* Quick 350ms Dark Navy Curtain Wipe between routes */}
      <AnimatePresence mode="wait">
        {curtainKey && (
          <motion.div
            key={curtainKey}
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => setCurtainKey(null)}
            className="fixed inset-0 z-[9990] bg-[#1D3557] pointer-events-none flex flex-col justify-end"
            aria-hidden="true"
          >
            {/* Subtle bottom Powder Blue hairline matching preloader signature */}
            <div className="w-full h-px bg-[#A8DADC]/40" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0.88 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex-1 w-full flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  );
}
