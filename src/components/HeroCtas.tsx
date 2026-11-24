"use client";

import Link from "next/link";

export default function HeroCtas() {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-1">
      {/* Primary Action — High-contrast Honeydew & Dark Navy */}
      <Link
        href="/contact"
        className="btn-press group relative inline-flex items-center justify-center rounded-md bg-red hover:bg-[#d62839] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-[0.16em] text-background border border-red transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <span>Request Production Quote</span>
        <span
          className="ml-2.5 inline-block transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </Link>

      {/* Secondary Action — Steel Blue Framed Control */}
      <Link
        href="/products"
        className="btn-press group relative inline-flex items-center justify-center rounded-md border border-steel bg-transparent px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-powder/20 hover:border-navy hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel"
      >
        <span
          className="absolute -top-[1px] -left-[1px] h-1.5 w-1.5 border-t border-l border-steel transition-colors group-hover:border-navy"
          aria-hidden="true"
        />
        <span
          className="absolute -top-[1px] -right-[1px] h-1.5 w-1.5 border-t border-r border-steel transition-colors group-hover:border-navy"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] h-1.5 w-1.5 border-b border-l border-steel transition-colors group-hover:border-navy"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -right-[1px] h-1.5 w-1.5 border-b border-r border-steel transition-colors group-hover:border-navy"
          aria-hidden="true"
        />

        <span>Explore Product Catalog</span>
      </Link>
    </div>
  );
}
