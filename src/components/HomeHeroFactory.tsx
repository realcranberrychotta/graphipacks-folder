"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const AgenticFactory3D = dynamic(() => import("@/components/ui/agentic-factory-3d"), {
  ssr: false,
});

export default function HomeHeroFactory() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Do NOT load or mount the 3D model on screens under 768px or during initial SSR
  if (!mounted || !isDesktop) {
    return null;
  }

  return (
    <div className="relative w-full h-[720px]" style={{ contain: "layout paint" }}>
      <AgenticFactory3D embed height={720} />
    </div>
  );
}
