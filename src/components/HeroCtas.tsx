"use client";

import Link from "next/link";

export default function HeroCtas() {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-1">
      {/* Primary Action — High-contrast Warm Alabaster & Imperial Oxblood */}
      <Link
        href="/contact"
        className="group relative inline-flex items-center justify-center rounded-none bg-[#F6F2EB] hover:bg-[#EDE6DA] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#3D0E18] border border-[#A6864C]/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F2EB]"
      >
        <span>Request Production Quote</span>
        <span
          className="ml-2.5 inline-block transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </Link>

      {/* Secondary Action — Antique Brass Framed Control */}
      <Link
        href="/products"
        className="group relative inline-flex items-center justify-center rounded-none border border-[#A6864C] bg-[#3D0E18]/60 px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-[#F6F2EB] transition-all hover:bg-[#A6864C]/20 hover:text-[#A6864C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6864C]"
      >
        <span
          className="absolute -top-[1px] -left-[1px] h-1.5 w-1.5 border-t border-l border-[#A6864C] transition-colors group-hover:border-[#F6F2EB]"
          aria-hidden="true"
        />
        <span
          className="absolute -top-[1px] -right-[1px] h-1.5 w-1.5 border-t border-r border-[#A6864C] transition-colors group-hover:border-[#F6F2EB]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] h-1.5 w-1.5 border-b border-l border-[#A6864C] transition-colors group-hover:border-[#F6F2EB]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -right-[1px] h-1.5 w-1.5 border-b border-r border-[#A6864C] transition-colors group-hover:border-[#F6F2EB]"
          aria-hidden="true"
        />

        <span>Explore Product Catalog</span>
      </Link>
    </div>
  );
}
