import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

export const metadata: Metadata = {
  title: "Manufacturing Infrastructure & Plant Capabilities | Graphipacks Private Limited",
  description:
    "Tour Graphipacks' Coimbatore manufacturing facility: 8-color rotogravure printing, film lamination, multi-layer blown film extrusion, and automated converting lines.",
  openGraph: {
    title: "Manufacturing Infrastructure & Plant Capabilities | Graphipacks Private Limited",
    description:
      "Tour Graphipacks' Coimbatore manufacturing facility: 8-color rotogravure printing, film lamination, multi-layer blown film extrusion, and automated converting lines.",
    images: [
      {
        url: "/images/infrastructure/infra-03-rotogravure-cylinders.jpg",
        alt: "Graphipacks 8-Color Rotogravure Printing Cylinders",
      },
    ],
  },
};

const WORKS: WorksWheelItem[] = [
  {
    title: "Flexo Printing",
    image: "/images/infrastructure/infra-01-flexo-ink-rollers.jpg",
    href: "#",
  },
  {
    title: "Film Lamination",
    image: "/images/infrastructure/infra-02-film-lamination-rollers.jpg",
    href: "#",
  },
  {
    title: "8-Color Rotogravure Printing",
    image: "/images/infrastructure/infra-03-rotogravure-cylinders.jpg",
    href: "#",
  },
  {
    title: "Automated Inspection Line",
    image: "/images/infrastructure/infra-04-automated-line.jpg",
    href: "#",
  },
  {
    title: "Packing & Conveying",
    image: "/images/infrastructure/infra-05-packing-conveyor.jpg",
    href: "#",
  },
  {
    title: "Printed Film Rolls & Stock",
    image: "/images/infrastructure/infra-06-laminated-film-rolls.jpg",
    href: "#",
  },
];

export default function InfrastructurePage() {
  return (
    <main data-lenis-prevent className="w-full min-h-screen md:h-screen bg-[#091B2C] bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(15,42,68,0.8),transparent)] text-[#F8F4EC] relative md:overflow-hidden font-sans">
      {/* Return to Home / Catalog button */}
      <Link
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex min-h-[44px] items-center gap-2 px-4 py-2.5 bg-[#0F2A44]/80 backdrop-blur-md border border-[#B08D57]/30 rounded-full hover:bg-[#1B3D5E]/80 transition-colors text-xs sm:text-sm font-medium tracking-wide text-[#F8F4EC] shadow-lg shadow-[#091B2C]/50"
      >
        <ArrowLeft className="w-4 h-4 text-[#B08D57]" /> Return to Catalog
      </Link>

      {/* Desktop View: Interactive Works Wheel Carousel */}
      <div className="hidden md:block w-full h-full overflow-hidden">
        <WorksWheel
          items={WORKS}
          label="Graphipacks Factory"
          action="Inspect"
          className="bg-transparent font-[family-name:var(--font-display)] text-[#F8F4EC]"
        />
      </div>

      {/* Mobile View: Vertical Stacked Layout (Responsive at 390px) */}
      <div className="block md:hidden w-full pt-20 pb-16 px-4 space-y-6">
        <div className="text-center max-w-sm mx-auto mb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            Coimbatore Plant Capabilities
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#F8F4EC]">
            Graphipacks Factory
          </h1>
          <p className="mt-2 text-xs text-[#EFE8DC]/80 leading-relaxed">
            Tour our 6 manufacturing stations from prepress cylinder engraving to automated wicket bag converting.
          </p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          {WORKS.map((station, idx) => (
            <div
              key={station.title}
              className="rounded-2xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl overflow-hidden shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#091B2C]">
                <Image
                  src={station.image}
                  alt={station.title}
                  width={600}
                  height={450}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 400px"
                  loading="lazy"
                  decoding="async"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
                  className="size-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center rounded-full bg-[#0F2A44]/90 backdrop-blur-md px-3 py-1 font-mono text-[11px] font-bold text-[#F8F4EC] border border-[#B08D57]/40 shadow-sm">
                    Station 0{idx + 1}
                  </span>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#F8F4EC]">
                    {station.title}
                  </h2>
                  <span className="text-[11px] text-[#B08D57] font-mono">
                    Verified Infrastructure
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#B08D57] bg-[#091B2C]/70 px-3 py-1.5 rounded-lg border border-[#B08D57]/30">
                  Inspect &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
