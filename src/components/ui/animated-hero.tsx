"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductTypewriter from "@/components/ProductTypewriter";
import HeroHeadline from "@/components/HeroHeadline";
import { openQuoteModal } from "@/components/QuoteModal";

export interface ParticleHeroProps {
  title?: string;
  primaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  interactiveHint?: string;
  className?: string;
  particleCount?: number;
  showParticles?: boolean;
  children?: ReactNode;
}

export const MOBILE_TYPEWRITER_PRODUCTS = [
  "Agriculture Mulch Film",
  "Grow Bags",
  "Coir Pith 50L & 5kg Block Bags",
  "Laminated Rolls & Pouches",
  "PP & LLDPE Bags",
  "Wicketted Poly Bags",
];

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  title = "GRAPHIPACKSS",
  primaryButton,
  secondaryButton,
  interactiveHint,
  className = "",
  particleCount = 8,
  showParticles = true,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const startTimeRef = useRef(0);
  const lastMouseMoveRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    lastMouseMoveRef.current = performance.now();
  }, []);

  const [isSkipped, setIsSkipped] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const rows = particleCount;
  const totalParticles = rows * rows;

  useEffect(() => {
    const handleSkip = () => {
      setIsSkipped(true);
    };
    window.addEventListener("skip-hero-animation", handleSkip);
    return () => window.removeEventListener("skip-hero-animation", handleSkip);
  }, []);

  // Initialize steel blue / honeydew particles
  useEffect(() => {
    if (!showParticles || shouldReduceMotion || isSkipped || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";
    particlesRef.current = [];

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement("div");
      particle.className = "particle absolute rounded-full will-change-transform";

      // Calculate grid position
      const row = Math.floor(i / rows);
      const col = i % rows;
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(rows / 2);

      // Distance from center for stagger effects
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      // Staggered scale & opacity
      const scale = Math.max(0.15, 1.1 - distanceFromCenter * 0.12);
      const opacity = Math.max(0.06, 0.65 - distanceFromCenter * 0.08);

      const glowSize = Math.max(0.4, 3.5 - distanceFromCenter * 0.35);

      particle.style.cssText = `
        width: 0.32rem;
        height: 0.32rem;
        left: ${col * 1.55}rem;
        top: ${row * 1.55}rem;
        transform: scale(${scale});
        opacity: ${opacity};
        background: #457B9D;
        box-shadow: 0 0 ${glowSize * 0.16}rem 0 rgba(69, 123, 157, 0.45);
        mix-blend-mode: screen;
        z-index: ${Math.round(totalParticles - distanceFromCenter * 4)};
        transition: transform 0.06s ease-in-out;
      `;

      container.appendChild(particle);
      particlesRef.current.push(particle);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      particlesRef.current = [];
    };
  }, [rows, totalParticles, showParticles, shouldReduceMotion, isSkipped]);

  // Continuous subtle animation loop (only runs when particle container is actually mounted)
  useEffect(() => {
    if (!showParticles || shouldReduceMotion || !containerRef.current) return;

    const animate = () => {
      const currentTime = (performance.now() - startTimeRef.current) * 0.001;
      const x = Math.sin(currentTime * 0.35) * 80 + Math.sin(currentTime * 0.18) * 40;
      const y = Math.cos(currentTime * 0.25) * 60 + Math.cos(currentTime * 0.28) * 30;
      setCursor({ x, y });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [showParticles, shouldReduceMotion]);

  // Update particle positions with subtle cubic-bezier easing
  useEffect(() => {
    if (!showParticles || shouldReduceMotion) return;

    particlesRef.current.forEach((particle, i) => {
      const row = Math.floor(i / rows);
      const col = i % rows;
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(rows / 2);
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      const delay = distanceFromCenter * 6;
      const originalScale = Math.max(0.15, 1.1 - distanceFromCenter * 0.12);
      const dampening = Math.max(0.25, 0.9 - distanceFromCenter * 0.08);

      const timeoutId = setTimeout(() => {
        const moveX = cursor.x * dampening;
        const moveY = cursor.y * dampening;

        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${originalScale})`;
        particle.style.transition = `transform ${120 + distanceFromCenter * 18}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      }, delay);

      return () => clearTimeout(timeoutId);
    });
  }, [cursor, rows, showParticles, shouldReduceMotion]);

  // Unified Quote Modal trigger
  const handleOpenEstimator = () => {
    if (primaryButton?.onClick) {
      primaryButton.onClick();
      return;
    }
    openQuoteModal();
  };

  // Text Reveal Animation Variants
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion || isSkipped ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion || isSkipped ? 0 : 0.2,
        staggerChildren: shouldReduceMotion || isSkipped ? 0 : 0.12,
        delayChildren: shouldReduceMotion || isSkipped ? 0 : 0.06,
      },
    },
  };

  const textLineVariant = {
    hidden: shouldReduceMotion || isSkipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion || isSkipped ? 0 : 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      className={`relative w-full overflow-hidden bg-transparent text-ink select-none pt-1 sm:pt-6 pb-8 px-4 sm:px-6 ${className}`}
    >
      {/* ─── Main Content Container (Centred, Exact Order) ─── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        {children ? (
          children
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col items-center justify-center text-center"
          >
            {/* 1. Top Small Label: Provenance Indicator */}
            <motion.div
              variants={textLineVariant}
              className="flex items-center justify-center gap-2 font-mono text-[10px] xs:text-xs font-bold uppercase tracking-[0.22em] text-steel mb-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red shrink-0" aria-hidden="true" />
              <span>EST. 1984 · MADURAI PLANT  •  GRAPHIPACKSS PRIVATE LIMITED</span>
            </motion.div>

            {/* 2. Main Headline: Word-by-word reveal */}
            <div className="mt-1 mb-2 flex flex-col items-center justify-center text-center">
              <span className="block font-mono text-xs xs:text-sm sm:text-base font-bold uppercase tracking-[0.28em] text-ink/80 text-center mb-1">
                {title}
              </span>
              <HeroHeadline centered />
            </div>

            {/* 3. Typing Line: "WE MAKE: [Product] |" */}
            <motion.div variants={textLineVariant} className="mt-3 sm:mt-4 w-full flex justify-center px-2">
              <ProductTypewriter
                prefix="WE MAKE:"
                items={MOBILE_TYPEWRITER_PRODUCTS}
                className="mx-auto"
              />
            </motion.div>

            {/* 4. Value Proposition Headline & Subline */}
            <motion.div variants={textLineVariant} className="mt-4 sm:mt-5 max-w-xl mx-auto text-center px-1 sm:px-2">
              <h2 className="font-display text-lg xs:text-xl sm:text-2xl font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                <span className="block whitespace-nowrap">Find your spec.</span>
                <span className="block whitespace-nowrap mt-0.5">Book your call.</span>
                <span className="block whitespace-nowrap mt-0.5">Done in 60 seconds.</span>
              </h2>
              <p className="mt-2 font-sans text-xs xs:text-sm sm:text-base font-light leading-relaxed text-ink/80">
                <span className="block sm:inline">MOQ, gauge and lead time shown upfront. </span>
                <span className="block sm:inline">No waiting 24 hours for a reply.</span>
              </p>
              {/* Core Specializations Bullets */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-ink/90">
                <div className="flex items-center gap-1.5">
                  <span className="text-steel" aria-hidden="true">&bull;</span>
                  <span>Multicolor Flexo &amp; Gravure Photo Printed Bags</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-steel" aria-hidden="true">&bull;</span>
                  <span>PP, LLDPE Poly Bags, Polyester Poly pouches</span>
                </div>
              </div>
            </motion.div>

            {/* 5. Two Buttons: Centred */}
            <motion.div
              variants={textLineVariant}
              className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto"
            >
              {/* Primary High-Contrast CTA Button */}
              <button
                type="button"
                onClick={handleOpenEstimator}
                className="btn-press group w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-md border border-[#E63946] bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557] hover:border-[#1D3557] hover:text-[#F1FAEE] active:bg-[#1D3557] active:border-[#1D3557] active:text-[#F1FAEE] active:scale-[0.97] text-sm xs:text-base font-bold transition-[background-color,color,border-color,transform] duration-150 ease-out cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>{primaryButton?.text || "Get a Quote"}</span>
                <ArrowRight className="h-4 w-4 text-[#F1FAEE] transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-active:translate-x-0.5" />
              </button>

              {/* Secondary Outline Button */}
              {secondaryButton?.href ? (
                <Link
                  href={secondaryButton.href}
                  className="btn-press w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-md border border-[#1D3557] bg-transparent text-[#1D3557] hover:bg-[#1D3557] hover:border-[#1D3557] hover:text-[#F1FAEE] active:bg-[#1D3557] active:border-[#1D3557] active:text-[#F1FAEE] active:scale-[0.97] text-sm xs:text-base font-semibold cursor-pointer inline-flex items-center justify-center transition-[background-color,color,border-color,transform] duration-150 ease-out"
                >
                  {secondaryButton.text}
                </Link>
              ) : (
                <Link
                  href="/products"
                  className="btn-press w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-md border border-[#1D3557] bg-transparent text-[#1D3557] hover:bg-[#1D3557] hover:border-[#1D3557] hover:text-[#F1FAEE] active:bg-[#1D3557] active:border-[#1D3557] active:text-[#F1FAEE] active:scale-[0.97] text-sm xs:text-base font-semibold cursor-pointer inline-flex items-center justify-center transition-[background-color,color,border-color,transform] duration-150 ease-out"
                >
                  {secondaryButton?.text || "View Products"}
                </Link>
              )}
            </motion.div>

            {/* Interactive hint */}
            {interactiveHint && (
              <motion.div
                variants={textLineVariant}
                className="mt-6 flex items-center justify-center gap-4 text-steel/70 text-[10px] uppercase tracking-[0.25em] font-mono"
              >
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-steel/40" />
                <span>{interactiveHint}</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-steel/40" />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export const AnimatedHero = ParticleHero;
export default ParticleHero;
