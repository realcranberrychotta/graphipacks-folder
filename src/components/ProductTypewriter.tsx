"use client";

import * as React from "react";

export const STATIC_PRODUCTS = [
  "Mulch Film",
  "Grow Bags",
  "Coir Pith",
  "Laminated Rolls & Pouches",
  "PP & LLDPE Bags",
  "Wicked Poly Bags",
];

// Backwards compatibility export
export const DEFAULT_PRODUCTS = STATIC_PRODUCTS;

interface ProductTypewriterProps {
  items?: string[];
  prefix?: string;
  className?: string;
}

export default function ProductTypewriter({
  items,
  prefix,
  className = "",
}: ProductTypewriterProps) {
  const productList = items && items.length > 0 ? items : STATIC_PRODUCTS;

  return (
    <div
      className={`flex flex-wrap items-center justify-center md:justify-start gap-x-2.5 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 rounded-lg border border-[#B08D57]/30 bg-[#0F2A44]/70 px-3.5 py-2 sm:px-4 sm:py-2.5 backdrop-blur-xl md:backdrop-blur-2xl text-xs sm:text-sm font-medium text-[#F8F4EC] leading-relaxed max-w-full select-none ${className}`}
      role="region"
      aria-label="Core Manufactured Products"
    >
      {productList.map((product, idx) => (
        <span key={product} className="inline-flex items-center">
          <span className="text-[#F8F4EC] whitespace-normal">
            {product}
          </span>
          {idx < productList.length - 1 && (
            <span
              className="ml-2.5 sm:ml-3 text-[#B08D57] font-bold select-none"
              aria-hidden="true"
            >
              •
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export { ProductTypewriter };
