"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { products, packagingForms } from "@/lib/content";
import ProductCatalog from "@/components/ProductCatalog";
import MaskedHeading from "@/components/ui/masked-heading";

export const metadata: Metadata = {
  title: "Packaging Products Catalog & Specifications | Graphipacks Private Limited",
  description:
    "Explore our complete flexible packaging product catalog: agricultural mulch films, grow bags, coir pith export bags, high-barrier laminated pouches, and wicketed poly bags.",
  openGraph: {
    title: "Packaging Products Catalog & Specifications | Graphipacks Private Limited",
    description:
      "Explore our complete flexible packaging product catalog: agricultural mulch films, grow bags, coir pith export bags, high-barrier laminated pouches, and wicketed poly bags.",
  },
};

export default async function ProductsPage() {
  cacheLife("days");

  return (
    <div className="flex flex-col bg-background text-ink">
      {/* Header Section — Light Atmosphere */}
      <header className="relative overflow-hidden bg-light-atmosphere border-b border-powder pt-28 pb-14 md:pt-32 md:pb-16 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[#457B9D] mb-4">
              <span className="h-2 w-2 rounded-full bg-[#E63946] shrink-0" aria-hidden="true" />
              <span>FULL MANUFACTURING CATALOG &bull; EST. 1984</span>
            </span>
            <MaskedHeading
              as="h1"
              className="font-display font-bold text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[1.04] tracking-[-0.02em] text-[#1D3557] [text-wrap:balance] max-w-4xl mx-auto"
            >
              Packaging Products &amp; Solutions
            </MaskedHeading>
            <p className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed text-[#1D3557]/85 max-w-2xl mx-auto font-sans">
              Explore our complete range of agricultural mulch films, dual-tone grow bags, coir pith export bags, high-barrier laminates, and high-speed wicketted poly bags.
            </p>
          </div>
        </div>
      </header>

      {/* Main Interactive Catalog Section */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32 w-full">
        <ProductCatalog
          products={products}
          packagingForms={packagingForms}
        />
      </main>

      {/* Custom Specification Banner — Royal Statement Band */}
      <section className="relative overflow-hidden bg-royal-band border-t border-powder/30 py-24 md:py-32 text-background">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-powder mb-4">
                CUSTOM BLENDS &amp; SPECIFICATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.15] tracking-[-0.015em] text-background">
                Require Custom Dimensions, Gauges or Flexo Printing?
              </h2>
              <p className="mt-3 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-background/85 font-sans">
                We manufacture bespoke film blends, custom gusset styles, UV stabilization durations, and up to 8-color high-definition printing to exact client technical specifications.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-press inline-flex items-center justify-center rounded-md bg-red hover:bg-[#d62839] px-6 py-3.5 text-sm font-bold text-background border border-red transition-colors duration-200"
              >
                Request Custom Specs Quote &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
