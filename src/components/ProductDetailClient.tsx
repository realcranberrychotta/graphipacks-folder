"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Mail,
  CheckCircle2,
  AlertCircle,
  X,
  Maximize2,
  Truck,
  ShieldCheck,
  CreditCard,
  Package,
} from "lucide-react";
import type { ProductDetailData, ProductVariant } from "@/data/products";
import { generateProductPdf } from "@/lib/generateProductPdf";

interface ProductDetailClientProps {
  product: ProductDetailData;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariantKey, setSelectedVariantKey] = useState<string>(
    product.variants[0]?.key || ""
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // RFQ Modal State
  const [rfqModalOpen, setRfqModalOpen] = useState<boolean>(false);
  const [rfqType, setRfqType] = useState<"quote" | "sample">("quote");
  const [rfqSubmitted, setRfqSubmitted] = useState<boolean>(false);
  const [rfqErrors, setRfqErrors] = useState<Record<string, string>>({});
  const [rfqShaking, setRfqShaking] = useState<Record<string, boolean>>({});
  const [rfqForm, setRfqForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    estimatedVolume: "",
    specNotes: "",
  });

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

  const openModal = (type: "quote" | "sample") => {
    setRfqType(type);
    setRfqErrors({});
    setRfqShaking({});
    setRfqSubmitted(false);
    setRfqModalOpen(true);
  };

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanFullName = rfqForm.fullName.trim();
    const cleanEmail = rfqForm.email.trim().toLowerCase();
    const cleanCompany = rfqForm.companyName.trim();
    const cleanPhone = rfqForm.phone.trim();

    const newErrors: Record<string, string> = {};
    const newShaking: Record<string, boolean> = {};

    if (!cleanFullName) {
      newErrors.fullName = "Please add your name";
      newShaking.fullName = true;
    }
    if (!cleanEmail) {
      newErrors.email = "Please add your email";
      newShaking.email = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "That email doesn't look right — check for a typo?";
      newShaking.email = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setRfqErrors(newErrors);
      setRfqShaking(newShaking);

      setTimeout(() => {
        setRfqShaking({});
      }, 350);

      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`rfq-${firstKey}`);
      if (el) {
        el.focus();
      }
      return;
    }

    setRfqErrors({});
    setRfqShaking({});
    setRfqForm((prev) => ({
      ...prev,
      fullName: cleanFullName,
      email: cleanEmail,
      companyName: cleanCompany,
      phone: cleanPhone,
    }));
    setRfqSubmitted(true);
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
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#1C1917]/[0.08] bg-[#FBF9F5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
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
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#EDE6DA] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#A6864C] border border-[#A6864C]/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A6864C]" />
                  <span>{activeImage.label}</span>
                </span>
              </div>

              {/* Lightbox Trigger */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#A6864C]/40 bg-[#FBF9F5]/90 p-2.5 text-[#1C1917] hover:bg-[#3D0E18] hover:text-[#F6F2EB] transition-colors duration-200 cursor-pointer"
                aria-label="Inspect high-resolution image"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => {
                const isSelected = idx === activeImageIndex;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/3] w-full overflow-hidden rounded-md border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-[#A6864C]"
                        : "border-[#1C1917]/[0.08] hover:border-[#A6864C]/60"
                    }`}
                    aria-label={`View ${img.label}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 25vw, 12vw"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Right Column: Commercial Summary & Interactive Variant Selector*/}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-7">
            <div>
              {/* Eyebrow Label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#A6864C]">
                  01 / PRODUCT OVERVIEW &bull; EST. 1984
                </span>
                <span className="h-1 w-1 rounded-full bg-[#A6864C]" />
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#57524E]">
                  {product.category}
                </span>
              </div>

              {/* Product Title in Playfair Display */}
              <h1 id="product-title" className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal leading-[1.08] tracking-[-0.025em] text-[#1C1917]">
                {product.name}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="mt-2 text-sm sm:text-base font-semibold text-[#A6864C] tracking-wide">
                {product.tagline}
              </p>

              {/* Concise Formal Summary */}
              <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#1C1917]">
                {product.summary}
              </p>

              {/* Commercial Strip: Price on Request + MOQ Badge */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-[#A6864C]/30 bg-[#EDE6DA]">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#57524E]">
                    Commercial Pricing
                  </span>
                  <span className="mt-0.5 block font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                    Price on Request
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#57524E]">
                      Minimum Order
                    </span>
                    <span className="inline-block rounded-sm bg-[#3D0E18] px-3 py-1 font-mono text-xs font-bold text-[#F6F2EB]">
                      MOQ: {product.moq}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Variant Selector */}
              <div className="mt-7">
                <div className="flex items-center justify-between border-b border-[#A6864C]/25 pb-2">
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                    Select Specification Variant:
                  </label>
                  <span className="font-mono text-[11px] text-[#57524E]">
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
                        className={`group relative inline-flex min-h-[44px] items-center gap-2.5 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 ease-in-out cursor-pointer ${
                          isSelected
                            ? "bg-[#3D0E18] text-[#F6F2EB] border-2 border-[#A6864C]"
                            : "bg-[#EDE6DA] text-[#1C1917] border border-[#1C1917]/10 hover:border-[#A6864C]"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-xs transition-colors duration-200 ease-in-out ${
                            isSelected ? "bg-[#A6864C]" : "bg-[#1C1917]/30 group-hover:bg-[#A6864C]"
                          }`}
                        />
                        <span>{v.name}</span>
                        {v.badge && (
                          <span
                            className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                              isSelected
                                ? "bg-[#27080F] text-[#A6864C]"
                                : "bg-[#FBF9F5] text-[#57524E]"
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
                <div className="mt-3.5 flex items-start gap-2.5 text-xs text-[#1C1917] bg-[#EDE6DA] p-3.5 rounded-xl border border-[#A6864C]/30">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A6864C] shrink-0 mt-0.5">
                    CONFIG:
                  </span>
                  <p className="leading-relaxed">
                    <span className="font-bold text-[#1C1917]">{activeVariant.name} Formulation — </span>
                    {activeVariant.summary}
                  </p>
                </div>
              </div>

              {/* Three B2B Action Buttons */}
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Primary CTA: Request Quote (Imperial Oxblood Fill) */}
                  <button
                    type="button"
                    onClick={() => openModal("quote")}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#3D0E18] hover:bg-[#27080F] px-6 py-3.5 text-sm font-bold text-[#F6F2EB] transition-colors duration-200 ease-in-out cursor-pointer"
                  >
                    <Mail className="h-4 w-4 text-[#F6F2EB]" />
                    <span>Request Quotation</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>

                  {/* Secondary CTA: Download Spec Sheet (PDF) (Outlined in Deep Espresso Ink) */}
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isPdfGenerating}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border-2 border-[#1C1917] bg-transparent hover:bg-[#1C1917] text-[#1C1917] hover:text-[#F6F2EB] px-6 py-3.5 text-sm font-bold transition-colors duration-200 ease-in-out cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Download className={`h-4 w-4 ${isPdfGenerating ? "animate-bounce text-[#A6864C]" : ""}`} />
                    <span>
                      {isPdfGenerating ? "Generating Datasheet..." : "Download Spec Sheet (PDF)"}
                    </span>
                  </button>
                </div>

                {/* Tertiary CTA: Request Sample (Bordered in Antique Brass) */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => openModal("sample")}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#A6864C] bg-transparent hover:bg-[#A6864C] text-[#1C1917] hover:text-[#F6F2EB] px-4 py-2 text-xs sm:text-sm font-bold transition-colors duration-200 ease-in-out cursor-pointer"
                  >
                    <Package className="h-4 w-4 text-[#A6864C] group-hover:text-[#F6F2EB]" />
                    <span>Request Material Samples &amp; Swatches</span>
                  </button>
                  <span className="font-mono text-[11px] text-[#57524E]">
                    Free sample on request • courier extra
                  </span>
                </div>
              </div>

              {/* Compact Commercial Terms Box */}
              <div className="mt-8 rounded-xl border border-[#A6864C]/30 bg-[#EDE6DA] p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#A6864C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1C1917] block">
                        Sample Policy
                      </span>
                      <span className="text-[#57524E]">{product.commercialTerms.sample}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-t sm:border-t-0 sm:border-l border-[#1C1917]/10 pt-2 sm:pt-0 sm:pl-3">
                    <CreditCard className="h-4 w-4 text-[#A6864C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1C1917] block">
                        Payment Terms
                      </span>
                      <span className="text-[#57524E]">{product.commercialTerms.payment}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-t sm:border-t-0 sm:border-l border-[#1C1917]/10 pt-2 sm:pt-0 sm:pl-3">
                    <Truck className="h-4 w-4 text-[#A6864C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1C1917] block">
                        Delivery Basis
                      </span>
                      <span className="text-[#57524E]">{product.commercialTerms.delivery}</span>
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
        <div className="border-t border-[#A6864C]/30 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#A6864C] mb-4">
                02 / TECHNICAL SPECIFICATIONS
              </span>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1C1917]">
                Engineering Tolerances &amp; Material Standards
              </h2>
              <p className="mt-3 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#57524E]">
                Specifications reflect factory quality standards. Rows marked with an accent border indicate active values configured for variant{" "}
                <span className="font-bold text-[#1C1917]">{activeVariant.name}</span>.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 self-start md:self-auto rounded-lg border border-[#1C1917]/20 bg-[#FBF9F5] hover:bg-[#EDE6DA] px-4 py-2 text-xs font-bold text-[#1C1917] transition-colors duration-200 ease-in-out cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-[#A6864C]" />
              <span>Export Table as PDF</span>
            </button>
          </div>

          {/* Specification Table */}
          <div className="overflow-hidden rounded-xl border border-[#A6864C]/35 bg-[#FBF9F5]">
            {/* Table Header Bar in Imperial Oxblood */}
            <div className="bg-[#3D0E18] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b-2 border-[#A6864C]">
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F6F2EB]">
                Technical Parameter
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#A6864C] sm:text-[#F6F2EB]">
                Factory Specification / Tolerance
              </span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#1C1917]/10">
              {currentSpecs.map((row, idx) => {
                const isAlt = idx % 2 === 1;
                return (
                  <div
                    key={row.label}
                    className={`grid grid-cols-1 sm:grid-cols-12 px-4 sm:px-6 py-4 transition-colors duration-200 ease-in-out ${
                      row.isOverridden
                        ? "bg-[#EDE6DA] border-l-4 border-l-[#A6864C]"
                        : isAlt
                        ? "bg-[#FBF9F5]"
                        : "bg-[#F6F2EB]"
                    }`}
                  >
                    <div className="sm:col-span-4 flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                        {row.label}
                      </span>
                      {row.isOverridden && (
                        <span className="rounded-sm bg-[#3D0E18] px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#F6F2EB]">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="sm:col-span-8 mt-1 sm:mt-0 flex items-center justify-between">
                      <span className={`text-xs sm:text-sm tabular-nums leading-relaxed ${
                        row.isOverridden ? "font-bold text-[#3D0E18]" : "font-medium text-[#1C1917]"
                      }`}>
                        {row.value}
                      </span>
                      {row.isOverridden && (
                        <span className="hidden sm:inline font-mono text-[10px] text-[#57524E]">
                          (Configured for {activeVariant.name})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Footer */}
            <div className="bg-[#EDE6DA] border-t border-[#A6864C]/25 px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#57524E]">
              <span className="font-mono text-[11px]">
                Standard: Virgin polymers, ISO quality testing, batch traceability.
              </span>
              <span className="font-mono text-[11px] text-[#A6864C] font-semibold">
                Custom gauges and flexo/rotogravure printing available on request.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* IMAGE LIGHTBOX MODAL                                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/80 p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-[#A6864C]/40 bg-[#FBF9F5]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-[#A6864C]/25 bg-[#EDE6DA] text-[#1C1917]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#A6864C]">
                    GRAPHIPACKS INSPECTION VIEW
                  </span>
                  <span className="text-xs text-[#57524E]">• {activeImage.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg p-2 text-[#1C1917] hover:bg-[#3D0E18] hover:text-[#F6F2EB] transition-colors duration-200 ease-in-out cursor-pointer"
                  aria-label="Close image preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-2 sm:p-4 bg-[#F6F2EB] flex items-center justify-center max-h-[75vh] overflow-hidden">
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

              <div className="p-4 bg-[#EDE6DA] border-t border-[#A6864C]/25 flex items-center justify-between text-xs text-[#57524E]">
                <span>{activeImage.alt}</span>
                <span className="font-mono text-[#A6864C] font-semibold">
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/80 p-4 sm:p-6"
            onClick={() => setRfqModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="relative max-w-lg w-full overflow-hidden rounded-2xl border border-[#A6864C]/35 bg-[#FBF9F5] text-[#1C1917]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header in Imperial Oxblood */}
              <div className="bg-[#3D0E18] p-6 text-[#F6F2EB] border-b-2 border-[#A6864C]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A6864C]">
                    {rfqType === "quote" ? "Direct Commercial RFQ" : "Material Sample Request"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRfqModalOpen(false)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg p-2 text-[#F6F2EB] hover:bg-[#A6864C] hover:text-[#27080F] transition-colors duration-200 ease-in-out cursor-pointer"
                    aria-label="Close request modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="mt-2 font-serif text-xl font-bold text-[#F6F2EB]">
                  {rfqType === "quote"
                    ? `Request Quote: ${product.name}`
                    : `Request Samples: ${product.name}`}
                </h3>
                <p className="mt-1 text-xs text-[#F6F2EB]/80">
                  Active Configuration: <span className="font-bold text-[#A6864C]">{activeVariant.name}</span> (MOQ: {product.moq})
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {rfqSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EDE6DA] text-[#3D0E18] border border-[#A6864C]">
                      <CheckCircle2 className="h-8 w-8 text-[#3D0E18]" />
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-[#1C1917]">
                      Request received
                    </h4>
                    <p className="text-base font-semibold text-[#A6864C]">
                      Our team will call you within 1 working day.
                    </p>
                    <p className="text-sm text-[#57524E] max-w-xs mx-auto leading-relaxed">
                      Our plant commercial desk has received your request for{" "}
                      <span className="font-bold text-[#1C1917]">
                        {product.name} ({activeVariant.name})
                      </span>
                      . A sales engineer will respond within 24 hours.
                    </p>
                    <div className="pt-4 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setRfqModalOpen(false)}
                        className="w-full sm:w-auto min-h-[48px] rounded-lg bg-[#3D0E18] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#F6F2EB] hover:bg-[#27080F] flex items-center justify-center transition-colors duration-200 ease-in-out cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRfqSubmit} noValidate className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className={rfqShaking.fullName ? "animate-shake" : ""}>
                        <label htmlFor="rfq-fullName" className="block font-bold text-[#1C1917] uppercase tracking-wider text-[11px] mb-1">
                          Full Name *
                        </label>
                        <input
                          id="rfq-fullName"
                          type="text"
                          autoComplete="name"
                          value={rfqForm.fullName}
                          onChange={(e) => {
                            setRfqForm({ ...rfqForm, fullName: e.target.value });
                            if (rfqErrors.fullName) setRfqErrors((prev) => { const n = { ...prev }; delete n.fullName; return n; });
                          }}
                          placeholder="e.g. Ramesh Kumar"
                          aria-invalid={!!rfqErrors.fullName}
                          aria-describedby={rfqErrors.fullName ? "rfq-fullName-error" : undefined}
                          className={`w-full min-h-[44px] rounded-lg border px-3.5 py-2.5 text-base sm:text-xs text-[#1C1917] focus:outline-hidden transition-colors duration-200 ease-in-out ${
                            rfqErrors.fullName
                              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/50 bg-red-50/50"
                              : "border-[#1C1917]/15 bg-[#FFFFFF] focus:border-[#3D0E18]"
                          }`}
                        />
                        {rfqErrors.fullName && (
                          <p id="rfq-fullName-error" className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                            <span>{rfqErrors.fullName}</span>
                          </p>
                        )}
                      </div>
                      <div className={rfqShaking.companyName ? "animate-shake" : ""}>
                        <label htmlFor="rfq-companyName" className="block font-bold text-[#1C1917] uppercase tracking-wider text-[11px] mb-1">
                          Company Name
                        </label>
                        <input
                          id="rfq-companyName"
                          type="text"
                          autoComplete="organization"
                          value={rfqForm.companyName}
                          onChange={(e) => {
                            setRfqForm({ ...rfqForm, companyName: e.target.value });
                            if (rfqErrors.companyName) setRfqErrors((prev) => { const n = { ...prev }; delete n.companyName; return n; });
                          }}
                          placeholder="e.g. Apex Agri Ltd."
                          className="w-full min-h-[44px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-3.5 py-2.5 text-base sm:text-xs text-[#1C1917] focus:border-[#3D0E18] focus:outline-hidden transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className={rfqShaking.email ? "animate-shake" : ""}>
                        <label htmlFor="rfq-email" className="block font-bold text-[#1C1917] uppercase tracking-wider text-[11px] mb-1">
                          Work Email *
                        </label>
                        <input
                          id="rfq-email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          autoCapitalize="none"
                          spellCheck={false}
                          value={rfqForm.email}
                          onChange={(e) => {
                            setRfqForm({ ...rfqForm, email: e.target.value });
                            if (rfqErrors.email) setRfqErrors((prev) => { const n = { ...prev }; delete n.email; return n; });
                          }}
                          placeholder="ramesh@company.com"
                          aria-invalid={!!rfqErrors.email}
                          aria-describedby={rfqErrors.email ? "rfq-email-error" : undefined}
                          className={`w-full min-h-[44px] rounded-lg border px-3.5 py-2.5 text-base sm:text-xs text-[#1C1917] focus:outline-hidden transition-colors duration-200 ease-in-out ${
                            rfqErrors.email
                              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/50 bg-red-50/50"
                              : "border-[#1C1917]/15 bg-[#FFFFFF] focus:border-[#3D0E18]"
                          }`}
                        />
                        {rfqErrors.email ? (
                          <p id="rfq-email-error" className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                            <span>{rfqErrors.email}</span>
                          </p>
                        ) : (
                          <p className="mt-1 text-[11px] text-[#57524E]">
                            We&apos;ll reply within 1 working day.
                          </p>
                        )}
                      </div>
                      <div className={rfqShaking.phone ? "animate-shake" : ""}>
                        <label htmlFor="rfq-phone" className="block font-bold text-[#1C1917] uppercase tracking-wider text-[11px] mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          id="rfq-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={rfqForm.phone}
                          onChange={(e) => {
                            setRfqForm({ ...rfqForm, phone: e.target.value });
                            if (rfqErrors.phone) setRfqErrors((prev) => { const n = { ...prev }; delete n.phone; return n; });
                          }}
                          placeholder="+91 98765 43210"
                          className="w-full min-h-[44px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-3.5 py-2.5 text-base sm:text-xs text-[#1C1917] focus:border-[#3D0E18] focus:outline-hidden transition-colors duration-200 ease-in-out"
                        />
                        <p className="mt-1 text-[11px] text-[#57524E]">
                          e.g. 98765 43210, +91 accepted
                        </p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="rfq-volume" className="block font-bold text-[#1C1917] uppercase tracking-wider text-[11px] mb-1">
                        Target Order Volume / Consumption
                      </label>
                      <input
                        id="rfq-volume"
                        type="text"
                        value={rfqForm.estimatedVolume}
                        onChange={(e) =>
                          setRfqForm({ ...rfqForm, estimatedVolume: e.target.value })
                        }
                        placeholder={`e.g. Initial trial 1,000 kg / monthly 5 MT (MOQ: ${product.moq})`}
                        className="w-full min-h-[44px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-3.5 py-2.5 text-base sm:text-xs text-[#1C1917] focus:border-[#3D0E18] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label htmlFor="rfq-notes" className="block font-bold text-[#1C1917] uppercase tracking-wider text-[11px] mb-1">
                        Specific Dimensions / Printing Notes
                      </label>
                      <textarea
                        id="rfq-notes"
                        rows={3}
                        value={rfqForm.specNotes}
                        onChange={(e) =>
                          setRfqForm({ ...rfqForm, specNotes: e.target.value })
                        }
                        placeholder="Specify custom microns, pouch dimensions, gusset styles, flexo print colors or delivery destination..."
                        className="w-full min-h-[80px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-3.5 py-2.5 text-base sm:text-xs text-[#1C1917] focus:border-[#3D0E18] focus:outline-hidden resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
                      <Link
                        href={`/contact?intent=${rfqType}&product=${encodeURIComponent(
                          product.slug
                        )}&variant=${encodeURIComponent(activeVariant.key)}`}
                        className="inline-flex min-h-[44px] items-center text-xs font-semibold text-[#57524E] hover:text-[#3D0E18] underline"
                      >
                        Open full Contact &amp; HQ desk &rarr;
                      </Link>

                      <button
                        type="submit"
                        className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#3D0E18] hover:bg-[#27080F] px-6 py-3.5 text-sm sm:text-base font-bold text-[#F6F2EB] transition-colors duration-200 ease-in-out cursor-pointer"
                      >
                        {rfqType === "quote" ? "Submit Quotation Request" : "Submit Sample Request"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
