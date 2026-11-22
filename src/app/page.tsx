"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Graphipacks Private Limited | Flexible Packaging Solutions (Est. 1984)",
  description:
    "Leading manufacturer of high-barrier flexible packaging, agricultural mulch films, UV-treated grow bags, rotogravure printed pouches, and wicketed poly bags in Madurai, India.",
  openGraph: {
    title: "Graphipacks Private Limited | Flexible Packaging Solutions (Est. 1984)",
    description:
      "Leading manufacturer of high-barrier flexible packaging, agricultural mulch films, UV-treated grow bags, rotogravure printed pouches, and wicketed poly bags in Madurai, India.",
  },
};
import {
  company,
  products,
  packagingForms,
  printingTechnology,
  clients,
} from "@/lib/content";
import { PRODUCTS_DATA } from "@/data/products";
import HomeHeroFactory from "@/components/HomeHeroFactory";
import HeroMinimal from "@/components/HeroMinimal";
import HeroHeadline from "@/components/HeroHeadline";
import MobileHero from "@/components/MobileHero";
import HeroSkipControl from "@/components/HeroSkipControl";
import { StaggerCardsGrid, StaggerCard } from "@/components/StaggerCards";
import QuoteModal from "@/components/QuoteModal";
import QuoteTriggerButton from "@/components/QuoteTriggerButton";
import HomeFAQ from "@/components/HomeFAQ";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";

