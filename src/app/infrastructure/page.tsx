import type { Metadata } from "next";
import Link from "next/link";
import InfrastructureBentoGrid from "@/components/InfrastructureBentoGrid";
import MaskedHeading from "@/components/ui/masked-heading";

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
    <div className="flex flex-col bg-background text-ink">
      {/* Editorial Header Section on Light Atmosphere */}
      <header className="relative overflow-hidden bg-light-atmosphere border-b border-powder pt-32 pb-20 md:pt-40 md:pb-28 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-background px-3.5 py-1 text-xs font-mono font-medium text-ink hover:border-heritage hover:text-heritage transition-colors"
              >
                <span>&larr; Return to Catalog</span>
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-powder bg-background px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-steel">
                <span className="h-2 w-2 rounded-full bg-red" />
                <span>01 / MANUFACTURING INFRASTRUCTURE</span>
              </div>
            </div>

            <MaskedHeading
              as="h1"
              className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.1] tracking-[-0.015em] text-ink"
            >
              Graphipacks Factory
            </MaskedHeading>

            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75 font-sans">
              Tour our in-house manufacturing plant in Madurai—coupling multi-layer blown film extrusion, 8-color precision rotogravure printing, and automated wicketing conversion since 1984.
            </p>
          </div>
        </div>
      </header>

      {/* Main Bento Grid Content Section on Honeydew */}
      <section
        aria-label="Manufacturing Infrastructure Bento Grid"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32 w-full"
      >
        <InfrastructureBentoGrid />
      </section>

      {/* Bottom Conversion / Technical Discussion CTA (Royal Statement Band) */}
      <section className="relative overflow-hidden bg-royal-band border-t border-powder/30 py-24 md:py-32 text-background">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-powder mb-4">
                Plant Technical Consultation
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.15] tracking-[-0.015em] text-background">
                Discuss Your Technical Specifications
              </h2>
              <p className="mt-3 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-background/80 font-sans">
                Contact our Madurai plant leadership and production engineers to request custom machine trials, evaluate barrier test data, or discuss high-volume flexible packaging runs.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-press inline-flex items-center justify-center rounded-md bg-red hover:bg-[#d62839] px-6 py-3.5 text-sm font-bold text-background transition-colors duration-200"
              >
                Inquire Directly &rarr;
              </Link>
              <Link
                href="/products"
                className="btn-press inline-flex items-center justify-center rounded-md border border-powder/50 bg-transparent px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-powder/15"
              >
                View All 6 Product Lines
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
