import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import InfrastructureBentoGrid from "@/components/InfrastructureBentoGrid";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

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

export default function InfrastructurePage() {
  return (
    <div className={`${playfair.variable} flex flex-col bg-transparent text-[#F8F4EC]`}>
      {/* Hero Header Section matching About and Products */}
      <header className="relative overflow-hidden border-b border-[#B08D57]/20 border-t-[#B08D57]/30 bg-[#0F2A44]/60 backdrop-blur-xl md:backdrop-blur-2xl py-20 text-[#F8F4EC] sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,141,87,0.18),transparent_50%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#B08D570a_1px,transparent_1px),linear-gradient(to_bottom,#B08D570a_1px,transparent_1px)] bg-[size:4rem_4rem]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/40 bg-[#1B3D5E]/40 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#B08D57] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#B08D57] animate-pulse" />
              <span>01 / MANUFACTURING INFRASTRUCTURE</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#F8F4EC] font-[family-name:var(--font-playfair)] font-serif">
              Graphipacks Factory
            </h1>

            <p className="mt-4 max-w-3xl text-sm sm:text-base lg:text-lg text-[#EFE8DC]/85 leading-relaxed font-sans">
              Tour our in-house manufacturing plant in Madurai—coupling multi-layer blown film extrusion, 8-color precision rotogravure printing, and automated wicketing conversion since 1984.
            </p>
          </div>
        </div>
      </header>

      {/* Main Bento Grid Content Section */}
      <section
        aria-label="Manufacturing Infrastructure Bento Grid"
        className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8 w-full"
      >
        <InfrastructureBentoGrid />
      </section>
    </div>
  );
}
