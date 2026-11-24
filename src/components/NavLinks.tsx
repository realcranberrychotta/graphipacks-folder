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
      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-5 lg:gap-7">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <div key={item.href} className="relative inline-flex items-center">
              <Link
                href={item.href}
                className={`relative inline-flex items-center justify-center min-h-[44px] px-2 py-3 text-[14px] lg:text-[15px] font-sans tracking-[0.03em] transition-colors duration-200 ease-in-out ${
                  active
                    ? "text-background font-semibold"
                    : "text-background/85 hover:text-powder"
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1.5 left-2 right-2 h-0.5 bg-powder rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Desktop Get a Quote CTA Button: Imperial Red with bold Honeydew text */}
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
            className="btn-press inline-flex min-h-[36px] h-[36px] items-center justify-center rounded-md px-4 py-1.5 text-xs font-bold transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 font-sans bg-red text-background hover:brightness-110 focus-visible:outline-red shadow-sm cursor-pointer"
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
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 focus:outline-hidden text-background hover:text-powder"
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
          className="absolute top-full left-0 right-0 z-50 border-b border-powder/25 bg-navy px-5 py-5 md:hidden text-background shadow-xl"
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
                      ? "bg-powder/15 text-powder font-bold"
                      : "text-background/90 hover:bg-powder/10 hover:text-powder"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-powder" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-powder/20">
            <Link
              href="/contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (pathname === "/") {
                  e.preventDefault();
                  openQuoteModal();
                }
              }}
              className="btn-press flex min-h-[44px] w-full items-center justify-center rounded-lg bg-red hover:brightness-110 text-background px-4 py-2.5 text-sm font-bold transition-all duration-200 text-center shadow-sm"
            >
              Get a Quote &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
