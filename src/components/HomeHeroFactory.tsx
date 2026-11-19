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
    return (
      <div className="relative w-full h-full min-h-[720px] overflow-hidden bg-[#0F2A44]" style={{ contain: "layout paint" }}>
        <Image
          src="/images/infrastructure/infra-01-flexo-ink-rollers.jpg"
          alt="Graphipacks Manufacturing Line - Flexo Printing"
          fill
          priority
          decoding="async"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091B2C] via-[#0F2A44]/70 to-[#0F2A44]/40" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[720px]" style={{ contain: "layout paint" }}>
      <AgenticFactory3D embed height={720} />
    </div>
  );
}
