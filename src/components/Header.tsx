"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLinks from "@/components/NavLinks";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkHero = pathname === "/" && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isDarkHero
          ? "bg-[#3D0E18]/85 backdrop-blur-md border-b border-[#A6864C]/25 text-[#F6F2EB]"
          : "bg-[#F6F2EB]/95 backdrop-blur-md border-b border-[#A6864C]/25 text-[#1C1917]"
      } ${isScrolled ? "h-[56px] md:h-[60px]" : "h-[56px] md:h-[72px]"}`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Premium Heritage Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group flex flex-col justify-center min-h-[44px] py-1 text-left select-none transition-transform duration-200 ease-in-out"
          >
            <span
              className={`font-serif font-bold tracking-[0.08em] text-base xs:text-lg sm:text-xl leading-none transition-colors duration-200 ease-in-out ${
                isDarkHero
                  ? "text-[#F6F2EB] group-hover:text-[#A6864C]"
                  : "text-[#1C1917] group-hover:text-[#3D0E18]"
              }`}
            >
              GRAPHIPACKS
            </span>
            <span
              className={`font-mono text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.22em] uppercase mt-0.5 sm:mt-1 leading-none ${
                isDarkHero ? "text-[#F6F2EB]/70" : "text-[#57524E]"
              }`}
            >
              PRIVATE LIMITED
            </span>
          </Link>
        </div>

        {/* Right: Dedicated Navigation Container */}
        <div className="flex items-center">
          <NavLinks isDarkHero={isDarkHero} />
        </div>
      </div>
    </header>
  );
}
