"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavLinks from "@/components/NavLinks";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full h-[56px] md:h-[72px] text-background"
    >
      {/* Background with Dark Navy depth, fine grain texture & powder blue hairlines */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-b from-[#152740] via-[#1D3557] to-[#152740] origin-top transition-transform duration-300 ease-in-out pointer-events-none ${
          isScrolled ? "md:scale-y-[0.833333]" : "md:scale-y-100"
        }`}
      >
        {/* Tactile micro-grain & woven film texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='headerNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23headerNoise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Top subtle powder blue reflection hairline */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-powder/30 to-transparent" />

        {/* Bottom dual powder blue hairline */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-powder/20" />
        <div className="absolute -bottom-[1px] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-powder/40 to-transparent" />
      </div>

      <div
        className={`relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-3 xs:px-4 sm:px-6 lg:px-8 transition-transform duration-300 ease-in-out ${
          isScrolled ? "md:-translate-y-1.5" : "md:translate-y-0"
        }`}
      >
        {/* Left: Premium Heritage Logo */}
        <div className="relative z-10 flex items-center shrink-0">
          <Link
            href="/"
            className="group flex flex-col justify-center min-h-[44px] py-1 text-left select-none transition-transform duration-200 ease-in-out"
          >
            <span
              className="font-serif font-bold tracking-[0.08em] text-base xs:text-lg sm:text-xl leading-none transition-colors duration-200 ease-in-out text-background group-hover:text-powder"
              style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
            >
              GRAPHIPACKS
            </span>
            <span
              className="font-sans text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.22em] uppercase mt-0.5 sm:mt-1 leading-none text-background/85"
            >
              PRIVATE LIMITED · <span className="text-red font-semibold">EST. 1984</span>
            </span>
          </Link>
        </div>

        {/* Right: Dedicated Navigation Container */}
        <div className="relative z-10 flex items-center">
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
