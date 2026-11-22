"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CompanyProfile } from "@/lib/content";
import { products } from "@/lib/content";
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
        setIsReturnVisit(true);
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
      : { opacity: 0, y: 24, filter: "blur(6px)" },
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
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#EFE8DC]/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57] shrink-0" aria-hidden="true" />
          <span>EST. 1984 · MADURAI PLANT</span>
          <span className="text-[#EFE8DC]/40" aria-hidden="true">&bull;</span>
          <span className="text-[#F8F4EC]/75">{company.name}</span>
        </motion.div>

        {/* Photonic Light Sweep & Film Blur Reveal Headline */}
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

        {/* Delicate Animated Horizon Rule */}
        <motion.div
          variants={lineScaleVariants}
          style={{ originX: 0 }}
          className="my-8 h-px w-full max-w-xl bg-gradient-to-r from-[#B08D57]/80 via-[#F8F4EC]/40 to-transparent"
          aria-hidden="true"
        />

        {/* Factual Editorial Statement from content.ts */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-base sm:text-lg lg:text-xl font-light leading-relaxed text-[#F8F4EC]/85"
        >
          {company.about}
        </motion.p>

        {/* Minimalist Core Specializations Strip */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-[#F8F4EC]/90"
        >
          {company.specializations.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#B08D57]/50" aria-hidden="true">&bull;</span>
              <span>{spec}</span>
            </div>
          ))}
        </motion.div>

        {/* Hero CTAs: Dominant solid gold 'Get a Quote' + Outline 'View Products' */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="group relative inline-flex items-center justify-center rounded-none bg-[#B08D57] hover:bg-[#9A7843] px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#091B2C] shadow-lg shadow-[#B08D57]/20 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57]"
          >
            <span>Get a Quote</span>
            <ArrowRight
              className="ml-3 h-4 w-4 text-[#091B2C] transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <Link
            href="/products"
            className="group inline-flex items-center justify-center rounded-none border border-[#B08D57]/45 bg-transparent hover:bg-[#B08D57]/10 hover:border-[#B08D57] px-8 py-4 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#F8F4EC] transition-all hover:text-[#B08D57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57]"
          >
            <span>View Products</span>
          </Link>
        </motion.div>

        {/* Subtle Minimalist Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-20 flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-[#EFE8DC]/60 uppercase"
        >
          <span
            className="inline-block h-3.5 w-px bg-[#EFE8DC]/40"
            aria-hidden="true"
          />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
