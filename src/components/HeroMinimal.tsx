"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CompanyProfile } from "@/lib/content";
import ProductTypewriter, { DEFAULT_PRODUCTS } from "@/components/ProductTypewriter";
import HeroHeadline from "@/components/HeroHeadline";
import { openQuoteModal } from "@/components/QuoteModal";
import { ArrowRight } from "lucide-react";

interface HeroMinimalProps {
  company: CompanyProfile;
  headline?: React.ReactNode;
}

export default function HeroMinimal({ company, headline }: HeroMinimalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isReturnVisit, setIsReturnVisit] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("graphipacks-intro-seen") === "true") {
        queueMicrotask(() => {
          setIsReturnVisit(true);
        });
      }
    } catch { }
  }, []);

  const instant = shouldReduceMotion || isReturnVisit;
  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    hidden: { opacity: instant ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: instant ? 0 : 0.2,
        staggerChildren: instant ? 0 : 0.12,
        delayChildren: instant ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: instant
      ? { opacity: 1, y: 0, filter: "none" }
      : { opacity: 0, y: 24, filter: "none" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "none",
      transition: {
        duration: instant ? 0 : 0.85,
        ease: easeOutExpo,
      },
    },
  };

  const lineScaleVariants = {
    hidden: instant ? { opacity: 1, scaleX: 1 } : { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: instant ? 0 : 1.1,
        ease: easeOutExpo,
      },
    },
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial={instant ? "visible" : "hidden"}
        animate="visible"
        className="flex flex-col items-start max-w-xl pointer-events-auto space-y-4 lg:space-y-5"
      >
        {/* Provenance Indicator */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] tracking-[0.16em] uppercase text-[#457B9D]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E63946] shrink-0" aria-hidden="true" />
          <span>EST. 1984 · MADURAI PLANT · GRAPHIPACKSS</span>
        </motion.div>

        {/* Display Headline */}
        <div className="mt-3 overflow-visible">
          {headline ?? <HeroHeadline />}
        </div>

        {/* WE MAKE: Dynamic Product Typewriter Strip */}
        <motion.div variants={itemVariants}>
          <ProductTypewriter
            prefix="WE MAKE:"
            items={DEFAULT_PRODUCTS}
          />
        </motion.div>

        {/* Architectural Hairline Divider */}
        <motion.div
          variants={lineScaleVariants}
          style={{ originX: 0 }}
          className="h-px w-full max-w-xl bg-gradient-to-r from-steel/80 via-steel/30 to-transparent"
          aria-hidden="true"
        />

        {/* Editorial Value Proposition Headline & Subline */}
        <motion.div variants={itemVariants} className="max-w-md">
          <p className="text-lg lg:text-xl font-medium leading-snug text-[#1D3557] text-left">
            Find your spec. Book your call. Done in 60 seconds.
          </p>
          <p className="mt-1.5 text-sm text-[#1D3557]/80 font-sans text-left">
            MOQ, gauge and lead time shown upfront. No waiting 24 hours for a reply.
          </p>
        </motion.div>

        {/* Minimalist Core Specializations Strip */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] font-mono uppercase tracking-widest text-ink/90"
        >
          {company.specializations.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-steel" aria-hidden="true">&bull;</span>
              <span>{spec}</span>
            </div>
          ))}
        </motion.div>

        {/* Hero CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-5 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="btn-press btn-tactile group relative inline-flex items-center justify-center rounded-md bg-[#E63946] px-7 py-3.5 text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#F1FAEE] border border-[#E63946] hover:bg-[#1D3557] hover:border-[#1D3557] hover:text-[#F1FAEE] active:bg-[#1D3557] active:border-[#1D3557] active:text-[#F1FAEE] active:scale-[0.97] transition-[background-color,color,border-color,transform] duration-150 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            style={{ "--btn-wipe-color": "#1D3557" } as React.CSSProperties}
          >
            <span>Get a Quote</span>
            <ArrowRight
              className="tactile-arrow ml-3 h-4 w-4 text-[#F1FAEE] transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-active:translate-x-0.5"
              aria-hidden="true"
            />
          </button>

          <Link
            href="/products"
            className="btn-press btn-tactile group inline-flex items-center justify-center rounded-md border border-[#1D3557] bg-transparent px-7 py-3.5 text-xs font-mono font-medium uppercase tracking-[0.18em] text-[#1D3557] hover:bg-[#1D3557] hover:text-[#F1FAEE] hover:border-[#1D3557] active:bg-[#1D3557] active:text-[#F1FAEE] active:border-[#1D3557] active:scale-[0.97] transition-[background-color,color,border-color,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel"
            style={{ "--btn-wipe-color": "#1D3557" } as React.CSSProperties}
          >
            <span>View Products</span>
          </Link>
        </motion.div>

        {/* Minimalist Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="pt-2 flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-ink/60 uppercase"
        >
          <span
            className="inline-block h-3.5 w-px bg-steel/60"
            aria-hidden="true"
          />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
