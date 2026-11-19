"use cache";

import { cacheLife } from "next/cache";
import Link from "next/link";
import { products, packagingForms } from "@/lib/content";
import ProductCatalog from "@/components/ProductCatalog";

export default async function ProductsPage() {
  cacheLife("days");

  return (
    <div className="flex flex-col bg-transparent text-[#F8F4EC]">
      {/* Header Section */}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/40 bg-[#1B3D5E]/40 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#F8F4EC] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
              <span>Full Manufacturing Catalog</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-[#F8F4EC]">
              Packaging Products &amp; Solutions
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-[#EFE8DC] leading-relaxed">
              Explore our complete range of agricultural mulch films, dual-tone grow bags, coir pith export bags, high-barrier laminates, and high-speed wicketted poly bags.
            </p>
          </div>
        </div>
      </header>

      {/* Main Interactive Catalog Section */}
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
        <ProductCatalog
          products={products}
          packagingForms={packagingForms}
        />
      </main>

      {/* Custom Specification Banner */}
      <section className="border-t border-[#B08D57]/25 bg-[#0F2A44]/80 backdrop-blur-2xl py-16 text-[#F8F4EC] sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC]">
                Require Custom Dimensions, Gauges or Flexo Printing?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#EFE8DC]">
                We manufacture bespoke film blends, custom gusset styles, UV stabilization durations, and up to 8-color high-definition printing to exact client technical specifications.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-sm font-bold text-[#091B2C] shadow-lg shadow-[#B08D57]/25 transition hover:scale-[1.02] active:scale-[0.98]"
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
