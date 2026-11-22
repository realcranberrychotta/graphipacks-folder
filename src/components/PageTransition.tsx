"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top immediately when new route mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Respect prefers-reduced-motion: if Reduce Motion is on, disable transition completely
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="page-transition-wrapper flex-1 w-full flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
