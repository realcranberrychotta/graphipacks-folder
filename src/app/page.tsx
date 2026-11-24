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
    <div className="flex flex-col bg-background text-ink">
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
      {/* Hero Section — Precision Packaging Statement */}
      <section id="hero" className="relative overflow-hidden bg-hero-atmosphere border-b border-steel/30 text-ink">
        {/* Tactile Archival Grain Layer */}
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />

        {/* Technical Blueprint & Die-Line Perimeter Markings */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] select-none hidden lg:block">
          {/* Top Registration Corner Marks */}
          <div className="absolute top-24 left-8 font-mono text-[9px] uppercase tracking-[0.25em] text-steel/60">
            ┌ REGISTRATION DATUM // 00.00
          </div>
          <div className="absolute top-24 right-8 font-mono text-[9px] uppercase tracking-[0.25em] text-steel/60">
            1250MM ROTOGRAVURE WEB WIDTH ┐
          </div>

          {/* Vertical Technical Scale / Web Calibration Ticks */}
          <div className="absolute top-40 left-8 flex flex-col gap-6 font-mono text-[8px] text-ink/40 tracking-wider">
            <span className="flex items-center gap-1.5"><span className="h-px w-3 bg-steel/40" /> 000mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-2 bg-steel/30" /> 250mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-3 bg-steel/40" /> 500mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-2 bg-steel/30" /> 750mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-3 bg-steel/40" /> 1000mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-4 bg-steel/60" /> 1250mm MAX</span>
          </div>

          {/* Bottom Technical Coordinates */}
          <div className="absolute bottom-6 left-8 font-mono text-[9px] uppercase tracking-[0.25em] text-steel/60">
            └ MADURAI WORKS // PLANT UNIT 01
          </div>
          <div className="absolute bottom-6 right-8 font-mono text-[9px] uppercase tracking-[0.25em] text-steel/60">
            TOLERANCE ±1.5% // ELECTRONIC REGISTER 0.05MM ┘
          </div>
        </div>

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
      <section id="pellet-to-pouch" className="relative overflow-hidden bg-light-atmosphere-alt border-b border-powder py-24 md:py-32 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
              01 / MANUFACTURING SEQUENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-ink">
              From Pellet to Pouch
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
              Our continuous converting process: taking raw polymer pellets through blown film extrusion, 8-colour rotogravure printing, and final pouch conversion.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 sm:grid-cols-2 md:grid-cols-4">
            {/* Stage 1: Pellets */}
            <StaggerCard index={0}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-powder/50 border-t-steel/35 bg-background hover:border-steel transition-colors duration-200 shadow-[0_1px_3px_rgba(29,53,87,0.04)]">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface border-b border-powder/40">
                  <Image
                    src="/images/products/pp-and-lldpe-bags.jpg"
                    alt="Feed hopper and white polymer pellets"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-powder/40">
                  <div>
                    <div className="flex items-center justify-between border-b border-powder/40 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-steel">
                        01
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink/75">
                        Raw Material
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-ink">
                      Pellets
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Feed hopper loaded with white polymer pellets for extrusion.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 2: Blown Film */}
            <StaggerCard index={1}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-powder/50 border-t-steel/35 bg-background hover:border-steel transition-colors duration-200 shadow-[0_1px_3px_rgba(29,53,87,0.04)]">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface border-b border-powder/40">
                  <Image
                    src="/images/infrastructure/infra-02-film-lamination-rollers.jpg"
                    alt="Extrusion bubble through nip rollers"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-powder/40">
                  <div>
                    <div className="flex items-center justify-between border-b border-powder/40 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-steel">
                        02
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink/75">
                        Extrusion
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-ink">
                      Blown Film
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Extrusion bubble cooled and flattened through nip rollers.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 3: Rotogravure Printing */}
            <StaggerCard index={2}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-powder/50 border-t-steel/35 bg-background hover:border-steel transition-colors duration-200 shadow-[0_1px_3px_rgba(29,53,87,0.04)]">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface border-b border-powder/40">
                  <Image
                    src="/images/infrastructure/infra-03-rotogravure-cylinders.jpg"
                    alt="8-colour rotogravure printing cylinders and printed film roll"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-powder/40">
                  <div>
                    <div className="flex items-center justify-between border-b border-powder/40 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-steel">
                        03
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink/75">
                        8-Colour Press
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-ink">
                      Rotogravure Printing
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                      8-colour cylinders registering vivid print on film rolls.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 4: Finished Pouch */}
            <StaggerCard index={3}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-powder/50 border-t-steel/35 bg-background hover:border-steel transition-colors duration-200 shadow-[0_1px_3px_rgba(29,53,87,0.04)]">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface border-b border-powder/40">
                  <Image
                    src="/images/products/laminated-rolls-and-pouches.jpg"
                    alt="Real laminated stand-up pouches"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-powder/40">
                  <div>
                    <div className="flex items-center justify-between border-b border-powder/40 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-steel">
                          04
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-steel border border-powder bg-powder/15 px-1.5 py-0.5 rounded-xs">
                          LOT GP-1984
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink/75">
                        Conversion
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-ink">
                      Finished Pouch
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Real laminated stand-up pouches sealed and ready for dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Core Products Grid — Honeydew Canvas with Subtle Drift */}
      <section id="products" className="relative overflow-hidden bg-light-atmosphere py-24 md:py-32 text-ink border-b border-powder">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-ink/10 pb-8">
            <div className="max-w-3xl">
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
                02 / CORE PRODUCTS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-ink">
                Engineered Flexible Packaging Line
              </h2>
              <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
                Directly manufactured with multi-layer extrusion, UV stabilization, and high-barrier lamination to match global export and industrial requirements.
              </p>
            </div>
            <Link
              href="/products"
              className="min-h-[44px] text-sm font-semibold text-navy hover:text-steel shrink-0 inline-flex items-center gap-1 transition-colors duration-200 ease-in-out py-2.5 px-2"
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
                    className="group relative flex flex-col justify-between overflow-hidden rounded-lg transition-colors duration-200 ease-in-out hover:border-steel h-full cursor-pointer bg-background border border-powder/50 border-t-steel/35 shadow-[0_1px_3px_rgba(29,53,87,0.04)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface border-b border-powder/40">
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
                        <div className="flex items-center justify-between gap-2 border-b border-powder/40 pb-3">
                          <span className="inline-flex items-center rounded-sm bg-powder/20 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-navy border border-powder">
                            {product.category}
                          </span>
                          <span className="font-mono text-[11px] tracking-wider text-steel uppercase">
                            SPEC 0{idx + 1}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl md:text-2xl font-serif font-normal leading-[1.2] tracking-[-0.015em] text-ink group-hover:text-navy transition-colors duration-200 ease-in-out">
                          {product.name}
                        </h3>

                        <p className="mt-3 text-sm text-ink/75 line-clamp-2 leading-relaxed">
                          {product.whyGraphipacks}
                        </p>

                        <div className="mt-5 border-t border-powder/40 pt-4 font-mono text-xs">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-steel mb-2.5 flex items-center justify-between">
                            <span>Technical Specifications</span>
                            <span className="text-red text-[9px] font-bold">EST. 1984</span>
                          </div>
                          <dl className="space-y-1.5 text-xs">
                            {materialSpec && (
                              <div className="flex items-baseline justify-between gap-3 border-b border-ink/5 pb-1.5">
                                <dt className="text-ink/75 uppercase tracking-wider text-[11px] shrink-0">Substrate</dt>
                                <dd className="font-sans font-medium text-ink text-right truncate text-xs" title={materialSpec}>
                                  {materialSpec}
                                </dd>
                              </div>
                            )}
                            {thicknessSpec && (
                              <div className="flex items-baseline justify-between gap-3 border-b border-ink/5 pb-1.5">
                                <dt className="text-ink/75 uppercase tracking-wider text-[11px] shrink-0">Gauge / GSM</dt>
                                <dd className="font-sans font-medium text-ink text-right text-xs">
                                  {thicknessSpec.replace(/ — Standard:.*$/, "")}
                                </dd>
                              </div>
                            )}
                            {moqSpec && (
                              <div className="flex items-baseline justify-between gap-3">
                                <dt className="text-ink/75 uppercase tracking-wider text-[11px] shrink-0">Min. Order (MOQ)</dt>
                                <dd className="font-sans font-bold text-navy text-right text-xs">
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
                                className="inline-flex items-center rounded-sm border border-powder/60 bg-surface px-2 py-0.5 font-mono text-[10px] text-ink hover:border-steel hover:text-steel transition-colors"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-powder/40 pt-4 flex items-center justify-between font-mono text-xs text-navy min-h-[44px]">
                        <span className="text-[11px] uppercase tracking-wider text-ink/75 group-hover:text-navy transition-colors duration-200">
                          RFQ / SPEC
                        </span>
                        <span className="inline-flex min-h-[44px] items-center gap-1 font-semibold group-hover:text-steel transition-colors duration-200 ease-in-out">
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

      {/* Packaging Applications Showcase — Honeydew Surface with Subtle Horizon Drift */}
      <section className="relative overflow-hidden bg-light-atmosphere-alt border-y border-powder py-24 md:py-32 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
              03 / APPLICATIONS &amp; FORMS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-ink">
              Packaging Applications Showcase
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
              Custom-tailored flexible films, multi-barrier configurations, and pre-formed containment engineered across diverse physical product states.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {packagingForms.map((item, idx) => (
              <StaggerCard key={item.form} index={idx}>
                <article
                  className="relative flex flex-col justify-between rounded-lg border border-powder/50 border-t-steel/35 bg-background p-6 md:p-8 transition-colors duration-200 ease-in-out hover:border-steel shadow-[0_1px_3px_rgba(29,53,87,0.04)] h-full"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-powder bg-surface font-mono text-sm font-bold text-steel">
                      0{idx + 1}
                    </div>
                    <h3 className="mt-4 text-xl md:text-2xl font-serif font-normal leading-[1.2] tracking-[-0.015em] text-ink">
                      {item.form}
                    </h3>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-steel">
                      Industry Examples
                    </p>
                    <ul className="mt-3 space-y-2">
                      {item.examples.map((ex) => (
                        <li
                           key={ex}
                          className="flex items-center gap-2 text-sm text-ink/75"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-steel" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-powder/40 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex min-h-[44px] w-full items-center justify-between sm:justify-start gap-1 text-xs font-semibold uppercase tracking-wider text-navy hover:text-steel transition-colors duration-200 ease-in-out py-2.5"
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

      {/* Technology Snapshot — Honeydew Canvas with Subtle Drift */}
      <section className="relative overflow-hidden bg-light-atmosphere py-24 md:py-32 text-ink border-b border-powder">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
              04 / MANUFACTURING CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-ink">
              High-Precision Printing Technology
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
              State-of-the-art prepress, gravure cylinders, and high-speed flexographic converting lines ensuring micro-dot clarity and vivid shelf presence.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 md:grid-cols-3">
            {printingTechnology.map((tech, idx) => (
              <StaggerCard key={tech} index={idx}>
                <div
                  className="flex flex-col justify-between rounded-lg border border-powder/50 border-t-steel/35 bg-background p-6 md:p-8 transition-colors duration-200 ease-in-out hover:border-steel shadow-[0_1px_3px_rgba(29,53,87,0.04)] h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-steel">
                        PROCESS 0{idx + 1}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-powder bg-powder/20 px-2.5 py-0.5 text-xs font-medium text-navy">
                        Certified Process
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl md:text-2xl font-serif font-normal leading-[1.2] tracking-[-0.015em] text-ink">
                      {tech}
                    </h3>
                    <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                      Industrial converting line calibrated for continuous web tension control, registered photo-printing, and solvent/water-based polymer inks.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-powder/40 pt-4 flex items-center gap-2 text-xs text-ink/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-steel" />
                    <span>Calibrated for multi-substrate flexibility</span>
                  </div>
                </div>
              </StaggerCard>
            ))}
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Trust Wall — Honeydew Band */}
      <section className="relative overflow-hidden bg-light-atmosphere-alt border-t border-powder py-24 md:py-32 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-powder/40 pb-8">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
                05 / CLIENT NETWORK
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-ink">
                Enterprise Client Network
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
              Supplying verified packaging to domestic corporations and international export growers.
            </p>
          </div>

          <div className="mt-12 md:mt-16 space-y-8">
            {clients.map((categoryGroup) => (
              <div
                key={categoryGroup.category}
                className="rounded-2xl border border-powder/50 border-t-steel/35 bg-background p-6 shadow-[0_1px_3px_rgba(29,53,87,0.04)]"
              >
                <div className="flex items-center gap-3 border-b border-powder/40 pb-4">
                  <span className="h-2 w-2 rounded-full bg-steel" />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                    {categoryGroup.category}
                  </h3>
                  <span className="ml-auto rounded-full border border-powder bg-powder/20 px-2.5 py-0.5 text-xs font-semibold text-navy">
                    {categoryGroup.clients.length} Verified Partners
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                  {categoryGroup.clients.map((client) => (
                    <div
                      key={client}
                      className="flex min-h-[60px] sm:min-h-[64px] items-center justify-center rounded-lg border border-powder/40 bg-surface p-2 sm:p-3 text-center transition-colors duration-200 ease-in-out hover:border-steel hover:bg-background"
                    >
                      <span className="text-xs sm:text-sm font-semibold tracking-tight text-ink break-words">
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
      <section className="relative overflow-hidden bg-royal-band border-t border-powder/30 py-24 md:py-32 text-background">
        {/* Tactile Archival Grain Layer */}
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-powder mb-4">
                COMMERCIAL INQUIRIES &bull; EST. 1984
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-normal leading-[1.12] tracking-[-0.02em] text-background">
                Require Custom Sizing or Printing Specs?
              </h2>
              <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-background/85">
                From specialized film formulations to multi-color photo printing and automated wicket bag lines, our operators deliver certified packaging to your exact machinery requirements.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-powder">
                <span className="font-semibold">Executive Leadership:</span>
                <span className="text-background font-medium">
                  {company.executiveDirector}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <QuoteTriggerButton
                className="inline-flex items-center justify-center rounded-lg bg-red hover:bg-[#d62839] text-background px-6 py-3.5 text-sm font-bold border border-red transition-colors duration-200 ease-in-out cursor-pointer shadow-sm"
              >
                <span>Get a Quote</span>
                <span className="ml-1.5" aria-hidden="true">&rarr;</span>
              </QuoteTriggerButton>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-powder/50 bg-transparent hover:bg-powder/15 px-6 py-3.5 text-sm font-semibold text-background transition-all duration-200 ease-in-out"
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
