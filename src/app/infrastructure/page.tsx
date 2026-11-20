import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import InfrastructureMobileCarousel from "@/components/InfrastructureMobileCarousel";

export const metadata: Metadata = {
  title: "Manufacturing Infrastructure & Plant Capabilities | Graphipacks Private Limited",
  description:
    "Tour Graphipacks' Madurai manufacturing facility: 8-color rotogravure printing, film lamination, multi-layer blown film extrusion, and automated converting lines.",
  openGraph: {
    title: "Manufacturing Infrastructure & Plant Capabilities | Graphipacks Private Limited",
    description:
      "Tour Graphipacks' Madurai manufacturing facility: 8-color rotogravure printing, film lamination, multi-layer blown film extrusion, and automated converting lines.",
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

      {/* Mobile View: Interactive Touch & Auto-Advance Carousel (Responsive at 390px) */}
      <div className="block md:hidden w-full">
        <InfrastructureMobileCarousel
          items={WORKS}
          label="Graphipacks Factory"
        />
      </div>
    </main>
  );
}
