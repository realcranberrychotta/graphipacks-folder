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
        className="flex flex-col items-start max-w-4xl pointer-events-auto"
      >
        {/* Provenance Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red shrink-0 animate-pulse" aria-hidden="true" />
          <span className="text-steel font-semibold">EST. 1984 · MADURAI PLANT</span>
          <span className="text-ink/40" aria-hidden="true">&bull;</span>
          <span className="text-ink/90">{company.name}</span>
        </motion.div>

        {/* Display Headline */}
        <div className="mt-8 overflow-visible">
          {headline ?? <HeroHeadline />}
        </div>

        {/* WE MAKE: Dynamic Product Typewriter Strip */}
        <motion.div variants={itemVariants} className="mt-6 sm:mt-7">
          <ProductTypewriter
            prefix="WE MAKE:"
            items={DEFAULT_PRODUCTS}
          />
        </motion.div>

        {/* Architectural Hairline Divider */}
        <motion.div
          variants={lineScaleVariants}
          style={{ originX: 0 }}
          className="my-8 h-px w-full max-w-xl bg-gradient-to-r from-steel/80 via-steel/30 to-transparent"
          aria-hidden="true"
        />

        {/* Editorial Value Proposition Headline & Subline */}
        <motion.div variants={itemVariants} className="max-w-xl">
          <h2 className="font-serif font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.25rem] font-bold leading-[1.12] tracking-tight text-ink text-left">
            <span className="block whitespace-nowrap">Find your spec.</span>
            <span className="block whitespace-nowrap mt-1 sm:mt-1.5">Book your call.</span>
            <span className="block whitespace-nowrap mt-1 sm:mt-1.5">Done in 60 seconds.</span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-[15px] lg:text-base font-sans font-light leading-relaxed text-ink/85 text-left max-w-xl lg:whitespace-nowrap">
            <span className="block sm:inline">MOQ, gauge and lead time shown upfront. </span>
            <span className="block sm:inline">No waiting 24 hours for a reply.</span>
          </p>
        </motion.div>

        {/* Minimalist Core Specializations Strip */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-ink/90"
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
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="btn-press group relative inline-flex items-center justify-center rounded-none bg-red hover:bg-[#d62839] px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.18em] text-background border border-red hover:border-[#d62839] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <span>Get a Quote</span>
            <ArrowRight
              className="ml-3 h-4 w-4 text-background transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <Link
            href="/products"
            className="btn-press group inline-flex items-center justify-center rounded-none border border-steel bg-transparent hover:bg-powder/20 hover:border-navy hover:text-navy px-8 py-4 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-ink transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel"
          >
            <span>View Products</span>
          </Link>
        </motion.div>

        {/* Minimalist Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-20 flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-ink/60 uppercase"
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
