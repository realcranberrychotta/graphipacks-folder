"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex items-center gap-4 lg:gap-5">
      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-sm">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <motion.div
              key={item.href}
              whileHover={{ scale: 1.05, y: -1 }}
              transition={bouncySpring}
              className="inline-block"
            >
              <Link
                href={item.href}
                className={`transition-colors py-1 relative block text-sm font-medium font-sans ${
                  active
                    ? "text-[#F8F4EC] font-semibold"
                    : "text-[#EFE8DC]/80 hover:text-[#B08D57]"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B08D57] to-[#F8F4EC] rounded-full shadow-xs shadow-[#B08D57]/50"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Desktop Get a Quote CTA Button with Bouncy Spring Physics */}
      <div className="hidden md:flex items-center">
        <motion.div
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={bouncySpring}
        >
          <Link
            href="/contact"
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-3.5 py-1.5 text-xs lg:text-sm font-bold text-[#091B2C] shadow-md shadow-[#B08D57]/20 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57] font-sans"
          >
            Get a Quote &rarr;
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden items-center">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={bouncySpring}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2.5 text-[#EFE8DC] hover:bg-[#0F2A44]/60 hover:text-[#B08D57] focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-[#B08D57]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
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
              className="h-6 w-6"
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
        </motion.button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className="absolute top-full left-0 right-0 z-50 border-b border-[#B08D57]/25 border-t-[#B08D57]/20 bg-[#0F2A44]/95 backdrop-blur-2xl px-6 py-6 shadow-2xl md:hidden"
        >
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] px-3.5 py-2.5 rounded-lg text-base transition-colors flex items-center justify-between ${
                    active
                      ? "text-[#F8F4EC] font-semibold bg-[#1B3D5E]/40"
                      : "text-[#EFE8DC]/80 hover:text-[#B08D57] hover:bg-[#091B2C]/40 font-medium"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
                  )}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[#B08D57]/20">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={bouncySpring}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[44px] flex items-center justify-center rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-4 py-3 text-center text-sm font-bold text-[#091B2C] shadow-md shadow-[#B08D57]/20 transition"
                >
                  Get a Quote &rarr;
                </Link>
              </motion.div>
            </div>
          </nav>
        </motion.div>
      )}
    </div>
  );
}
