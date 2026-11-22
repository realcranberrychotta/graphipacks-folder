"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
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
    // Company Name is optional
    if (!cleanEmail) {
      newErrors.email = "Please add your email";
      newShaking.email = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "That email doesn't look right — check for a typo?";
      newShaking.email = true;
    }
    // Phone / WhatsApp is optional

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
      {/* SECTION A: ABOVE-THE-FOLD SPLIT GRID (01 / PRODUCT OVERVIEW)              */}
      {/* ========================================================================= */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ------------------------------------------------------------- */}
          {/* Left Column: Interactive Multi-Image Gallery                  */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Primary Image Frame (4:3) with subtle zoom & lightbox trigger */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#B08D57]/35 bg-white shadow-md shadow-[#0F2A44]/5 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.src}
                  initial={{ opacity: 0.3, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    width={800}
                    height={600}
                    priority
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* View Caption Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#0F2A44]/95 px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#F8F4EC] border border-[#B08D57]/40 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
                  {activeImage.label}
                </span>
              </div>

              {/* Expand Lightbox Button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Enlarge product image"
                className="absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-sm bg-[#0F2A44]/90 text-[#F8F4EC] border border-[#B08D57]/40 hover:bg-[#B08D57] hover:text-[#091B2C] transition-colors duration-200 ease-in-out shadow-sm"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-200 ease-in-out text-left cursor-pointer group ${
                      isActive
                        ? "border-2 border-[#B08D57] shadow-sm"
                        : "border border-[#0F2A44]/15 opacity-75 hover:opacity-100 hover:border-[#B08D57]/60"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={200}
                      height={150}
                      loading="lazy"
                      decoding="async"
                      sizes="150px"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
                      className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-200 ease-in-out ${
                        isActive
                          ? "bg-transparent"
                          : "bg-[#0F2A44]/15 group-hover:bg-transparent"
                      }`}
                    />
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 truncate text-[10px] font-mono font-bold uppercase tracking-wider text-[#F8F4EC] bg-[#0F2A44]/85 px-1.5 py-0.5 rounded-sm">
                      {img.label}
                    </span>
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
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#B08D57]">
                  01 / PRODUCT OVERVIEW • EST. 1984
                </span>
                <span className="h-1 w-1 rounded-full bg-[#B08D57]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#555555]">
                  {product.category}
                </span>
              </div>

              {/* Product Title in Playfair Display */}
              <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F2A44] leading-tight">
                {product.name}
              </h1>

              {/* Tagline / Formal B2B Subtitle */}
              <p className="mt-2 text-sm sm:text-base font-semibold text-[#B08D57] tracking-wide">
                {product.tagline}
              </p>

              {/* Concise Formal Summary */}
              <p className="mt-3 text-sm sm:text-base text-[#222222] leading-relaxed">
                {product.summary}
              </p>

              {/* Commercial Strip (Always Visible: Price on Request + MOQ Badge) */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg border border-[#B08D57]/30 bg-white shadow-xs">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#555555]">
                    Commercial Pricing
                  </span>
                  <span className="mt-0.5 block font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#0F2A44]">
                    Price on Request
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#555555]">
                      Minimum Order
                    </span>
                    <span className="inline-block rounded-sm border border-[#B08D57]/40 bg-[#0F2A44] px-3 py-1 font-mono text-xs font-bold text-[#F8F4EC]">
                      MOQ: {product.moq}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Variant Selector */}
              <div className="mt-7">
                <div className="flex items-center justify-between border-b border-[#B08D57]/20 pb-2">
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0F2A44]">
                    Select Specification Variant:
                  </label>
                  <span className="font-mono text-[11px] text-[#555555]">
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
                            ? "bg-[#0F2A44] text-[#F8F4EC] border-2 border-[#B08D57] shadow-sm"
                            : "bg-white text-[#222222] border border-[#0F2A44]/20 hover:border-[#B08D57] hover:bg-[#EFE8DC]/60"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-xs transition-colors duration-200 ease-in-out ${
                            isSelected ? "bg-[#B08D57]" : "bg-[#0F2A44]/30 group-hover:bg-[#B08D57]"
                          }`}
                        />
                        <span>{v.name}</span>
                        {v.badge && (
                          <span
                            className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                              isSelected
                                ? "bg-[#B08D57] text-[#091B2C]"
                                : "bg-[#EFE8DC] text-[#555555]"
                            }`}
                          >
                            {v.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Configuration Summary Line */}
                <div className="mt-3.5 flex items-start gap-2.5 text-xs text-[#222222] bg-[#F4EFE6] p-3 rounded-lg border border-[#B08D57]/30">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B08D57] shrink-0 mt-0.5">
                    CONFIG:
                  </span>
                  <p className="leading-relaxed">
                    <span className="font-bold text-[#0F2A44]">{activeVariant.name} Formulation — </span>
                    {activeVariant.summary}
                  </p>
                </div>
              </div>

              {/* Three B2B Action Buttons */}
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Primary CTA: Request Quote */}
                  <button
                    type="button"
                    onClick={() => openModal("quote")}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-sm font-bold text-[#091B2C] shadow-xs transition-colors duration-200 ease-in-out cursor-pointer"
                  >
                    <Mail className="h-4 w-4 text-[#091B2C]" />
                    <span>Request Quotation</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>

                  {/* Secondary CTA: Download Spec Sheet (PDF) */}
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isPdfGenerating}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#0F2A44] hover:bg-[#1B3D5E] text-[#F8F4EC] border border-[#B08D57]/40 px-6 py-3.5 text-sm font-bold shadow-xs transition-colors duration-200 ease-in-out cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Download className={`h-4 w-4 text-[#B08D57] ${isPdfGenerating ? "animate-bounce" : ""}`} />
                    <span>
                      {isPdfGenerating ? "Generating Datasheet..." : "Download Spec Sheet (PDF)"}
                    </span>
                  </button>
                </div>

                {/* Tertiary CTA: Request Sample */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => openModal("sample")}
                    className="inline-flex min-h-[44px] items-center gap-2 text-xs sm:text-sm font-bold text-[#0F2A44] hover:text-[#B08D57] transition-colors duration-200 ease-in-out underline underline-offset-4 decoration-[#B08D57]/50 hover:decoration-[#B08D57] cursor-pointer py-1"
                  >
                    <Package className="h-4 w-4 text-[#B08D57]" />
                    <span>Request Material Samples &amp; Swatches</span>
                  </button>
                  <span className="font-mono text-[11px] text-[#555555]">
                    Free sample on request • courier extra
                  </span>
                </div>
              </div>

              {/* Compact Commercial Terms Box */}
              <div className="mt-8 rounded-lg border border-[#B08D57]/30 bg-white p-4 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F2A44] block">
                        Sample Policy
                      </span>
                      <span className="text-[#555555]">{product.commercialTerms.sample}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-t sm:border-t-0 sm:border-l border-[#0F2A44]/10 pt-2 sm:pt-0 sm:pl-3">
                    <CreditCard className="h-4 w-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F2A44] block">
                        Payment Terms
                      </span>
                      <span className="text-[#555555]">{product.commercialTerms.payment}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-t sm:border-t-0 sm:border-l border-[#0F2A44]/10 pt-2 sm:pt-0 sm:pl-3">
                    <Truck className="h-4 w-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F2A44] block">
                        Delivery Basis
                      </span>
                      <span className="text-[#555555]">{product.commercialTerms.delivery}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: FULL TECHNICAL SPECIFICATION TABLE (02 / TECHNICAL SPECS)      */}
      {/* ========================================================================= */}
      <section className="mb-24 scroll-mt-32" id="specifications">
        <div className="border-t border-[#B08D57]/30 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#B08D57] block">
                02 / TECHNICAL SPECIFICATIONS
              </span>
              <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold tracking-tight text-[#0F2A44]">
                Engineering Tolerances &amp; Material Standards
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#555555] max-w-2xl">
                Specifications reflect factory quality standards. Rows marked with an accent border indicate active values configured for variant{" "}
                <span className="font-bold text-[#0F2A44]">{activeVariant.name}</span>.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 self-start md:self-auto rounded-lg border border-[#0F2A44]/20 bg-white hover:bg-[#EFE8DC] px-4 py-2 text-xs font-bold text-[#0F2A44] shadow-xs transition-colors duration-200 ease-in-out cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-[#B08D57]" />
              <span>Export Table as PDF</span>
            </button>
          </div>

          {/* Engineering-Grade Specification Table */}
          <div className="overflow-hidden rounded-xl border border-[#B08D57]/30 bg-white shadow-xs">
            {/* Table Header Bar in Deep Navy */}
            <div className="bg-[#0F2A44] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b-2 border-[#B08D57]">
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F8F4EC]">
                Technical Parameter
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#B08D57] sm:text-[#F8F4EC]">
                Factory Specification / Tolerance
              </span>
            </div>

            {/* Table Rows with Tabular Nums & Variant Highlight Pulse */}
            <div className="divide-y divide-[#B08D57]/15">
              {currentSpecs.map((row, idx) => {
                const isAlt = idx % 2 === 1;
                return (
                  <div
                    key={row.label}
                    className={`grid grid-cols-1 sm:grid-cols-12 px-4 sm:px-6 py-3.5 transition-colors duration-200 ease-in-out ${
                      row.isOverridden
                        ? "bg-[#F7F3EB] border-l-3 border-l-[#B08D57]"
                        : isAlt
                        ? "bg-[#FAF7F2]"
                        : "bg-white"
                    }`}
                  >
                    <div className="sm:col-span-4 flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#0F2A44]">
                        {row.label}
                      </span>
                      {row.isOverridden && (
                        <span className="rounded-sm bg-[#B08D57]/25 border border-[#B08D57]/50 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0F2A44]">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="sm:col-span-8 mt-1 sm:mt-0 flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-[#222222] tabular-nums font-medium leading-relaxed">
                        {row.value}
                      </span>
                      {row.isOverridden && (
                        <span className="hidden sm:inline font-mono text-[10px] text-[#555555]">
                          (Configured for {activeVariant.name})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Footer / Standard Note */}
            <div className="bg-[#F4EFE6] border-t border-[#B08D57]/20 px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#555555]">
              <span className="font-mono text-[11px]">
                Standard: Virgin polymers, ISO quality testing, batch traceability.
              </span>
              <span className="font-mono text-[11px] text-[#B08D57] font-semibold">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#091B2C]/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl border border-[#B08D57]/40 bg-[#0F2A44] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-[#B08D57]/20 bg-[#0F2A44] text-[#F8F4EC]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#B08D57]">
                    GRAPHIPACKS INSPECTION VIEW
                  </span>
                  <span className="text-xs text-[#EFE8DC]/70">• {activeImage.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg p-2 text-[#F8F4EC] hover:bg-[#B08D57] hover:text-[#091B2C] transition-colors duration-200 ease-in-out"
                  aria-label="Close image preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-2 sm:p-4 bg-[#091B2C] flex items-center justify-center max-h-[75vh] overflow-hidden">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={900}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 90vw, 800px"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
                />
              </div>

              <div className="p-4 bg-[#0F2A44] border-t border-[#B08D57]/20 flex items-center justify-between text-xs text-[#EFE8DC]">
                <span>{activeImage.alt}</span>
                <span className="font-mono text-[#B08D57]">
                  View {activeImageIndex + 1} of {product.images.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* RFQ / SAMPLE REQUEST MODAL (STRICTLY B2B)                                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {rfqModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#091B2C]/85 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setRfqModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="relative max-w-lg w-full overflow-hidden rounded-xl border border-[#B08D57]/40 bg-white shadow-2xl text-[#222222]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#0F2A44] p-6 text-[#F8F4EC] border-b-2 border-[#B08D57]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B08D57]">
                    {rfqType === "quote" ? "Direct Commercial RFQ" : "Material Sample Request"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRfqModalOpen(false)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg p-2 text-[#F8F4EC] hover:bg-[#B08D57] hover:text-[#091B2C] transition-colors duration-200 ease-in-out"
                    aria-label="Close request modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#F8F4EC]">
                  {rfqType === "quote"
                    ? `Request Quote: ${product.name}`
                    : `Request Samples: ${product.name}`}
                </h3>
                <p className="mt-1 text-xs text-[#EFE8DC]/80">
                  Active Configuration: <span className="font-bold text-[#B08D57]">{activeVariant.name}</span> (MOQ: {product.moq})
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {rfqSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 border border-emerald-500/40">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-[#0F2A44]">
                      Request received
                    </h4>
                    <p className="text-base font-semibold text-[#B08D57]">
                      Our team will call you within 1 working day.
                    </p>
                    <p className="text-sm text-[#555555] max-w-xs mx-auto leading-relaxed">
                      Our plant commercial desk has received your request for{" "}
                      <span className="font-bold text-[#0F2A44]">
                        {product.name} ({activeVariant.name})
                      </span>
                      . A sales engineer will respond within 24 hours.
                    </p>
                    <div className="pt-4 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setRfqModalOpen(false)}
                        className="w-full sm:w-auto min-h-[48px] rounded-lg bg-[#0F2A44] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#F8F4EC] hover:bg-[#1B3D5E] flex items-center justify-center transition-colors duration-200 ease-in-out cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRfqSubmit} noValidate className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className={rfqShaking.fullName ? "animate-shake" : ""}>
                        <label htmlFor="rfq-fullName" className="block font-bold text-[#0F2A44] uppercase tracking-wider text-[11px] mb-1">
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
                          className={`w-full min-h-[44px] rounded-lg border px-3.5 py-2.5 text-base sm:text-xs text-[#222222] focus:outline-hidden transition-colors duration-200 ease-in-out ${
                            rfqErrors.fullName
                              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/50 bg-red-50/50"
                              : "border-[#0F2A44]/20 bg-[#F8F4EC]/60 focus:border-[#B08D57]"
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
                        <label htmlFor="rfq-companyName" className="block font-bold text-[#0F2A44] uppercase tracking-wider text-[11px] mb-1">
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
                          className="w-full min-h-[44px] rounded-lg border border-[#0F2A44]/20 bg-[#F8F4EC]/60 px-3.5 py-2.5 text-base sm:text-xs text-[#222222] focus:border-[#B08D57] focus:outline-hidden transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className={rfqShaking.email ? "animate-shake" : ""}>
                        <label htmlFor="rfq-email" className="block font-bold text-[#0F2A44] uppercase tracking-wider text-[11px] mb-1">
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
                          className={`w-full min-h-[44px] rounded-lg border px-3.5 py-2.5 text-base sm:text-xs text-[#222222] focus:outline-hidden transition-colors duration-200 ease-in-out ${
                            rfqErrors.email
                              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/50 bg-red-50/50"
                              : "border-[#0F2A44]/20 bg-[#F8F4EC]/60 focus:border-[#B08D57]"
                          }`}
                        />
                        {rfqErrors.email ? (
                          <p id="rfq-email-error" className="mt-1 text-[11px] font-semibold text-red-600 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                            <span>{rfqErrors.email}</span>
                          </p>
                        ) : (
                          <p className="mt-1 text-[11px] text-[#555555]">
                            We&apos;ll reply within 1 working day.
                          </p>
                        )}
                      </div>
                      <div className={rfqShaking.phone ? "animate-shake" : ""}>
                        <label htmlFor="rfq-phone" className="block font-bold text-[#0F2A44] uppercase tracking-wider text-[11px] mb-1">
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
                          className="w-full min-h-[44px] rounded-lg border border-[#0F2A44]/20 bg-[#F8F4EC]/60 px-3.5 py-2.5 text-base sm:text-xs text-[#222222] focus:border-[#B08D57] focus:outline-hidden transition-colors duration-200 ease-in-out"
                        />
                        <p className="mt-1 text-[11px] text-[#555555]">
                          e.g. 98765 43210, +91 accepted
                        </p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="rfq-volume" className="block font-bold text-[#0F2A44] uppercase tracking-wider text-[11px] mb-1">
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
                        className="w-full min-h-[44px] rounded-lg border border-[#0F2A44]/20 bg-[#F8F4EC]/60 px-3.5 py-2.5 text-base sm:text-xs text-[#222222] focus:border-[#B08D57] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label htmlFor="rfq-notes" className="block font-bold text-[#0F2A44] uppercase tracking-wider text-[11px] mb-1">
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
                        className="w-full min-h-[80px] rounded-lg border border-[#0F2A44]/20 bg-[#F8F4EC]/60 px-3.5 py-2.5 text-base sm:text-xs text-[#222222] focus:border-[#B08D57] focus:outline-hidden resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
                      <Link
                        href={`/contact?intent=${rfqType}&product=${encodeURIComponent(
                          product.slug
                        )}&variant=${encodeURIComponent(activeVariant.key)}`}
                        className="inline-flex min-h-[44px] items-center text-xs font-semibold text-[#555555] hover:text-[#0F2A44] underline"
                      >
                        Open full Contact &amp; HQ desk &rarr;
                      </Link>

                      <button
                        type="submit"
                        className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-sm sm:text-base font-bold text-[#091B2C] shadow-md shadow-[#B08D57]/20 transition-all duration-200 ease-in-out cursor-pointer"
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
