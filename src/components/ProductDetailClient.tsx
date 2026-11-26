"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Download,
  Mail,
  X,
  Maximize2,
  Truck,
  ShieldCheck,
  CreditCard,
  Package,
} from "lucide-react";
import type { ProductDetailData, ProductVariant } from "@/data/products";
import { generateProductPdf } from "@/lib/generateProductPdf";
import ContactForm from "@/components/ContactForm";
import SpecComparisonSheet from "@/components/ui/spec-comparison-sheet";
import { SpecTextWithTooltips } from "@/components/ui/spec-tooltip";

interface ProductDetailClientProps {
  product: ProductDetailData;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedVariantKey, setSelectedVariantKey] = useState<string>(
    product.variants[0]?.key || ""
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // RFQ Modal State
  const [rfqModalOpen, setRfqModalOpen] = useState<boolean>(false);

  const activeVariant: ProductVariant =
    product.variants.find((v) => v.key === selectedVariantKey) ||
    product.variants[0];

  const handleDownloadPdf = () => {
    setIsPdfGenerating(true);
    try {
      generateProductPdf(product, activeVariant);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setTimeout(() => setIsPdfGenerating(false), 800);
    }
  };

  const openModal = () => {
    setRfqModalOpen(true);
  };

  // Compute merged specifications for the active variant
  const currentSpecs = product.baseSpecs.map((spec) => {
    const isOverridden = Object.prototype.hasOwnProperty.call(
      activeVariant.overrides,
      spec.label
    );
    const value = isOverridden
      ? activeVariant.overrides[spec.label]
      : spec.value;
    return {
      label: spec.label,
      value,
      isOverridden,
    };
  });

  const activeImage = product.images[activeImageIndex] || product.images[0];

  return (
    <>
      {/* ========================================================================= */}
      {/* SECTION A: PRODUCT HERO (IMAGE GALLERY & SPEC SELECTOR)                   */}
      {/* ========================================================================= */}
      <section className="mb-20" aria-labelledby="product-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ------------------------------------------------------------- */}
          {/* Left Column: Interactive Image Gallery with Inspection Modal  */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Photographic Exhibit Mat */}
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-ink/10 bg-background">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.src}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    priority={activeImageIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Provenance Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-surface px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-steel border border-powder/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-red" />
                  <span>{activeImage.label}</span>
                </span>
              </div>

              {/* Lightbox Trigger */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-powder/40 bg-background/90 p-2.5 text-ink hover:bg-navy hover:text-background transition-colors duration-200 cursor-pointer"
                aria-label="Inspect high-resolution image"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div
                className={`grid gap-3 ${
                  product.images.length === 2
                    ? "grid-cols-2"
                    : product.images.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-4"
                }`}
              >
                {product.images.map((img, idx) => {
                const isSelected = idx === activeImageIndex;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/3] w-full overflow-hidden rounded-md border transition-colors duration-200 cursor-pointer ${isSelected
                      ? "border-steel ring-2 ring-steel/20"
                      : "border-ink/10 hover:border-steel"
                      }`}
                    aria-label={`View ${img.label}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                      className="object-cover"
                    />
                  </button>
                );
              })}
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Right Column: Commercial Summary & Interactive Variant Selector*/}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-7">
            <div>
              {/* Eyebrow Label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel">
                  01 / PRODUCT OVERVIEW &bull; <span className="text-red">EST. 1984</span>
                </span>
                <span className="h-1 w-1 rounded-full bg-red" />
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-ink/75">
                  {product.category}
                </span>
              </div>

              {/* Product Title in Boska */}
              <h1 id="product-title" className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.015em] text-ink">
                {product.name}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="mt-2 text-sm sm:text-base font-semibold text-steel tracking-wide font-sans">
                {product.tagline}
              </p>

              {/* Concise Formal Summary */}
              <p className="mt-4 max-w-[62ch] text-base md:text-[17px] leading-relaxed text-[#1D3557]/85 font-sans">
                {product.summary}
              </p>

              {/* Commercial Strip: Price on Request + MOQ Badge */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-powder/40 bg-surface">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink/75">
                    Commercial Pricing
                  </span>
                  <span className="mt-0.5 block font-display text-xl sm:text-2xl font-bold text-ink">
                    Price on Request
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink/75">
                      Minimum Order
                    </span>
                    <span className="inline-block rounded-sm bg-navy px-3 py-1 font-mono text-xs font-bold text-background">
                      MOQ: {product.moq}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Variant Selector */}
              <div className="mt-7">
                <div className="flex items-center justify-between border-b border-powder/30 pb-2">
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-ink">
                    Select Specification Variant:
                  </label>
                  <span className="font-mono text-[11px] text-ink/75">
                    {product.variants.length} factory configurations
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = v.key === selectedVariantKey;
                    return (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => setSelectedVariantKey(v.key)}
                        className={`btn-press group relative inline-flex min-h-[44px] items-center gap-2.5 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 ease-in-out cursor-pointer ${isSelected
                          ? "bg-navy text-background border-2 border-steel"
                          : "bg-surface text-ink border border-ink/10 hover:border-steel hover:text-steel"
                          }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-xs transition-colors duration-200 ease-in-out ${isSelected ? "bg-red" : "bg-ink/30 group-hover:bg-steel"
                            }`}
                        />
                        <span>{v.name}</span>
                        {v.badge && (
                          <span
                            className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${isSelected
                              ? "bg-navy text-powder"
                              : "bg-background text-ink/75"
                              }`}
                          >
                            {v.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Configuration Summary Box */}
                <div className="mt-3.5 flex items-start gap-2.5 text-xs text-ink bg-surface p-3.5 rounded-xl border border-powder/40">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-steel shrink-0 mt-0.5">
                    CONFIG:
                  </span>
                  <p className="leading-relaxed">
                    <span className="font-bold text-ink">{activeVariant.name} Formulation — </span>
                    {activeVariant.summary}
                  </p>
                </div>
              </div>

              {/* Three B2B Action Buttons */}
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Primary CTA: Request Quote (Imperial Red Fill) */}
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-press group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-[#E63946] bg-[#E63946] hover:bg-[#1D3557] hover:border-[#1D3557] active:bg-[#1D3557] active:border-[#1D3557] active:scale-[0.97] px-6 py-3.5 text-sm font-bold text-[#F1FAEE] hover:text-[#F1FAEE] active:text-[#F1FAEE] transition-[background-color,color,border-color,transform] duration-150 ease-out cursor-pointer"
                  >
                    <Mail className="h-4 w-4 text-[#F1FAEE]" />
                    <span>Request Quotation</span>
                    <span className="inline-block transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-active:translate-x-0.5" aria-hidden="true">&rarr;</span>
                  </button>

                  {/* Secondary CTA: Download Spec Sheet (PDF) */}
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isPdfGenerating}
                    className="btn-press inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-steel bg-transparent hover:bg-powder/20 hover:border-navy hover:text-navy text-ink px-6 py-3.5 text-sm font-bold transition-colors duration-200 ease-in-out cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Download className={`h-4 w-4 ${isPdfGenerating && !shouldReduceMotion ? "animate-bounce text-steel" : ""}`} />
                    <span>
                      {isPdfGenerating ? "Generating Datasheet..." : "Download Spec Sheet (PDF)"}
                    </span>
                  </button>
                </div>

                {/* Tertiary CTA: Request Sample */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-press inline-flex min-h-[44px] items-center gap-2 rounded-md border border-steel bg-transparent hover:bg-steel text-ink hover:text-background px-4 py-2 text-xs sm:text-sm font-bold transition-colors duration-200 ease-in-out cursor-pointer group"
                  >
                    <Package className="h-4 w-4 text-steel group-hover:text-background" />
                    <span>Request Material Samples &amp; Swatches</span>
                  </button>
                  <span className="font-mono text-[11px] text-ink/75">
                    Free sample on request • courier extra
                  </span>
                </div>
              </div>

              {/* Compact Commercial Terms Box */}
              <div className="mt-8 rounded-xl border border-powder/40 bg-surface p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-steel shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink block">
                        Sample Policy
                      </span>
                      <span className="text-ink/75">{product.commercialTerms.sample}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-t sm:border-t-0 sm:border-l border-ink/10 pt-2 sm:pt-0 sm:pl-3">
                    <CreditCard className="h-4 w-4 text-steel shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink block">
                        Payment Terms
                      </span>
                      <span className="text-ink/75">{product.commercialTerms.payment}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-t sm:border-t-0 sm:border-l border-ink/10 pt-2 sm:pt-0 sm:pl-3">
                    <Truck className="h-4 w-4 text-steel shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink block">
                        Delivery Basis
                      </span>
                      <span className="text-ink/75">{product.commercialTerms.delivery}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: FULL TECHNICAL SPECIFICATION TABLE                             */}
      {/* ========================================================================= */}
      <section className="mb-24 scroll-mt-32" id="specifications">
        <div className="border-t border-powder/40 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
                02 / TECHNICAL SPECIFICATIONS
              </span>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-[-0.015em] text-ink">
                Engineering Tolerances &amp; Material Standards
              </h2>
              <p className="mt-3 max-w-[62ch] text-base md:text-[17px] leading-relaxed text-[#1D3557]/85">
                Specifications reflect factory quality standards. Rows marked with an accent border indicate active values configured for variant{" "}
                <span className="font-bold text-ink">{activeVariant.name}</span>.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 self-start md:self-auto rounded-lg border border-ink/20 bg-background hover:bg-surface px-4 py-2 text-xs font-bold text-ink transition-colors duration-200 ease-in-out cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-steel" />
              <span>Export Table as PDF</span>
            </button>
          </div>

          {/* Specification Table */}
          <div className="overflow-hidden rounded-xl border border-powder/40 bg-background">
            {/* Table Header Bar in Dark Navy */}
            <div className="bg-navy px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b-2 border-steel">
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-background">
                Technical Parameter
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-powder sm:text-background">
                Factory Specification / Tolerance
              </span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-ink/10">
              {currentSpecs.map((row, idx) => {
                const isAlt = idx % 2 === 1;
                return (
                  <div
                    key={row.label}
                    className={`grid grid-cols-1 sm:grid-cols-12 px-4 sm:px-6 py-4 transition-colors duration-200 ease-in-out ${row.isOverridden
                      ? "bg-surface border-l-4 border-l-steel"
                      : isAlt
                        ? "bg-background"
                        : "bg-background"
                      }`}
                  >
                    <div className="sm:col-span-4 flex items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm font-bold text-ink">
                        <SpecTextWithTooltips text={row.label} />
                      </span>
                      {row.isOverridden && (
                        <span className="rounded-sm bg-steel px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-background">
                          Active Variant
                        </span>
                      )}
                    </div>
                    <div className="sm:col-span-8 mt-1 sm:mt-0 flex items-center justify-between">
                      <span className={`font-mono font-normal text-xs sm:text-sm tabular-nums leading-relaxed ${row.isOverridden ? "text-steel font-medium" : "text-ink"
                        }`}>
                        <SpecTextWithTooltips text={row.value} />
                      </span>
                      {row.isOverridden && (
                        <span className="hidden sm:inline font-mono text-[10px] text-ink/75">
                          (Configured for {activeVariant.name})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Footer */}
            <div className="bg-surface border-t border-powder/30 px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-ink/75">
              <span className="font-mono text-[11px]">
                Standard: Virgin polymers, ISO quality testing, batch traceability.
              </span>
              <span className="font-mono text-[11px] text-steel font-semibold">
                Custom gauges and flexo/rotogravure printing available on request.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B.2: SIDE-BY-SIDE VARIANT SPECIFICATION COMPARISON SHEET          */}
      {/* ========================================================================= */}
      <SpecComparisonSheet
        product={product}
        activeVariantKey={selectedVariantKey}
        onSelectVariant={(key) => setSelectedVariantKey(key)}
        onOpenQuoteModal={(variantName) => {
          if (variantName) {
            const match = product.variants.find(
              (v) => v.name === variantName || v.key === variantName
            );
            if (match) setSelectedVariantKey(match.key);
          }
          setRfqModalOpen(true);
        }}
      />

      {/* ========================================================================= */}
      {/* IMAGE LIGHTBOX MODAL                                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-powder/40 bg-background"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-powder/30 bg-surface text-ink">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-steel">
                    GRAPHIPACKSS INSPECTION VIEW
                  </span>
                  <span className="text-xs text-ink/75">• {activeImage.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg p-2 text-ink hover:bg-navy hover:text-background transition-colors duration-200 ease-in-out cursor-pointer"
                  aria-label="Close image preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-2 sm:p-4 bg-background flex items-center justify-center max-h-[75vh] overflow-hidden">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={900}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 90vw, 800px"
                  className="max-h-[70vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="p-4 bg-surface border-t border-powder/30 flex items-center justify-between text-xs text-ink/75">
                <span>{activeImage.alt}</span>
                <span className="font-mono text-steel font-semibold">
                  View {activeImageIndex + 1} of {product.images.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* RFQ / SAMPLE REQUEST MODAL                                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {rfqModalOpen && (
          <div
            id="rfq-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-ink/80"
            onClick={() => setRfqModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Request a Quote for ${product.name}`}
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-background border border-powder/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setRfqModalOpen(false)}
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink hover:bg-navy hover:text-background transition-colors duration-200 cursor-pointer"
                aria-label="Close request modal"
              >
                <X className="h-5 w-5" />
              </button>

              <ContactForm
                initialProduct={product.name}
                initialVariant={activeVariant.name}
                isModal
                onClose={() => setRfqModalOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM BAR: 1-TAP MOQ + GET A QUOTE                         */}
      {/* ========================================================================= */}
      {!rfqModalOpen && !lightboxOpen && (
        <div
          className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-powder bg-background/95 px-4 py-2.5 shadow-[0_-4px_20px_rgba(29,53,87,0.1)]"
          role="region"
          aria-label="Quick quote bar"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="block truncate font-mono text-[10px] font-bold uppercase tracking-wider text-steel">
                {activeVariant.name}
              </span>
              <span className="block font-mono text-xs font-bold text-navy">
                MOQ: {product.moq}
              </span>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="btn-press group shrink-0 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-[#E63946] bg-[#E63946] hover:bg-[#1D3557] hover:border-[#1D3557] active:bg-[#1D3557] active:border-[#1D3557] active:scale-[0.97] px-4 py-2.5 text-xs font-bold text-[#F1FAEE] hover:text-[#F1FAEE] active:text-[#F1FAEE] transition-[background-color,color,border-color,transform] duration-150 ease-out cursor-pointer shadow-xs"
            >
              <span>Get a Quote</span>
              <span className="inline-block transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-active:translate-x-0.5" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
