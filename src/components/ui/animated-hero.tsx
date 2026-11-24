"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X, CheckCircle2, ChevronRight } from "lucide-react";
import ProductTypewriter from "@/components/ProductTypewriter";
import HeroHeadline from "@/components/HeroHeadline";
import { openQuoteModal } from "@/components/QuoteModal";

export interface ParticleHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
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

export const PRODUCTS_LIST = [
  { id: "mulch-film", name: "Agriculture Mulch Film", moq: "500 kg" },
  { id: "grow-bags", name: "Grow Bags", moq: "5,000 pcs" },
  { id: "coir-pith-bags", name: "Coir Pith 50L & 5kg Block Bags", moq: "10,000 pcs" },
  { id: "laminated-rolls-and-pouches", name: "Laminated Rolls & Pouches", moq: "500 kg film / 10,000 pouches" },
  { id: "pp-and-lldpe-bags", name: "PP & LLDPE Bags", moq: "10,000 pcs" },
  { id: "wicked-poly-bags", name: "Wicked Poly Bags", moq: "25,000 pcs" },
];

export const MOBILE_TYPEWRITER_PRODUCTS = [
  "Agriculture Mulch Film",
  "Grow Bags",
  "Coir Pith 50L & 5kg Block Bags",
  "Laminated Rolls & Pouches",
  "PP & LLDPE Bags",
  "Wicked Poly Bags",
];

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  title = "GRAPHIPACKS",
  subtitle = "Flexible Packaging",
  description = "Find your spec. Book your call. Done in 60 seconds. MOQ, gauge and lead time shown upfront. No waiting 24 hours for a reply.",
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [staticCursor, setStaticCursor] = useState({ x: 0, y: 0 });
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isStaticAnimation, setIsStaticAnimation] = useState(false);
  const startTimeRef = useRef(0);
  const lastMouseMoveRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    lastMouseMoveRef.current = performance.now();
  }, []);

  // 3-Step Mini-Estimator Modal State
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS_LIST[0].id);
  const [quantity, setQuantity] = useState("Standard MOQ Trial Batch");
  const [customQuantity, setCustomQuantity] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  // Continuous subtle animation loop
  useEffect(() => {
    if (!showParticles || shouldReduceMotion) return;

    const animate = () => {
      const currentTime = (performance.now() - startTimeRef.current) * 0.001;

      if (isAutoMode) {
        const x = Math.sin(currentTime * 0.35) * 80 + Math.sin(currentTime * 0.18) * 40;
        const y = Math.cos(currentTime * 0.25) * 60 + Math.cos(currentTime * 0.28) * 30;
        setCursor({ x, y });
      } else if (isStaticAnimation) {
        const timeSinceLastMove = performance.now() - lastMouseMoveRef.current;

        if (timeSinceLastMove > 200) {
          const animationStrength = Math.min((timeSinceLastMove - 200) / 1000, 1);
          const subtleX = Math.sin(currentTime * 1.5) * 12 * animationStrength;
          const subtleY = Math.cos(currentTime * 1.2) * 10 * animationStrength;

          setCursor({
            x: staticCursor.x + subtleX,
            y: staticCursor.y + subtleY,
          });
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoMode, isStaticAnimation, staticCursor, showParticles, shouldReduceMotion]);

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

  // Estimator / Quote Form Submissions
  const handleOpenEstimator = () => {
    if (primaryButton?.onClick) {
      primaryButton.onClick();
      return;
    }
    openQuoteModal();
  };

  const handleEstimatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
              <span className="h-1.5 w-1.5 rounded-full bg-red shrink-0 animate-pulse" aria-hidden="true" />
              <span>EST. 1984 · MADURAI PLANT  •  GRAPHIPACKS PRIVATE LIMITED</span>
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
              <h2 className="font-serif font-[family-name:var(--font-display)] text-lg xs:text-xl sm:text-2xl font-bold leading-snug tracking-tight text-ink">
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
              className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto"
            >
              {/* Primary High-Contrast CTA Button */}
              <button
                type="button"
                onClick={handleOpenEstimator}
                className="btn-press w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-lg bg-red hover:bg-[#d62839] text-background text-sm xs:text-base font-bold transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>{primaryButton?.text || "Get a Quote"}</span>
                <ArrowRight className="h-4 w-4 text-background" />
              </button>

              {/* Secondary Outline Button */}
              {secondaryButton?.href ? (
                <Link
                  href={secondaryButton.href}
                  className="btn-press w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-lg border border-steel hover:border-navy bg-transparent hover:bg-powder/20 text-ink hover:text-navy text-sm xs:text-base font-semibold cursor-pointer inline-flex items-center justify-center transition-colors"
                >
                  {secondaryButton.text}
                </Link>
              ) : (
                <Link
                  href="/products"
                  className="btn-press w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-lg border border-steel hover:border-navy bg-transparent hover:bg-powder/20 text-ink hover:text-navy text-sm xs:text-base font-semibold cursor-pointer inline-flex items-center justify-center transition-colors"
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
                <span className="animate-pulse">{interactiveHint}</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-steel/40" />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* ─── 3-Step Mini-Estimator Modal ─── */}
      {estimatorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D3557]/80 p-4"
          onClick={() => setEstimatorOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#A8DADC] bg-[#F1FAEE] text-[#1D3557]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#A8DADC]/20 p-5 border-b border-[#A8DADC]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#457B9D]">
                  Instant Commercial Estimator &bull; 30 Seconds
                </span>
                <button
                  type="button"
                  onClick={() => setEstimatorOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#1D3557] hover:bg-[#1D3557] hover:text-[#F1FAEE] transition cursor-pointer"
                  aria-label="Close estimator"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h2 className="mt-1 font-serif text-xl font-bold text-[#1D3557]">
                {isSubmitted
                  ? "Inquiry Received"
                  : `Step ${step} of 3: ${
                      step === 1
                        ? "Select Packaging Line"
                        : step === 2
                        ? "Target Quantity Tier"
                        : "Contact Information"
                    }`}
              </h2>

              {!isSubmitted && (
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      step >= 1 ? "bg-[#1D3557]" : "bg-[#A8DADC]/40"
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      step >= 2 ? "bg-[#1D3557]" : "bg-[#A8DADC]/40"
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      step === 3 ? "bg-[#1D3557]" : "bg-[#A8DADC]/40"
                    }`}
                  />
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-5 max-h-[75vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1D3557] text-[#F1FAEE] border border-[#A8DADC]">
                    <CheckCircle2 className="h-9 w-9 text-[#A8DADC]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D3557] font-serif">
                    Request received — our team will call you within 1 working day.
                  </h3>
                  <div className="rounded-xl border border-[#A8DADC] bg-[#A8DADC]/15 p-4 text-left text-xs space-y-2 mt-4">
                    <div>
                      <span className="font-bold text-[#457B9D] block">Selected Product:</span>
                      <span className="text-[#1D3557]">
                        {PRODUCTS_LIST.find((p) => p.id === selectedProductId)?.name}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#457B9D] block">Estimated Volume:</span>
                      <span className="text-[#1D3557]">{customQuantity || quantity}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#457B9D] block">Contact Representative:</span>
                      <span className="text-[#1D3557]">
                        {contactName} ({contactPhone || contactEmail})
                      </span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setEstimatorOpen(false)}
                      className="w-full min-h-[48px] rounded-xl bg-[#1D3557] hover:bg-[#457B9D] text-sm font-bold text-[#F1FAEE] transition-colors flex items-center justify-center cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEstimatorSubmit} className="space-y-4">
                  {/* Step 1: Pick Product */}
                  {step === 1 && (
                    <div className="space-y-2.5">
                      <p className="text-xs text-[#1D3557]/70 mb-3">
                        Select one of our 6 factory-direct polymer packaging lines:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {PRODUCTS_LIST.map((prod) => {
                          const isSelected = prod.id === selectedProductId;
                          return (
                            <button
                              key={prod.id}
                              type="button"
                              onClick={() => setSelectedProductId(prod.id)}
                              className={`w-full min-h-[44px] p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                                isSelected
                                  ? "bg-[#A8DADC]/20 border-[#1D3557]"
                                  : "bg-[#FFFFFF] border-[#A8DADC] hover:border-[#457B9D]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                                    isSelected
                                      ? "bg-[#1D3557]"
                                      : "bg-[#A8DADC]/30 border border-[#A8DADC]"
                                  }`}
                                />
                                <div>
                                  <div className="text-xs font-bold text-[#1D3557]">
                                    {prod.name}
                                  </div>
                                  <div className="text-[10px] text-[#457B9D] font-mono">
                                    MOQ: {prod.moq}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[11px] font-mono text-[#1D3557]/70">
                                {isSelected ? "Selected ✓" : "Select"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full min-h-[48px] rounded-xl bg-[#1D3557] hover:bg-[#457B9D] text-sm font-bold text-[#F1FAEE] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Step 2: Choose Quantity</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Pick Quantity */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-xs text-[#1D3557]/70">
                        Selected:{" "}
                        <span className="font-bold text-[#457B9D]">
                          {PRODUCTS_LIST.find((p) => p.id === selectedProductId)?.name}
                        </span>
                      </p>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#457B9D]">
                          Select Standard Commercial Tier:
                        </label>
                        {[
                          "Trial Batch (Standard MOQ)",
                          "Production Run (2x MOQ)",
                          "Commercial Contract (5x MOQ)",
                          "Annual Supply Contract",
                        ].map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => {
                              setQuantity(tier);
                              setCustomQuantity("");
                            }}
                            className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                              quantity === tier && !customQuantity
                                ? "bg-[#A8DADC]/20 border-[#1D3557] font-bold text-[#1D3557]"
                                : "bg-[#FFFFFF] border-[#A8DADC] text-[#1D3557]/80 hover:border-[#457B9D]"
                            }`}
                          >
                            <span>{tier}</span>
                            {quantity === tier && !customQuantity && (
                              <span className="text-[#1D3557] font-bold">✓</span>
                            )}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#457B9D] mb-1">
                          Or Enter Custom Quantity (kg / pcs / MT):
                        </label>
                        <input
                          type="text"
                          value={customQuantity}
                          onChange={(e) => setCustomQuantity(e.target.value)}
                          placeholder="e.g. 2,500 kg or 50,000 bags"
                          className="w-full min-h-[48px] rounded-lg border border-[#A8DADC] bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1D3557] placeholder:text-[#1D3557]/40 focus:border-[#457B9D] focus:outline-hidden"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="min-h-[48px] px-4 rounded-xl border border-[#A8DADC] bg-[#F1FAEE] text-xs font-semibold text-[#1D3557] hover:bg-[#A8DADC]/20 cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1 min-h-[48px] rounded-xl bg-[#1D3557] hover:bg-[#457B9D] text-sm font-bold text-[#F1FAEE] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Step 3: Contact Info</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Enter Name + Phone/Email */}
                  {step === 3 && (
                    <div className="space-y-3.5">
                      <div className="rounded-lg bg-[#A8DADC]/20 p-3 text-xs border border-[#A8DADC]">
                        <span className="text-[#457B9D] font-bold">Estimating for: </span>
                        <span className="text-[#1D3557]">
                          {PRODUCTS_LIST.find((p) => p.id === selectedProductId)?.name} (
                          {customQuantity || quantity})
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1D3557] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="name"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Rajesh Kannan"
                          className="w-full min-h-[48px] rounded-lg border border-[#A8DADC] bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1D3557] placeholder:text-[#1D3557]/40 focus:border-[#457B9D] focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1D3557] mb-1">
                          Phone Number / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          inputMode="tel"
                          autoComplete="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full min-h-[48px] rounded-lg border border-[#A8DADC] bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1D3557] placeholder:text-[#1D3557]/40 focus:border-[#457B9D] focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1D3557] mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          inputMode="email"
                          autoComplete="email"
                          autoCapitalize="none"
                          spellCheck={false}
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="e.g. rajesh@company.com"
                          className="w-full min-h-[48px] rounded-lg border border-[#A8DADC] bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1D3557] placeholder:text-[#1D3557]/40 focus:border-[#457B9D] focus:outline-hidden"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="min-h-[48px] px-4 rounded-xl border border-[#A8DADC] bg-[#F1FAEE] text-xs font-semibold text-[#1D3557] hover:bg-[#A8DADC]/20 cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 min-h-[48px] rounded-xl bg-[#E63946] hover:bg-[#d62839] text-sm font-bold text-[#F1FAEE] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Get Quote Now &rarr;</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export const AnimatedHero = ParticleHero;
export default ParticleHero;
