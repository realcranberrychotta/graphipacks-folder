"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { products, packagingForms } from "@/lib/content";
import ProductCatalog from "@/components/ProductCatalog";

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
      <header className="relative overflow-hidden bg-light-atmosphere border-b border-powder pt-32 pb-20 md:pt-40 md:pb-28 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
              FULL MANUFACTURING CATALOG &bull; EST. 1984
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-normal leading-[1.06] tracking-[-0.025em] text-ink font-serif">
              Packaging Products &amp; Solutions
            </h1>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
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
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-powder mb-4">
                CUSTOM BLENDS &amp; SPECIFICATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-background">
                Require Custom Dimensions, Gauges or Flexo Printing?
              </h2>
              <p className="mt-3 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-background/85 font-sans">
                We manufacture bespoke film blends, custom gusset styles, UV stabilization durations, and up to 8-color high-definition printing to exact client technical specifications.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-red hover:bg-[#d62839] px-6 py-3.5 text-sm font-bold text-background border border-red transition-colors duration-200"
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
