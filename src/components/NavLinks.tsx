"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { openQuoteModal } from "@/components/QuoteModal";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const bouncySpring = {
  type: "spring",
  stiffness: 450,
  damping: 14,
  mass: 0.8,
} as const;

interface NavLinksProps {
  isDarkHero?: boolean;
}

export default function NavLinks({ isDarkHero = false }: NavLinksProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex items-center gap-4 lg:gap-6">
      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-5 lg:gap-7">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <div key={item.href} className="relative inline-flex items-center">
              <Link
                href={item.href}
                className={`relative inline-flex items-center justify-center min-h-[44px] px-2 py-3 text-[14px] lg:text-[15px] font-sans tracking-[0.03em] transition-colors duration-200 ease-in-out ${
                  isDarkHero
                    ? active
                      ? "text-[#F6F2EB] font-semibold"
                      : "text-[#F6F2EB]/80 hover:text-[#A6864C]"
                    : active
                      ? "text-[#3D0E18] font-bold"
                      : "text-[#1C1917] hover:text-[#3D0E18]"
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1.5 left-2 right-2 h-0.5 bg-[#A6864C] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Desktop Get a Quote CTA Button */}
      <div className="hidden md:flex items-center">
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          transition={bouncySpring}
        >
          <Link
            href="/contact"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                openQuoteModal();
              }
            }}
            className={`btn-press inline-flex min-h-[34px] h-[34px] items-center justify-center rounded-md px-3.5 py-1 text-xs font-semibold transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 font-sans ${
              isDarkHero
                ? "bg-[#F6F2EB] hover:bg-[#EDE6DA] text-[#3D0E18] border border-[#A6864C]/30 focus-visible:outline-[#F6F2EB]"
                : "bg-[#3D0E18] hover:bg-[#27080F] text-[#F6F2EB] border border-[#3D0E18] focus-visible:outline-[#3D0E18]"
            }`}
          >
            Get a Quote &rarr;
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden items-center">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 focus:outline-hidden ${
            isDarkHero
              ? "text-[#F6F2EB] hover:text-[#A6864C]"
              : "text-[#1C1917] hover:text-[#3D0E18]"
          }`}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
          className="absolute top-full left-0 right-0 z-50 border-b border-[#A6864C]/25 bg-[#FBF9F5] px-5 py-5 md:hidden text-[#1C1917]"
        >
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#EDE6DA] text-[#3D0E18] font-bold"
                      : "text-[#1C1917] hover:bg-[#EDE6DA]/50 hover:text-[#3D0E18]"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A6864C]" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#A6864C]/20">
            <Link
              href="/contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (pathname === "/") {
                  e.preventDefault();
                  openQuoteModal();
                }
              }}
              className="btn-press flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#3D0E18] hover:bg-[#27080F] px-4 py-2 text-sm font-bold text-[#F6F2EB] transition-colors duration-200 text-center"
            >
              Get a Quote &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
