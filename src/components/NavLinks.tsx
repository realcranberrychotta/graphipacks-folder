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

export default function NavLinks() {
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
      {/* Desktop Navigation Links (14-15px, regular weight, letter-spacing, active underline only) */}
      <nav className="hidden md:flex items-center gap-5 lg:gap-7">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <div key={item.href} className="relative inline-block py-1">
              <Link
                href={item.href}
                className={`relative block text-[14px] lg:text-[15px] font-normal font-sans tracking-[0.03em] transition-colors duration-200 ease-in-out ${
                  active
                    ? "text-[#F8F4EC]"
                    : "text-[#EFE8DC]/75 hover:text-[#B08D57]"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B08D57] to-[#F8F4EC] rounded-full shadow-xs shadow-[#B08D57]/40"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Desktop Get a Quote CTA Button (Slimmer, smaller padding, same bronze #B08D57, same text) */}
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
            className="inline-flex min-h-[34px] h-[34px] items-center justify-center rounded-md bg-[#B08D57] hover:bg-[#9A7843] px-3.5 py-1 text-xs font-semibold text-[#091B2C] shadow-sm transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57] font-sans"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden items-center">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md p-2 text-[#EFE8DC] hover:text-[#B08D57] focus:outline-hidden"
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
          className="absolute top-full left-0 right-0 z-50 border-b border-[#B08D57]/20 bg-[#0F2A44]/98 backdrop-blur-2xl px-5 py-5 shadow-2xl md:hidden"
        >
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] px-3.5 py-2.5 rounded-lg text-sm font-normal tracking-wide transition-colors duration-200 ease-in-out flex items-center justify-between ${
                    active
                      ? "text-[#F8F4EC] font-semibold bg-[#1B3D5E]/40"
                      : "text-[#EFE8DC]/80 hover:text-[#B08D57] hover:bg-[#091B2C]/40"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
                  )}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[#B08D57]/20 mt-2">
              <Link
                href="/contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (pathname === "/") {
                    e.preventDefault();
                    openQuoteModal();
                  }
                }}
                className="w-full min-h-[44px] flex items-center justify-center rounded-md bg-[#B08D57] hover:bg-[#9A7843] px-4 py-2.5 text-center text-xs font-semibold text-[#091B2C] shadow-sm transition-all duration-200 ease-in-out"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </div>
  );
}
