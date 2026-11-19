"use client";

import { usePathname } from "next/navigation";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Footer() {
  const pathname = usePathname();

  // The full-screen infrastructure tour relies on self-contained horizontal scroll tracking
  if (pathname === "/infrastructure" || pathname?.startsWith("/infrastructure/")) {
    return null;
  }

  return <CinematicFooter />;
}

