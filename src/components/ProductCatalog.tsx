"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Product, PackagingForm } from "@/lib/content";

const bouncySpring = {
  duration: 0.2,
  ease: "easeInOut",
} as const;

interface ProductCatalogProps {
  products: Product[];
  packagingForms: PackagingForm[];
}

const PRODUCT_GRID_COVER_IMAGES: Record<string, string> = {
  "agriculture-mulch-film": "/images/products/mulch-film.jpg",
  "grow-bags": "/images/products/grow-bags.jpg",
  "coir-pith-bags": "/images/products/coir-pith-bags.jpg",
  "laminated-rolls-and-pouches": "/images/products/laminated-rolls-and-pouches.jpg",
  "pp-and-lldpe-bags": "/images/products/pp-and-lldpe-bags.jpg",
  "wicketted-poly-bags": "/images/products/wicked-poly-bags.jpg",
  "wicked-poly-bags": "/images/products/wicked-poly-bags.jpg",
};

export default function ProductCatalog({
  products,
  packagingForms,
}: ProductCatalogProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFormIndex, setSelectedFormIndex] = useState<number>(0);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return products.length;
    return products.filter((p) => p.category === cat).length;
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const activeForm = packagingForms[selectedFormIndex] || packagingForms[0];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Category Filter Controls */}
      <section aria-labelledby="catalog-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-ink/10 pb-8">
          <div>
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
              01 / PRODUCT CATALOG &bull; EST. 1984
            </span>
            <h2
              id="catalog-heading"
              className="mt-1 text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-ink"
            >
              Manufacturing Product Index
            </h2>
            <p className="mt-2 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
              Showing {filteredProducts.length} of {products.length} product lines
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const count = getCategoryCount(cat);
              const isSelected = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={bouncySpring}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn-press inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-steel focus:ring-offset-2 ${isSelected
                    ? "bg-heritage text-background border border-heritage"
                    : "bg-surface text-ink border border-ink/10 hover:border-steel hover:text-navy"
                    }`}
                >
                  <span>{cat === "All" ? "All Products" : cat}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${isSelected
                      ? "bg-navy text-powder font-bold"
                      : "bg-background text-ink/75"
                      }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid with Instant Filtering */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.slug}
              className="h-full"
            >
              <Link
                href={`/products/${product.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-lg transition-colors duration-200 ease-in-out hover:border-steel h-full cursor-pointer bg-background border border-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
              >
                <div>
                  {/* Real Product Photo — Curated Gallery Exhibit Mat */}
                  <div className="p-3 pb-0 bg-background">
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-md border border-powder/60 bg-surface shadow-xs">
                      <Image
                        src={PRODUCT_GRID_COVER_IMAGES[product.slug] || product.image}
                        alt={product.name}
                        width={600}
                        height={375}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-powder/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-navy border border-powder">
                        {product.category}
                      </span>
                      <span className="font-mono text-xs text-ink/75">
                        {product.types.length} Variants
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl md:text-2xl font-serif font-normal leading-[1.2] tracking-[-0.015em] text-ink group-hover:text-heritage transition-colors duration-200 ease-in-out">
                      {product.name}
                    </h3>

                    {/* Why Graphipacks value proposition callout */}
                    <div className="mt-4 rounded-lg border border-powder bg-surface p-3.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-steel">
                        Why Graphipacks:
                      </p>
                      <p className="mt-1 text-xs text-ink leading-relaxed font-medium">
                        {product.whyGraphipacks}
                      </p>
                    </div>

                    {/* Types Pills */}
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink/75">
                        Standard Types &amp; Sizes:
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {product.types.map((type, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-md border border-ink/10 bg-surface px-2 py-1 text-xs font-medium text-ink hover:border-steel hover:text-steel transition-colors"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-ink/10 p-6 md:p-8 pt-4 min-h-[44px] flex items-center justify-between text-sm font-semibold text-heritage">
                  <span className="inline-flex min-h-[44px] items-center gap-1 group-hover:text-steel transition-colors duration-200 ease-in-out">
                    View Specifications Sheet &rarr;
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Packaging by Product Form Tab Switcher */}
      <section
        aria-labelledby="packaging-forms-heading"
        className="rounded-3xl border border-ink/10 bg-surface p-8 md:p-12 text-ink"
      >
        <div className="max-w-3xl">
          <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
            INTERACTIVE SPECIFICATION TOOL
          </span>
          <h2
            id="packaging-forms-heading"
            className="mt-2 text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-ink"
          >
            Packaging by Product Form
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
            Select a physical material state to review recommended barrier packaging structures, pouches, and containment formats.
          </p>
        </div>

        {/* Tab Buttons with Bouncy Spring Physics */}
        <div className="mt-8 flex flex-wrap gap-2.5 border-b border-powder pb-4">
          {packagingForms.map((item, idx) => {
            const isSelected = selectedFormIndex === idx;
            return (
              <motion.button
                key={item.form}
                type="button"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={bouncySpring}
                onClick={() => setSelectedFormIndex(idx)}
                className={`min-h-[44px] rounded-xl px-4 py-2.5 text-sm font-bold transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-steel ${isSelected
                  ? "bg-heritage text-background border border-heritage"
                  : "bg-background text-ink border border-ink/10 hover:border-steel hover:text-navy"
                  }`}
              >
                {item.form}
              </motion.button>
            );
          })}
        </div>

        {/* Active Form Detail Card */}
        {activeForm && (
          <motion.div
            key={activeForm.form}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="mt-8 rounded-2xl border border-powder bg-background p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-powder bg-surface px-3 py-1 text-xs font-semibold text-steel">
                  <span className="h-1.5 w-1.5 rounded-full bg-red" />
                  <span>Physical State Compatibility</span>
                </div>
                <h3 className="mt-3 text-2xl md:text-3xl font-serif font-normal leading-[1.2] tracking-[-0.015em] text-ink">
                  {activeForm.form}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-ink/75">
                  Engineered with customized barrier films, hermetic heat-seal layers, and puncture resistance tailored for filling machinery.
                </p>

                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-steel">
                    Common Industrial &amp; Retail Examples:
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeForm.examples.map((example) => (
                      <span
                        key={example}
                        className="inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-surface px-3.5 py-2 text-sm font-semibold text-ink"
                      >
                        <svg
                          className="h-4 w-4 text-steel shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{example}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={bouncySpring}
                >
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-heritage hover:bg-heritage px-6 py-3.5 text-sm font-bold text-background transition-colors duration-200 ease-in-out text-center"
                  >
                    Request Quote for {activeForm.form} &rarr;
                  </Link>
                </motion.div>
                <p className="text-xs text-ink/75 text-center">
                  Technical datasheets &amp; free sample kits available
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
