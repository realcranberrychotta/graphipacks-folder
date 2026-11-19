"use client";

import Link from "next/link";

export default function HeroCtas() {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-1">
      {/* Primary Action — High-contrast Bronze Block */}
      <Link
        href="/contact"
        className="group relative inline-flex items-center justify-center rounded-none bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#091B2C] border border-[#B08D57]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57]"
      >
        <span>Request Production Quote</span>
        <span
          className="ml-2.5 inline-block transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </Link>

      {/* Secondary Action — Frosted Glassmorphism Framed Control */}
      <Link
        href="/products"
        className="group relative inline-flex items-center justify-center rounded-none border border-[#B08D57]/30 border-t-[#F8F4EC]/40 bg-[#0F2A44]/40 backdrop-blur-xl md:backdrop-blur-2xl px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-[#F8F4EC] transition-all hover:border-[#B08D57]/80 hover:bg-[#0F2A44]/60 hover:text-[#B08D57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57]"
      >
        {/* Technical Corner Crop Ticks */}
        <span
          className="absolute -top-[1px] -left-[1px] h-1.5 w-1.5 border-t border-l border-[#B08D57] transition-colors group-hover:border-[#F8F4EC]"
          aria-hidden="true"
        />
        <span
          className="absolute -top-[1px] -right-[1px] h-1.5 w-1.5 border-t border-r border-[#B08D57] transition-colors group-hover:border-[#F8F4EC]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] h-1.5 w-1.5 border-b border-l border-[#B08D57] transition-colors group-hover:border-[#F8F4EC]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -right-[1px] h-1.5 w-1.5 border-b border-r border-[#B08D57] transition-colors group-hover:border-[#F8F4EC]"
          aria-hidden="true"
        />

        <span>Explore Product Catalog</span>
      </Link>
    </div>
  );
}
