"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLinks from "@/components/NavLinks";

export default function Header() {
  const pathname = usePathname();

  // The full-screen infrastructure tour uses its own dedicated top-left exit button and header
  if (pathname === "/infrastructure" || pathname?.startsWith("/infrastructure/")) {
    return null;
  }

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center justify-between w-full px-4 sm:px-6 py-3 sm:py-4 fixed top-0 left-0 right-0 z-50 border-b-0 md:border-b md:border-[#B08D57]/25 border-t-0 md:border-t md:border-[#B08D57]/20 bg-[#0F2A44] md:bg-[#0F2A44]/90 md:backdrop-blur-md text-[#F8F4EC] shadow-none md:shadow-lg md:shadow-[#091B2C]/40 min-h-[80px] md:min-h-0">
      {/* Left column: Subtle heritage badge */}
      <div className="flex justify-start items-center">
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57] animate-pulse" />
          <span>EST. 1984 • FLEXIBLE PACKAGING</span>
        </div>
      </div>

      {/* Center column: Refined, compact architectural logo block */}
      <div className="flex justify-center text-center">
        <Link href="/" className="group inline-flex flex-col items-center max-w-[240px] sm:max-w-none">
          <h1 className="font-[family-name:var(--font-display)] text-lg sm:text-xl lg:text-2xl font-bold tracking-wide text-[#F8F4EC] group-hover:text-[#B08D57] uppercase leading-tight transition-colors">
            GRAPHIPACKS
            <br />
            <span className="font-light text-base sm:text-lg lg:text-xl opacity-90">
              PRIVATE LIMITED
            </span>
          </h1>
          <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.2em] text-[#B08D57] uppercase mt-0.5 sm:mt-1 truncate max-w-[220px] sm:max-w-none">
            FLEXIBLE PACKAGING SOLUTION PROVIDERS
          </span>
        </Link>
      </div>

      {/* Right column: Dedicated navigation container */}
      <div className="flex justify-end items-center gap-2 sm:gap-4 lg:gap-6">
        <NavLinks />
      </div>
    </header>
  );
}

