"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export interface InfrastructureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  colSpan: string;
}

export const INFRASTRUCTURE_ITEMS: InfrastructureItem[] = [
  {
    id: "01",
    title: "8-Color Rotogravure Printing",
    description:
      "High-definition electronic cylinder engraving and multi-color precision ink registration for high-barrier flexible packaging films.",
    image: "/images/infrastructure/infra-03-rotogravure-cylinders.jpg",
    colSpan: "md:col-span-2",
  },
  {
    id: "02",
    title: "Multi Layer Blown Film Extrusion",
    description:
      "Continuous 3-layer & ABA blown film extrusion lines with custom polymer blending and tight gauge tolerance control.",
    image: "/images/infrastructure/infra-02-film-lamination-rollers.jpg",
    colSpan: "md:col-span-1",
  },
  {
    id: "03",
    title: "High-Speed Slitting & Converting",
    description:
      "Precision flexographic ink metering and high-speed rotary slitting systems delivering exact roll widths and tension profiles.",
    image: "/images/infrastructure/infra-01-flexo-ink-rollers.jpg",
    colSpan: "md:col-span-1",
  },
  {
    id: "04",
    title: "Automated Wicketing Lines",
    description:
      "High-speed automated wicket bag machines producing pin-perforated poly bags optimized for automated bread and garment packing lines.",
    image: "/images/infrastructure/infra-05-packing-conveyor.jpg",
    colSpan: "md:col-span-2",
  },
  {
    id: "05",
    title: "Quality Control & Tensile Testing",
    description:
      "Inline optical inspection, tensile elongation analysis, and hermetic seal-integrity testing adhering to strict B2B export standards.",
    image: "/images/infrastructure/infra-04-automated-line.jpg",
    colSpan: "md:col-span-2",
  },
  {
    id: "06",
    title: "Raw Polymer Warehousing",
    description:
      "Climate-controlled inventory storage for virgin polymer pellets, specialized masterbatches, and laminated master film rolls.",
    image: "/images/infrastructure/infra-06-laminated-film-rolls.jpg",
    colSpan: "md:col-span-1",
  },
];

interface InfrastructureBentoGridProps {
  items?: InfrastructureItem[];
}

export default function InfrastructureBentoGrid({
  items = INFRASTRUCTURE_ITEMS,
}: InfrastructureBentoGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {items.map((item, index) => {
        const isWide = item.colSpan.includes("col-span-2");

        return (
          <motion.article
            key={item.id}
            suppressHydrationWarning
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.45,
              delay: shouldReduceMotion ? 0 : (index % 3) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`${item.colSpan} h-72 md:h-80 lg:h-[360px] rounded-xl overflow-hidden relative border border-[#B08D57]/25 bg-[#091B2C] group shadow-xl shadow-[#091B2C]/40 select-none`}
          >
            {/* Full-Bleed Infrastructure Photo */}
            <Image
              src={item.image}
              alt={`${item.title} — Graphipacks Infrastructure`}
              fill
              sizes={
                isWide
                  ? "(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 850px"
                  : "(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 450px"
              }
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
              className="w-full h-full object-cover md:group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />

            {/* Bottom Gradient Scrim for Legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#091B2C]/95 via-[#091B2C]/50 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Bottom-Left Anchored Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end pointer-events-none">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#B08D57] uppercase">
                {item.id}
              </span>
              <h2 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#F8F4EC] font-[family-name:var(--font-playfair)] font-serif">
                {item.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#EFE8DC]/85 line-clamp-3 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
