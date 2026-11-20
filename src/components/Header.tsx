"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLinks from "@/components/NavLinks";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The full-screen infrastructure tour uses its own dedicated top-left exit button and header
  if (pathname === "/infrastructure" || pathname?.startsWith("/infrastructure/")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-[#B08D57]/20 bg-[#0F2A44]/90 backdrop-blur-md text-[#F8F4EC] transition-all duration-300 ease-in-out ${
        isScrolled ? "h-[56px] md:h-[60px]" : "h-[56px] md:h-[72px]"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Premium Minimal Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group flex flex-col justify-center text-left select-none transition-transform"
          >
            <span
              className="font-serif font-bold tracking-[0.08em] text-[#F8F4EC] text-base xs:text-lg sm:text-xl leading-none group-hover:text-[#B08D57] transition-colors"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              GRAPHIPACKS
            </span>
            <span className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.22em] text-[#EFE8DC]/70 uppercase mt-0.5 sm:mt-1 leading-none">
              PRIVATE LIMITED
            </span>
          </Link>
        </div>

        {/* Right: Dedicated Navigation Container */}
        <div className="flex items-center">
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