export default async function HomePage() {
  cacheLife("days");

  const productDetailMap = new Map(PRODUCTS_DATA.map((p) => [p.slug, p]));

  return (
    <div className="flex flex-col bg-[#F6F2EB] text-[#1C1917]">
      <noscript>
        <style>{`
          [data-stagger-card] {
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
            transition: none !important;
          }
        `}</style>
      </noscript>
      {/* Hero Section — Rich Imperial Oxblood Royal Opening Statement */}
      <section id="hero" className="relative overflow-hidden bg-hero-atmosphere border-b border-[#C9A160]/30 text-[#F6F2EB]">
        {/* Tactile Archival Grain Layer */}
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />

        {/* Accessible Hero Skip Animation Control */}
        <HeroSkipControl />

        {/* Desktop Hero — Monumental Typography over 3D Manufacturing Line (>= 768px) */}
        <div className="hidden md:block relative z-10 min-h-[720px] w-full">
          {/* 3D Manufacturing Plant Tour */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
            <HomeHeroFactory />
          </div>

          <div className="relative z-10 pointer-events-none pt-36 pb-28 lg:pt-40 lg:pb-32 min-h-[720px] flex items-center">
            <div className="w-full">
              <HeroMinimal
                company={company}
                headline={<HeroHeadline />}
              />
            </div>
          </div>
        </div>

        {/* Mobile Hero — Animated Hero Minimal / Clean Design (< 768px) */}
        <div className="block md:hidden relative z-10 w-full pt-3 pb-8 bg-transparent">
          <MobileHero />
        </div>
      </section>

      {/* From Pellet to Pouch — 4-Stage Manufacturing Sequence (Soft Linen Surface) */}
      <section id="pellet-to-pouch" className="relative overflow-hidden bg-light-atmosphere-alt border-b border-[#C9A160]/25 py-24 md:py-32 text-[#1C1917]">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#C9A160] mb-4">
              01 / MANUFACTURING SEQUENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-[#1C1917]">
              From Pellet to Pouch
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#57524E]">
              Our continuous converting process: taking raw polymer pellets through blown film extrusion, 8-colour rotogravure printing, and final pouch conversion.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 sm:grid-cols-2 md:grid-cols-4">
            {/* Stage 1: Pellets */}
            <StaggerCard index={0}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-[#1C1917]/10 border-t-[#C9A160]/35 bg-[#FCF9F4] hover:border-[#C9A160]/70 transition-colors duration-200 shadow-[0_1px_3px_rgba(28,25,23,0.03)]">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EDE6DA] border-b border-[#1C1917]/[0.08]">
                  <Image
                    src="/images/products/pp-and-lldpe-bags.jpg"
                    alt="Feed hopper and white polymer pellets"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-[#1C1917]/10">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A160]">
                        01
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#57524E]">
                        Raw Material
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-[#1C1917]">
                      Pellets
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#57524E] leading-relaxed">
                      Feed hopper loaded with white polymer pellets for extrusion.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 2: Blown Film */}
            <StaggerCard index={1}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-[#1C1917]/10 border-t-[#C9A160]/35 bg-[#FCF9F4] hover:border-[#C9A160]/70 transition-colors duration-200 shadow-[0_1px_3px_rgba(28,25,23,0.03)]">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EDE6DA] border-b border-[#1C1917]/[0.08]">
                  <Image
                    src="/images/infrastructure/infra-02-film-lamination-rollers.jpg"
                    alt="Extrusion bubble through nip rollers"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-[#1C1917]/10">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A160]">
                        02
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#57524E]">
                        Extrusion
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-[#1C1917]">
                      Blown Film
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#57524E] leading-relaxed">
                      Extrusion bubble cooled and flattened through nip rollers.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 3: Rotogravure Printing */}
            <StaggerCard index={2}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-[#1C1917]/10 border-t-[#C9A160]/35 bg-[#FCF9F4] hover:border-[#C9A160]/70 transition-colors duration-200 shadow-[0_1px_3px_rgba(28,25,23,0.03)]">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EDE6DA] border-b border-[#1C1917]/[0.08]">
                  <Image
                    src="/images/infrastructure/infra-03-rotogravure-cylinders.jpg"
                    alt="8-colour rotogravure printing cylinders and printed film roll"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-[#1C1917]/10">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A160]">
                        03
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#57524E]">
                        8-Colour Press
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-[#1C1917]">
                      Rotogravure Printing
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#57524E] leading-relaxed">
                      8-colour cylinders registering vivid print on film rolls.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 4: Finished Pouch */}
            <StaggerCard index={3}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-[#1C1917]/10 border-t-[#C9A160]/35 bg-[#FCF9F4] hover:border-[#C9A160]/70 transition-colors duration-200 shadow-[0_1px_3px_rgba(28,25,23,0.03)]">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EDE6DA] border-b border-[#1C1917]/[0.08]">
                  <Image
                    src="/images/products/laminated-rolls-and-pouches.jpg"
                    alt="Real laminated stand-up pouches"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-[#1C1917]/10">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A160]">
                          04
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-[#1A3A3D] border border-[#1A3A3D]/30 bg-[#1A3A3D]/8 px-1.5 py-0.5 rounded-xs">
                          LOT GP-1984
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#57524E]">
                        Conversion
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-[#1C1917]">
                      Finished Pouch
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#57524E] leading-relaxed">
                      Real laminated stand-up pouches sealed and ready for dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Core Products Grid — Warm Alabaster Canvas with Subtle Drift */}
      <section id="products" className="relative overflow-hidden bg-light-atmosphere py-24 md:py-32 text-[#1C1917] border-b border-[#C9A160]/25">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1C1917]/10 pb-8">
            <div className="max-w-3xl">
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#C9A160] mb-4">
                02 / CORE PRODUCTS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-[#1C1917]">
                Engineered Flexible Packaging Line
              </h2>
              <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#57524E]">
                Directly manufactured with multi-layer extrusion, UV stabilization, and high-barrier lamination to match global export and industrial requirements.
              </p>
            </div>
            <Link
              href="/products"
              className="min-h-[44px] text-sm font-semibold text-[#3D0E18] hover:text-[#27080F] shrink-0 inline-flex items-center gap-1 transition-colors duration-200 ease-in-out py-2.5 px-2"
            >
              View Full Product Index &rarr;
            </Link>
          </div>

          <StaggerCardsGrid className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => {
              const detail = productDetailMap.get(product.slug);
              const materialSpec = detail?.baseSpecs.find((s) => s.label === "Material")?.value;
              const thicknessSpec = detail?.baseSpecs.find((s) => s.label === "Thickness / GSM")?.value;
              const moqSpec = detail?.moq;

              return (
                <StaggerCard key={product.slug} index={idx}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-lg transition-colors duration-200 ease-in-out hover:border-[#C9A160]/70 h-full cursor-pointer bg-[#FCF9F4] border border-[#1C1917]/10 border-t-[#C9A160]/35 shadow-[0_1px_3px_rgba(28,25,23,0.03)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D0E18]"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EDE6DA] border-b border-[#1C1917]/[0.08]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={375}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                      <div>
                        <div className="flex items-center justify-between gap-2 border-b border-[#1C1917]/10 pb-3">
                          <span className="inline-flex items-center rounded-sm bg-[#1A3A3D]/10 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1A3A3D] border border-[#1A3A3D]/25">
                            {product.category}
                          </span>
                          <span className="font-mono text-[11px] tracking-wider text-[#A65A38] uppercase">
                            SPEC 0{idx + 1}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl md:text-2xl font-serif font-normal leading-[1.2] tracking-[-0.015em] text-[#1C1917] group-hover:text-[#3D0E18] transition-colors duration-200 ease-in-out">
                          {product.name}
                        </h3>

                        <p className="mt-3 text-sm text-[#57524E] line-clamp-2 leading-relaxed">
                          {product.whyGraphipacks}
                        </p>

                        <div className="mt-5 border-t border-[#1C1917]/10 pt-4 font-mono text-xs">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#C9A160] mb-2.5 flex items-center justify-between">
                            <span>Technical Specifications</span>
                            <span className="text-[#C9A160]/80 text-[9px] font-semibold">EST. 1984</span>
                          </div>
                          <dl className="space-y-1.5 text-xs">
                            {materialSpec && (
                              <div className="flex items-baseline justify-between gap-3 border-b border-[#1C1917]/5 pb-1.5">
                                <dt className="text-[#57524E] uppercase tracking-wider text-[11px] shrink-0">Substrate</dt>
                                <dd className="font-sans font-medium text-[#1C1917] text-right truncate text-xs" title={materialSpec}>
                                  {materialSpec}
                                </dd>
                              </div>
                            )}
                            {thicknessSpec && (
                              <div className="flex items-baseline justify-between gap-3 border-b border-[#1C1917]/5 pb-1.5">
                                <dt className="text-[#57524E] uppercase tracking-wider text-[11px] shrink-0">Gauge / GSM</dt>
                                <dd className="font-sans font-medium text-[#1C1917] text-right text-xs">
                                  {thicknessSpec.replace(/ — Standard:.*$/, "")}
                                </dd>
                              </div>
                            )}
                            {moqSpec && (
                              <div className="flex items-baseline justify-between gap-3">
                                <dt className="text-[#57524E] uppercase tracking-wider text-[11px] shrink-0">Min. Order (MOQ)</dt>
                                <dd className="font-sans font-bold text-[#3D0E18] text-right text-xs">
                                  {moqSpec}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>

                        <div className="mt-4">
                          <div className="flex flex-wrap gap-1.5">
                            {product.types.map((type, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-sm border border-[#1C1917]/10 bg-[#EDE6DA] px-2 py-0.5 font-mono text-[10px] text-[#1C1917]"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-[#1C1917]/10 pt-4 flex items-center justify-between font-mono text-xs text-[#3D0E18] min-h-[44px]">
                        <span className="text-[11px] uppercase tracking-wider text-[#57524E] group-hover:text-[#3D0E18] transition-colors duration-200">
                          RFQ / SPEC
                        </span>
                        <span className="inline-flex min-h-[44px] items-center gap-1 font-semibold group-hover:text-[#27080F] transition-colors duration-200 ease-in-out">
                          View Specifications &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerCard>
              );
            })}
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Packaging Applications Showcase — Soft Linen Surface with Subtle Horizon Drift */}
      <section className="relative overflow-hidden bg-light-atmosphere-alt border-y border-[#C9A160]/20 py-24 md:py-32 text-[#1C1917]">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#C9A160] mb-4">
              03 / APPLICATIONS &amp; FORMS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-[#1C1917]">
              Packaging Applications Showcase
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#57524E]">
              Custom-tailored flexible films, multi-barrier configurations, and pre-formed containment engineered across diverse physical product states.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {packagingForms.map((item, idx) => (
              <StaggerCard key={item.form} index={idx}>
                <article
                  className="relative flex flex-col justify-between rounded-lg border border-[#1C1917]/10 border-t-[#C9A160]/35 bg-[#FCF9F4] p-6 md:p-8 transition-colors duration-200 ease-in-out hover:border-[#C9A160]/70 shadow-[0_1px_3px_rgba(28,25,23,0.03)] h-full"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#C9A160]/40 bg-[#EDE6DA] font-mono text-sm font-bold text-[#C9A160]">
                      0{idx + 1}
                    </div>
                    <h3 className="mt-4 text-xl md:text-2xl font-serif font-normal leading-[1.2] tracking-[-0.015em] text-[#1C1917]">
                      {item.form}
                    </h3>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#A65A38]">
                      Industry Examples
                    </p>
                    <ul className="mt-3 space-y-2">
                      {item.examples.map((ex) => (
                        <li
                          key={ex}
                          className="flex items-center gap-2 text-sm text-[#57524E]"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A160]" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-[#1C1917]/10 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex min-h-[44px] w-full items-center justify-between sm:justify-start gap-1 text-xs font-semibold uppercase tracking-wider text-[#3D0E18] hover:text-[#27080F] transition-colors duration-200 ease-in-out py-2.5"
                    >
                      <span>Inquire For Form</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </article>
              </StaggerCard>
            ))}
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Technology Snapshot — Warm Alabaster Canvas with Subtle Drift */}
      <section className="relative overflow-hidden bg-light-atmosphere py-24 md:py-32 text-[#1C1917] border-b border-[#C9A160]/20">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#C9A160] mb-4">
              04 / MANUFACTURING CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-[#1C1917]">
              High-Precision Printing Technology
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#57524E]">
              State-of-the-art prepress, gravure cylinders, and high-speed flexographic converting lines ensuring micro-dot clarity and vivid shelf presence.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 md:grid-cols-3">
            {printingTechnology.map((tech, idx) => (
              <StaggerCard key={tech} index={idx}>
                <div
                  className="flex flex-col justify-between rounded-lg border border-[#1C1917]/10 border-t-[#C9A160]/35 bg-[#FCF9F4] p-6 md:p-8 transition-colors duration-200 ease-in-out hover:border-[#C9A160]/70 shadow-[0_1px_3px_rgba(28,25,23,0.03)] h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#C9A160]">
                        PROCESS 0{idx + 1}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-[#1A3A3D]/25 bg-[#1A3A3D]/8 px-2.5 py-0.5 text-xs font-medium text-[#1A3A3D]">
                        Certified Process
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl md:text-2xl font-serif font-normal leading-[1.2] tracking-[-0.015em] text-[#1C1917]">
                      {tech}
                    </h3>
                    <p className="mt-2 text-sm text-[#57524E] leading-relaxed">
                      Industrial converting line calibrated for continuous web tension control, registered photo-printing, and solvent/water-based polymer inks.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#1C1917]/10 pt-4 flex items-center gap-2 text-xs text-[#57524E]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A160]" />
                    <span>Calibrated for multi-substrate flexibility</span>
                  </div>
                </div>
              </StaggerCard>
            ))}
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Trust Wall — Soft Linen Band */}
      <section className="relative overflow-hidden bg-light-atmosphere-alt border-t border-[#C9A160]/20 py-24 md:py-32 text-[#1C1917]">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C1917]/10 pb-8">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#C9A160] mb-4">
                05 / CLIENT NETWORK
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-[#1C1917]">
                Enterprise Client Network
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] md:text-base leading-[1.7] text-[#57524E]">
              Supplying verified packaging to domestic corporations and international export growers.
            </p>
          </div>

          <div className="mt-12 md:mt-16 space-y-8">
            {clients.map((categoryGroup) => (
              <div
                key={categoryGroup.category}
                className="rounded-2xl border border-[#1C1917]/10 border-t-[#C9A160]/35 bg-[#FCF9F4] p-6 shadow-[0_1px_3px_rgba(28,25,23,0.03)]"
              >
                <div className="flex items-center gap-3 border-b border-[#1C1917]/10 pb-4">
                  <span className="h-2 w-2 rounded-full bg-[#C9A160]" />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#1C1917]">
                    {categoryGroup.category}
                  </h3>
                  <span className="ml-auto rounded-full border border-[#1A3A3D]/25 bg-[#1A3A3D]/8 px-2.5 py-0.5 text-xs font-semibold text-[#1A3A3D]">
                    {categoryGroup.clients.length} Verified Partners
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                  {categoryGroup.clients.map((client) => (
                    <div
                      key={client}
                      className="flex min-h-[60px] sm:min-h-[64px] items-center justify-center rounded-lg border border-[#1C1917]/10 bg-[#EDE6DA] p-2 sm:p-3 text-center transition-colors duration-200 ease-in-out hover:border-[#C9A160]/70 hover:bg-[#F6F2EB]"
                    >
                      <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#1C1917] break-words">
                        {client}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logo Marquee */}
      <ClientLogoMarquee />

      {/* Frequently Asked Questions */}
      <HomeFAQ />

      {/* Closing CTA Banner — Multi-Tone Royal Statement Band */}
      <section className="relative overflow-hidden bg-royal-band border-t border-[#C9A160]/35 py-24 md:py-32 text-[#F6F2EB]">
        {/* Tactile Archival Grain Layer */}
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#C9A160] mb-4">
                COMMERCIAL INQUIRIES &bull; EST. 1984
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-[#F6F2EB]">
                Require Custom Sizing or Printing Specs?
              </h2>
              <p className="mt-4 max-w-[60ch] text-[15px] md:text-base leading-[1.7] text-[#F6F2EB]/85">
                From specialized film formulations to multi-color photo printing and automated wicket bag lines, our operators deliver certified packaging to your exact machinery requirements.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#C9A160]">
                <span className="font-semibold">Executive Leadership:</span>
                <span className="text-[#F6F2EB] font-medium">
                  {company.executiveDirector}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <QuoteTriggerButton
                className="inline-flex items-center justify-center rounded-lg bg-[#C9A160] hover:bg-[#D8B476] px-6 py-3.5 text-sm font-bold text-[#27080F] border border-[#C9A160]/40 transition-colors duration-200 ease-in-out cursor-pointer shadow-sm"
              >
                <span>Get a Quote</span>
                <span className="ml-1.5" aria-hidden="true">&rarr;</span>
              </QuoteTriggerButton>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-[#C9A160] bg-transparent hover:bg-[#C9A160]/15 px-6 py-3.5 text-sm font-semibold text-[#F6F2EB] transition-all duration-200 ease-in-out"
              >
                Our Journey &amp; Infrastructure
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Production Quote Modal */}
      <QuoteModal />
    </div>
  );
}
