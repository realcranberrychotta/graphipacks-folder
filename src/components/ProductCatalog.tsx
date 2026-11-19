"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, PackagingForm } from "@/lib/content";

const bouncySpring = {
  type: "spring",
  stiffness: 400,
  damping: 14,
  mass: 0.8,
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFormIndex, setSelectedFormIndex] = useState<number>(0);

  // Extract unique categories preserving order
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
    <div className="space-y-20">
      {/* Category Filter Controls */}
      <section aria-labelledby="catalog-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B08D57]/20 pb-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57] block">
              01 — Product Catalog
            </span>
            <h2
              id="catalog-heading"
              className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8F4EC]"
            >
              Manufacturing Product Index
            </h2>
            <p className="mt-1 text-sm text-[#EFE8DC]">
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
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={bouncySpring}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 ${
                    isSelected
                      ? "bg-[#B08D57] text-[#091B2C] border border-[#B08D57] shadow-lg shadow-[#091B2C]/40"
                      : "bg-[#0F2A44]/60 text-[#F8F4EC] border border-[#B08D57]/25 hover:bg-[#1B3D5E]/60 hover:border-[#B08D57]/50"
                  }`}
                >
                  <span>{cat === "All" ? "All Products" : cat}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                      isSelected
                        ? "bg-[#091B2C] text-[#B08D57] font-bold"
                        : "bg-[#091B2C]/60 text-[#EFE8DC]"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid with Animated Filtering */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.article
                key={product.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl md:backdrop-blur-2xl shadow-xl transition hover:border-[#B08D57]/50 hover:shadow-2xl"
              >
                <div>
                  {/* High-Resolution Photographic Header with Navy/Bronze Overlay */}
                  <div className="relative w-full h-48 overflow-hidden bg-[#091B2C]">
                    <Image
                      src={PRODUCT_GRID_COVER_IMAGES[product.slug] || product.image}
                      alt={product.name}
                      width={600}
                      height={384}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      decoding="async"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
                      className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0F2A44] to-transparent opacity-85 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-[#1B3D5E]/60 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#F8F4EC] border border-[#B08D57]/30">
                        {product.category}
                      </span>
                      <span className="font-mono text-xs text-[#EFE8DC]/70">
                        {product.types.length} Variants
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-[#F8F4EC] group-hover:text-[#B08D57] transition">
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:underline focus:outline-hidden"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {product.name}
                      </Link>
                    </h3>

                    {/* Why Graphipacks value proposition callout */}
                    <div className="mt-3 rounded-lg border border-[#B08D57]/20 bg-[#091B2C]/50 p-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
                        Why Graphipacks:
                      </p>
                      <p className="mt-1 text-xs text-[#EFE8DC] leading-relaxed font-medium">
                        {product.whyGraphipacks}
                      </p>
                    </div>

                    {/* Types Pills */}
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#EFE8DC]/70">
                        Standard Types &amp; Sizes:
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {product.types.map((type, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-md border border-[#B08D57]/20 bg-[#091B2C]/60 px-2 py-1 text-xs font-medium text-[#F8F4EC]"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#B08D57]/20 p-6 pt-4 flex items-center justify-between text-sm font-semibold text-[#B08D57]">
                  <span className="inline-flex items-center gap-1 group-hover:text-[#F8F4EC] transition">
                    View Specifications Sheet &rarr;
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Interactive Packaging by Product Form Tab Switcher */}
      <section
        aria-labelledby="packaging-forms-heading"
        className="rounded-3xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl md:backdrop-blur-2xl p-8 sm:p-12 shadow-xl"
      >
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            Interactive Specification Tool
          </span>
          <h2
            id="packaging-forms-heading"
            className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8F4EC]"
          >
            Packaging by Product Form
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#EFE8DC]">
            Select a physical material state to review recommended barrier packaging structures, pouches, and containment formats.
          </p>
        </div>

        {/* Tab Buttons with Bouncy Spring Physics */}
        <div className="mt-8 flex flex-wrap gap-2.5 border-b border-[#B08D57]/20 pb-4">
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
                className={`min-h-[44px] rounded-xl px-4 py-2.5 text-sm font-bold transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#B08D57] ${
                  isSelected
                    ? "bg-[#B08D57] text-[#091B2C] border border-[#B08D57] shadow-md"
                    : "bg-[#091B2C]/50 text-[#F8F4EC] border border-[#B08D57]/25 hover:bg-[#1B3D5E]/60"
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
            transition={{ duration: 0.2 }}
            className="mt-8 rounded-2xl border border-[#B08D57]/30 bg-[#091B2C]/60 p-6 sm:p-8 backdrop-blur-md"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/30 bg-[#1B3D5E]/50 px-3 py-1 text-xs font-semibold text-[#F8F4EC]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
                  <span>Physical State Compatibility</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold text-[#F8F4EC]">
                  {activeForm.form}
                </h3>
                <p className="mt-2 text-sm text-[#EFE8DC]">
                  Engineered with customized barrier films, hermetic heat-seal layers, and puncture resistance tailored for filling machinery.
                </p>

                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
                    Common Industrial &amp; Retail Examples:
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeForm.examples.map((example) => (
                      <span
                        key={example}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#B08D57]/20 bg-[#0F2A44]/60 px-3.5 py-2 text-sm font-semibold text-[#F8F4EC] shadow-xs"
                      >
                        <svg
                          className="h-4 w-4 text-[#B08D57] shrink-0"
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
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3 text-sm font-bold text-[#091B2C] shadow-md shadow-[#B08D57]/20 transition hover:scale-[1.02] active:scale-[0.98] text-center"
                  >
                    Request Quote for {activeForm.form} &rarr;
                  </Link>
                </motion.div>
                <p className="text-xs text-[#EFE8DC]/70 text-center">
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
