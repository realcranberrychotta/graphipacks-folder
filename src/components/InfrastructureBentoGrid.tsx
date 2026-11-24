"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export interface InfrastructureItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const INFRASTRUCTURE_ITEMS: InfrastructureItem[] = [
  {
    id: "01",
    title: "8-Color Rotogravure Printing",
    description:
      "High-definition electronic cylinder engraving and multi-color precision ink registration for high-barrier flexible packaging films.",
    image: "/images/infrastructure/infra-03-rotogravure-cylinders.jpg",
  },
  {
    id: "02",
    title: "Multi Layer Blown Film Extrusion",
    description:
      "Continuous 3-layer & ABA blown film extrusion lines with custom polymer blending and tight gauge tolerance control.",
    image: "/images/infrastructure/infra-02-film-lamination-rollers.jpg",
  },
  {
    id: "03",
    title: "High-Speed Slitting & Converting",
    description:
      "Precision flexographic ink metering and high-speed rotary slitting systems delivering exact roll widths and tension profiles.",
    image: "/images/infrastructure/infra-01-flexo-ink-rollers.jpg",
  },
  {
    id: "04",
    title: "Automated Wicketing Lines",
    description:
      "High-speed automated wicket bag machines producing pin-perforated poly bags optimized for automated bread and garment packing lines.",
    image: "/images/infrastructure/infra-05-packing-conveyor.jpg",
  },
  {
    id: "05",
    title: "Quality Control & Tensile Testing",
    description:
      "Inline optical inspection, tensile elongation analysis, and hermetic seal-integrity testing adhering to strict B2B export standards.",
    image: "/images/infrastructure/infra-04-automated-line.jpg",
  },
  {
    id: "06",
    title: "Raw Polymer Warehousing",
    description:
      "Climate-controlled inventory storage for virgin polymer pellets, specialized masterbatches, and laminated master film rolls.",
    image: "/images/infrastructure/infra-06-laminated-film-rolls.jpg",
  },
];

interface InfrastructureBentoGridProps {
  items?: InfrastructureItem[];
}

export default function InfrastructureBentoGrid({
  items = INFRASTRUCTURE_ITEMS,
}: InfrastructureBentoGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync with desktop viewport (min-width: 768px)
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const isSticky = isDesktop && !shouldReduceMotion;

  // Track active card on scroll for focus state (transform & opacity only)
  useEffect(() => {
    if (!isSticky || !containerRef.current) return;

    let ticking = false;

    const updateActiveCard = () => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll<HTMLElement>("[data-stack-card]");
      if (!cards || cards.length === 0) return;

      const headerHeight = 72;
      const baseOffset = headerHeight + 20;

      let currentActive = 0;
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardStickyTop = baseOffset + idx * 32;
        // When card reaches near its sticky offset, it becomes the active/focused card
        if (rect.top <= cardStickyTop + 36) {
          currentActive = idx;
        }
      });

      setActiveIndex(currentActive);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveCard);
        ticking = true;
      }
    };

    updateActiveCard();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isSticky]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-5xl space-y-8 md:space-y-32 lg:space-y-40 pb-20 md:pb-36"
    >
      {items.map((item, index) => {
        const isPast = isSticky && index < activeIndex;
        // Each card sticks to the top with offset = header height (72px) + 20px, plus 32px per card for peeking tabs
        const topOffset = isSticky
          ? `calc(var(--header-height, 72px) + 20px + ${index * 32}px)`
          : undefined;

        return (
          <article
            key={item.id}
            data-stack-card
            data-index={index}
            className="infrastructure-sticky-card group relative w-full h-[420px] sm:h-[460px] md:h-[480px] lg:h-[520px] rounded-lg overflow-hidden border border-ink/15 bg-ink select-none"
            style={{
              position: isSticky ? "sticky" : "relative",
              top: topOffset,
              zIndex: isSticky ? index + 1 : undefined,
              transform: isPast ? "scale(0.985)" : "scale(1)",
              opacity: isPast ? 0.9 : 1,
              transition: shouldReduceMotion
                ? "none"
                : "transform 250ms ease-in-out, opacity 250ms ease-in-out",
            }}
          >
            {/* Top Peeking Tab Bar (visible when previous cards peek out at top) */}
            <div className="absolute top-0 inset-x-0 h-8 px-4 sm:px-6 flex items-center justify-between border-b border-powder/40 bg-ink z-20">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold tracking-widest text-powder">
                  {item.id}
                </span>
                <span className="text-powder/50" aria-hidden="true">&bull;</span>
                <span className="font-mono text-xs font-bold tracking-wider text-background uppercase truncate max-w-[200px] sm:max-w-none">
                  {item.title}
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-powder uppercase hidden xs:inline">
                Madurai Plant
              </span>
            </div>

            {/* Full-Bleed Infrastructure Photo */}
            <div className="relative w-full h-full pt-8">
              <Image
                src={item.image}
                alt={`${item.title} — Graphipacks Infrastructure`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
              />

              {/* Bottom Gradient Scrim strictly over the bottom ~35% behind text; top 65-70% remains clear and unobstructed */}
              <div
                className="absolute inset-x-0 bottom-0 h-[40%] sm:h-[35%] bg-gradient-to-t from-ink/90 via-ink/35 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Bottom-Left Anchored Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10 z-10 flex flex-col justify-end pointer-events-none max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-powder">
                    01 / MANUFACTURING INFRASTRUCTURE
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
                  <span className="font-mono text-[10px] tracking-wider text-background/70 uppercase hidden sm:inline">
                    Continuous Plant Operation
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal leading-[1.12] tracking-[-0.02em] text-background font-[family-name:var(--font-playfair)]">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-[60ch] text-[15px] md:text-base leading-[1.7] text-background/85 font-sans line-clamp-3 sm:line-clamp-none">
                  {item.description}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
