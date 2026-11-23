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
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#F6F2EB]/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#A6864C] shrink-0" aria-hidden="true" />
          <span className="text-[#A6864C] font-semibold">EST. 1984 · MADURAI PLANT</span>
          <span className="text-[#F6F2EB]/40" aria-hidden="true">&bull;</span>
          <span className="text-[#F6F2EB]/90">{company.name}</span>
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
          className="my-8 h-px w-full max-w-xl bg-gradient-to-r from-[#A6864C]/80 via-[#F6F2EB]/40 to-transparent"
          aria-hidden="true"
        />

        {/* Factual Editorial Statement */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-base sm:text-lg lg:text-xl font-light leading-relaxed text-[#F6F2EB]/90"
        >
          {company.about}
        </motion.p>

        {/* Minimalist Core Specializations Strip */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-[#F6F2EB]/90"
        >
          {company.specializations.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#A6864C]" aria-hidden="true">&bull;</span>
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
            className="btn-press group relative inline-flex items-center justify-center rounded-none bg-[#F6F2EB] hover:bg-[#EDE6DA] px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#3D0E18] border border-[#A6864C]/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F2EB]"
          >
            <span>Get a Quote</span>
            <ArrowRight
              className="ml-3 h-4 w-4 text-[#3D0E18] transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <Link
            href="/products"
            className="btn-press group inline-flex items-center justify-center rounded-none border border-[#A6864C] bg-[#3D0E18]/60 hover:bg-[#A6864C]/20 px-8 py-4 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#F6F2EB] transition-all hover:text-[#A6864C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6864C]"
          >
            <span>View Products</span>
          </Link>
        </motion.div>

        {/* Minimalist Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-20 flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-[#F6F2EB]/60 uppercase"
        >
          <span
            className="inline-block h-3.5 w-px bg-[#A6864C]/60"
            aria-hidden="true"
          />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
