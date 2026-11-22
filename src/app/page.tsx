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
    <div className="flex flex-col bg-transparent text-[#F8F4EC]">
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
      {/* Hero Section */}
      <section id="hero" className="hero-grainy-bg relative overflow-hidden border-b border-[#B08D57]/25 bg-[#0F2A44] text-[#F8F4EC]">
        {/* Subtle Grain / Paper Texture Overlay (Hero only, <= 5% opacity, static) */}
        <div className="hero-grain-overlay pointer-events-none" aria-hidden="true" />

        {/* Accessible Hero Skip Animation Control */}
        <HeroSkipControl />

        {/* Desktop Hero — Monumental Typography over 3D Manufacturing Line (>= 768px) */}
        <div className="hidden md:block relative min-h-[720px] w-full">
          {/* 3D Manufacturing Plant Tour (embed, height 720px) */}
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
        <div className="block md:hidden relative w-full pt-3 pb-8 bg-transparent">
          <MobileHero />
        </div>
      </section>

      {/* From Pellet to Pouch — 4-Stage Manufacturing Sequence */}
      <section id="pellet-to-pouch" className="border-b border-[#B08D57]/25 bg-[#0F2A44] py-20 sm:py-24 text-[#F8F4EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              Manufacturing Sequence
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#F8F4EC]">
              From Pellet to Pouch
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#EFE8DC]/85 leading-relaxed">
              Our continuous converting process: taking raw polymer pellets through blown film extrusion, 8-colour rotogravure printing, and final pouch conversion.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {/* Stage 1: Pellets */}
            <StaggerCard index={0}>
              <div className="flex flex-col h-full overflow-hidden rounded-xl border border-[#B08D57]/25 bg-[#091B2C]">
                <div className="relative w-full h-48 sm:h-52 bg-[#071524]">
                  <Image
                    src="/images/products/pp-and-lldpe-bags.jpg"
                    alt="Feed hopper and white polymer pellets"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-[#B08D57]/20">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#B08D57]/15 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
                        01
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#EFE8DC]/60">
                        Raw Material
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-[#F8F4EC]">
                      Pellets
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#EFE8DC]/85 leading-relaxed">
                      Feed hopper loaded with white polymer pellets for extrusion.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 2: Blown Film */}
            <StaggerCard index={1}>
              <div className="flex flex-col h-full overflow-hidden rounded-xl border border-[#B08D57]/25 bg-[#091B2C]">
                <div className="relative w-full h-48 sm:h-52 bg-[#071524]">
                  <Image
                    src="/images/infrastructure/infra-02-film-lamination-rollers.jpg"
                    alt="Extrusion bubble through nip rollers"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-[#B08D57]/20">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#B08D57]/15 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
                        02
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#EFE8DC]/60">
                        Extrusion
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-[#F8F4EC]">
                      Blown Film
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#EFE8DC]/85 leading-relaxed">
                      Extrusion bubble cooled and flattened through nip rollers.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 3: Rotogravure Printing */}
            <StaggerCard index={2}>
              <div className="flex flex-col h-full overflow-hidden rounded-xl border border-[#B08D57]/25 bg-[#091B2C]">
                <div className="relative w-full h-48 sm:h-52 bg-[#071524]">
                  <Image
                    src="/images/infrastructure/infra-03-rotogravure-cylinders.jpg"
                    alt="8-colour rotogravure printing cylinders and printed film roll"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-[#B08D57]/20">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#B08D57]/15 pb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
                        03
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#EFE8DC]/60">
                        8-Colour Press
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-[#F8F4EC]">
                      Rotogravure Printing
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#EFE8DC]/85 leading-relaxed">
                      8-colour cylinders registering vivid print on film rolls.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>

            {/* Stage 4: Finished Pouch */}
            <StaggerCard index={3}>
              <div className="flex flex-col h-full overflow-hidden rounded-xl border border-[#B08D57]/25 bg-[#091B2C]">
                <div className="relative w-full h-48 sm:h-52 bg-[#071524]">
                  <Image
                    src="/images/products/laminated-rolls-and-pouches.jpg"
                    alt="Real laminated stand-up pouches"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 border-t border-[#B08D57]/20">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#B08D57]/15 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
                          04
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-[#B08D57] border border-[#B08D57]/40 bg-[#091B2C] px-1.5 py-0.5 rounded-xs">
                          LOT GP-1984
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#EFE8DC]/60">
                        Conversion
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold font-serif text-[#F8F4EC]">
                      Finished Pouch
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#EFE8DC]/85 leading-relaxed">
                      Real laminated stand-up pouches sealed and ready for dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerCard>
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Core Products Grid */}
      <section id="products" className="py-24 sm:py-28 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#B08D57]/20 pb-8">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
                01 — Core Products
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#F8F4EC]">
                Engineered Flexible Packaging Line
              </h2>
              <p className="mt-3 text-sm sm:text-base font-normal text-[#EFE8DC]/85 leading-relaxed">
                Directly manufactured with multi-layer extrusion, UV stabilization, and high-barrier lamination to match global export and industrial requirements.
              </p>
            </div>
            <Link
              href="/products"
              className="min-h-[44px] text-sm font-semibold text-[#B08D57] hover:text-[#F8F4EC] shrink-0 inline-flex items-center gap-1 transition-colors duration-200 ease-in-out py-2.5 px-2"
            >
              View Full Product Index &rarr;
            </Link>
          </div>

          <StaggerCardsGrid className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => {
              const detail = productDetailMap.get(product.slug);
              const materialSpec = detail?.baseSpecs.find((s) => s.label === "Material")?.value;
              const thicknessSpec = detail?.baseSpecs.find((s) => s.label === "Thickness / GSM")?.value;
              const moqSpec = detail?.moq;

              return (
                <StaggerCard key={product.slug} index={idx}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="fluted-glass-card group relative flex flex-col justify-between overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:border-[#B08D57]/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#B08D57]/15 h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57]"
                  >
                    <div className="relative w-full h-52 overflow-hidden bg-[#071524] border-b border-[#B08D57]/20">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={384}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        decoding="async"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
                        className="w-full h-52 object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center justify-between gap-2 border-b border-[#B08D57]/15 pb-3">
                          <span className="inline-flex items-center rounded-sm bg-[#071524] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#B08D57] border border-[#B08D57]/30">
                            {product.category}
                          </span>
                          <span className="font-mono text-[11px] tracking-wider text-[#EFE8DC]/60 uppercase">
                            SPEC 0{idx + 1}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-bold font-serif text-[#F8F4EC] group-hover:text-white transition-colors duration-200 ease-in-out">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-sm text-[#EFE8DC]/85 line-clamp-2 leading-relaxed">
                          {product.whyGraphipacks}
                        </p>

                        <div className="mt-5 border-t border-[#B08D57]/20 pt-4 font-mono text-xs">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#B08D57] mb-2.5 flex items-center justify-between">
                            <span>Technical Specifications</span>
                            <span className="text-[#EFE8DC]/40 text-[9px]">EST. 1984</span>
                          </div>
                          <dl className="space-y-1.5 text-xs">
                            {materialSpec && (
                              <div className="flex items-baseline justify-between gap-3 border-b border-[#B08D57]/10 pb-1.5">
                                <dt className="text-[#EFE8DC]/60 uppercase tracking-wider text-[11px] shrink-0">Substrate</dt>
                                <dd className="font-sans font-medium text-[#F8F4EC] text-right truncate text-xs" title={materialSpec}>
                                  {materialSpec}
                                </dd>
                              </div>
                            )}
                            {thicknessSpec && (
                              <div className="flex items-baseline justify-between gap-3 border-b border-[#B08D57]/10 pb-1.5">
                                <dt className="text-[#EFE8DC]/60 uppercase tracking-wider text-[11px] shrink-0">Gauge / GSM</dt>
                                <dd className="font-sans font-medium text-[#F8F4EC] text-right text-xs">
                                  {thicknessSpec.replace(/ — Standard:.*$/, "")}
                                </dd>
                              </div>
                            )}
                            {moqSpec && (
                              <div className="flex items-baseline justify-between gap-3">
                                <dt className="text-[#EFE8DC]/60 uppercase tracking-wider text-[11px] shrink-0">Min. Order (MOQ)</dt>
                                <dd className="font-sans font-medium text-[#B08D57] text-right text-xs">
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
                                className="inline-flex items-center rounded-sm border border-[#B08D57]/20 bg-[#071524] px-2 py-0.5 font-mono text-[10px] text-[#EFE8DC]/80"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-[#B08D57]/20 pt-4 flex items-center justify-between font-mono text-xs text-[#B08D57] min-h-[44px]">
                        <span className="text-[11px] uppercase tracking-wider text-[#EFE8DC]/60 group-hover:text-[#B08D57] transition-colors duration-200">
                          RFQ / SPEC
                        </span>
                        <span className="inline-flex min-h-[44px] items-center gap-1 font-semibold group-hover:text-[#F8F4EC] transition-colors duration-200 ease-in-out">
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

      {/* Packaging Applications Showcase */}
      <section className="border-y border-[#B08D57]/20 bg-transparent py-24 sm:py-28 text-[#F8F4EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white mix-blend-exclusion">
              02 — Applications &amp; Forms
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white mix-blend-exclusion">
              Packaging Applications Showcase
            </h2>
            <p className="mt-3 text-sm sm:text-base font-medium text-white mix-blend-exclusion leading-relaxed">
              Custom-tailored flexible films, multi-barrier configurations, and pre-formed containment engineered across diverse physical product states.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packagingForms.map((item, idx) => (
              <StaggerCard key={item.form} index={idx}>
                <article
                  className="relative flex flex-col justify-between rounded-xl border border-[#B08D57]/25 border-t-[#B08D57]/40 bg-[#0F2A44]/90 backdrop-blur-md p-6 shadow-xl transition-all duration-300 ease-in-out hover:border-[#B08D57]/60 h-full"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#B08D57]/40 bg-[#1B3D5E] font-mono text-sm font-bold text-[#B08D57]">
                      0{idx + 1}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#F8F4EC]">
                      {item.form}
                    </h3>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#B08D57]">
                      Industry Examples
                    </p>
                    <ul className="mt-3 space-y-2">
                      {item.examples.map((ex) => (
                        <li
                          key={ex}
                          className="flex items-center gap-2 text-sm text-[#EFE8DC]/85"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B08D57]" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-[#B08D57]/25 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex min-h-[44px] w-full items-center justify-between sm:justify-start gap-1 text-xs font-semibold uppercase tracking-wider text-[#B08D57] hover:text-[#F8F4EC] transition-colors duration-200 ease-in-out py-2.5"
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

      {/* Technology Snapshot */}
      <section className="py-24 sm:py-28 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white mix-blend-exclusion">
              03 — Manufacturing Capabilities
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white mix-blend-exclusion">
              High-Precision Printing Technology
            </h2>
            <p className="mt-3 text-sm sm:text-base font-medium text-white mix-blend-exclusion leading-relaxed">
              State-of-the-art prepress, gravure cylinders, and high-speed flexographic converting lines ensuring micro-dot clarity and vivid shelf presence.
            </p>
          </div>

          <StaggerCardsGrid className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {printingTechnology.map((tech, idx) => (
              <StaggerCard key={tech} index={idx}>
                <div
                  className="flex flex-col justify-between rounded-xl border border-[#B08D57]/25 border-t-[#B08D57]/40 bg-[#0F2A44]/90 backdrop-blur-md p-7 shadow-xl transition-all duration-300 ease-in-out hover:border-[#B08D57]/60 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#B08D57]">
                        PROCESS 0{idx + 1}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-[#B08D57]/40 bg-[#1B3D5E] px-2.5 py-0.5 text-xs font-medium text-[#F8F4EC]">
                        Certified Process
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[#F8F4EC]">
                      {tech}
                    </h3>
                    <p className="mt-2 text-sm text-[#EFE8DC]/85 leading-relaxed">
                      Industrial converting line calibrated for continuous web tension control, registered photo-printing, and solvent/water-based polymer inks.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#B08D57]/25 pt-4 flex items-center gap-2 text-xs text-[#EFE8DC]/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
                    <span>Calibrated for multi-substrate flexibility</span>
                  </div>
                </div>
              </StaggerCard>
            ))}
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Trust Wall */}
      <section className="border-t border-[#B08D57]/20 bg-transparent py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B08D57]/20 pb-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white mix-blend-exclusion">
                04 — Client Network
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white mix-blend-exclusion">
                Enterprise Client Network
              </h2>
            </div>
            <p className="text-sm font-medium sm:text-right max-w-xs text-white mix-blend-exclusion leading-relaxed">
              Supplying verified packaging to domestic corporations and international export growers.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {clients.map((categoryGroup) => (
              <div
                key={categoryGroup.category}
                className="rounded-2xl border border-[#B08D57]/25 border-t-[#B08D57]/40 bg-[#0F2A44]/90 backdrop-blur-md p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 border-b border-[#B08D57]/25 pb-4">
                  <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#F8F4EC]">
                    {categoryGroup.category}
                  </h3>
                  <span className="ml-auto rounded-full border border-[#B08D57]/30 bg-[#1B3D5E] px-2.5 py-0.5 text-xs font-semibold text-[#F8F4EC]">
                    {categoryGroup.clients.length} Verified Partners
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                  {categoryGroup.clients.map((client) => (
                    <div
                      key={client}
                      className="flex min-h-[60px] sm:min-h-[64px] items-center justify-center rounded-lg border border-[#B08D57]/20 bg-[#091B2C]/70 p-2 sm:p-3 text-center transition-all duration-200 ease-in-out hover:border-[#B08D57]/60 hover:bg-[#091B2C] shadow-xs"
                    >
                      <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#F8F4EC] break-words">
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

      {/* Bottom Conversion CTA */}
      <section className="border-t border-[#B08D57]/25 bg-[#091B2C] py-20 text-[#F8F4EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F8F4EC]">
                Require Custom Sizing or Printing Specs?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#EFE8DC]/85 leading-relaxed">
                From specialized film formulations to multi-color photo printing and automated wicket bag lines, our operators deliver certified packaging to your exact machinery requirements.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#B08D57]">
                <span className="font-semibold">Executive Leadership:</span>
                <span className="text-[#F8F4EC] font-medium">
                  {company.executiveDirector}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <QuoteTriggerButton
                className="inline-flex items-center justify-center rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-sm font-bold text-[#091B2C] shadow-md shadow-[#B08D57]/20 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <span>Get a Quote</span>
                <span className="ml-1.5" aria-hidden="true">&rarr;</span>
              </QuoteTriggerButton>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-[#B08D57]/45 bg-transparent hover:bg-[#B08D57]/10 hover:border-[#B08D57] px-6 py-3.5 text-sm font-semibold text-[#F8F4EC] transition-all duration-200 ease-in-out"
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
