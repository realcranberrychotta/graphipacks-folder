"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Graphipackss Private Limited | Flexible Packaging Solutions (Est. 1984)",
  description:
    "Leading manufacturer of high-barrier flexible packaging, agricultural mulch films, UV-treated grow bags, rotogravure printed pouches, and wicketted poly bags in Madurai, India.",
  openGraph: {
    title: "Graphipackss Private Limited | Flexible Packaging Solutions (Est. 1984)",
    description:
      "Leading manufacturer of high-barrier flexible packaging, agricultural mulch films, UV-treated grow bags, rotogravure printed pouches, and wicketted poly bags in Madurai, India.",
  },
};
import {
  company,
  products,
  printingCapabilities,
} from "@/lib/content";
import { PRODUCTS_DATA } from "@/data/products";
import HomeHeroFactory from "@/components/HomeHeroFactory";
import HeroMinimal from "@/components/HeroMinimal";
import HeroHeadline from "@/components/HeroHeadline";
import MobileHero from "@/components/MobileHero";
import HeroSkipControl from "@/components/HeroSkipControl";
import { StaggerCardsGrid, StaggerCard } from "@/components/StaggerCards";
import QuoteModal from "@/components/QuoteModal";
import HomeFAQ from "@/components/HomeFAQ";
import { Stats } from "@/components/ui/stats-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HorizontalSequence } from "@/components/ui/horizontal-sequence";
import FlowingMenu, { FlowingMenuItem } from "@/components/ui/flowing-menu";
import EnterpriseClientMarquee from "@/components/ui/enterprise-client-marquee";
import { ArrowUpRight } from "lucide-react";
import MaskedHeading from "@/components/ui/masked-heading";

const PACKAGING_FLOWING_ITEMS: FlowingMenuItem[] = [
  {
    text: "Powder Form Products",
    marquee: "Flour • Spicy Powder • Jaggery",
    meta: "Flour • Spicy Powder • Jaggery",
    image: "/images/products/laminated-rolls-and-pouches.jpg",
    link: "/contact?inquiry=powder-form-products",
  },
  {
    text: "Solid Shape Products",
    marquee: "Bread • Cake • Jelly",
    meta: "Bread • Cake • Jelly",
    image: "/images/products/wicked-poly-bags.jpg",
    link: "/contact?inquiry=solid-shape-products",
  },
  {
    text: "Solid Irregular Shape Products",
    marquee: "Snacks • Chicken Bags • Grated Coconut",
    meta: "Snacks • Chicken Bags • Grated Coconut",
    image: "/images/products/pp-and-lldpe-bags.jpg",
    link: "/contact?inquiry=solid-irregular-shape-products",
  },
  {
    text: "Liquid Products",
    marquee: "Milk • Sip-up",
    meta: "Milk • Sip-up",
    image: "/images/infrastructure/infra-06-laminated-film-rolls.jpg",
    link: "/contact?inquiry=liquid-products",
  },
];

export default async function HomePage() {
  cacheLife("days");

  const productDetailMap = new Map(PRODUCTS_DATA.map((p) => [p.slug, p]));

  return (
    <div className="flex flex-col bg-background text-ink overflow-x-clip">
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
          <div className="absolute top-4 left-6 font-mono text-[9px] uppercase tracking-[0.25em] text-steel/60">
            ┌ REGISTRATION DATUM // 00.00
          </div>
          <div className="absolute top-4 right-6 font-mono text-[9px] uppercase tracking-[0.25em] text-steel/60">
            1250MM ROTOGRAVURE WEB WIDTH ┐
          </div>

          {/* Vertical Technical Scale / Web Calibration Ticks */}
          <div className="hidden xl:flex absolute top-40 left-2 flex-col gap-6 font-mono text-[8px] text-ink/40 tracking-wider">
            <span className="flex items-center gap-1.5"><span className="h-px w-3 bg-steel/40" /> 000mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-2 bg-steel/30" /> 250mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-3 bg-steel/40" /> 500mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-2 bg-steel/30" /> 750mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-3 bg-steel/40" /> 1000mm</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-4 bg-steel/60" /> 1250mm MAX</span>
          </div>

          {/* Bottom Technical Coordinates */}
          <div className="absolute bottom-3 left-6 font-mono text-[9px] uppercase tracking-[0.25em] text-steel/60">
            └ MADURAI WORKS // PLANT UNIT 01
          </div>
          <div className="absolute bottom-3 right-6 font-mono text-[9px] uppercase tracking-[0.25em] text-steel/60">
            TOLERANCE ±1.5% // ELECTRONIC REGISTER 0.05MM ┘
          </div>
        </div>

        {/* Accessible Hero Skip Animation Control */}
        <HeroSkipControl />

        {/* Unified Hero Container — Single 3D Line Mount across Desktop & Mobile */}
        <div className="relative z-10 w-full md:min-h-[calc(100vh-4.5rem)] pt-3 pb-8 md:pt-0 md:pb-0">
          {/* Mobile Hero Copy & CTAs (< 768px) */}
          <div className="block md:hidden">
            <MobileHero />
          </div>

          {/* Interactive 3D Manufacturing Line (Single Mount: Flow below Hero on mobile, backdrop layer on desktop) */}
          <div className="mt-2 px-4 md:mt-0 md:px-0 md:absolute md:inset-0 md:w-full md:h-full md:z-0 md:overflow-hidden pointer-events-auto">
            <HomeHeroFactory />
          </div>

          {/* Desktop Monumental Typography Overlay (>= 768px) */}
          <div className="hidden md:flex relative z-10 pointer-events-none pt-20 pb-4 lg:min-h-[calc(100vh-4.5rem)] items-center">
            <div className="w-full">
              <HeroMinimal
                company={company}
                headline={<HeroHeadline />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* From Pellet to Pouch — 4-Stage Manufacturing Sequence (Horizontal Conveyor Sequence) */}
      <HorizontalSequence
        header={
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E63946] inline-block shrink-0" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-mono font-medium text-[#457B9D]">
                01 / MANUFACTURING SEQUENCE
              </span>
            </div>
            <MaskedHeading
              as="h2"
              className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] font-display font-bold leading-[1.16] tracking-[-0.015em] text-[#1D3557]"
            >
              From Pellet to Pouch
            </MaskedHeading>
            <ScrollReveal
              as="p"
              mode="scrub"
              splitBy="words"
              effect="fade"
              highlightColor="#457B9D"
              baseOpacity={0.2}
              baseRotation={0}
              enableBlur={false}
              containerClassName="mt-2.5 sm:mt-3 max-w-[62ch]"
              textClassName="text-[14px] md:text-[15px] lg:text-base leading-[1.6] text-[#1D3557]/80 font-sans"
            >
              Our continuous converting process: taking raw polymer pellets through blown film extrusion, 8-colour rotogravure printing, and final pouch conversion.
            </ScrollReveal>
          </div>
        }
      />

      {/* Core Products Grid — Honeydew Canvas with Subtle Drift */}
      <section id="products" className="relative overflow-hidden bg-light-atmosphere py-16 md:py-24 text-ink border-b border-powder">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-ink/10 pb-8">
            <div className="max-w-3xl">
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
                02 / CORE PRODUCTS
              </span>
              <MaskedHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.16] tracking-[-0.015em] text-ink"
              >
                Engineered Flexible Packaging Line
              </MaskedHeading>
              <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75">
                Directly manufactured with multi-layer extrusion, UV stabilization, and high-barrier lamination to match global export and industrial requirements.
              </p>
            </div>
            <Link
              href="/products"
              className="btn-tactile group min-h-[44px] text-sm font-semibold text-navy hover:text-steel shrink-0 inline-flex items-center gap-1.5 transition-colors duration-200 ease-in-out py-2.5 px-3 rounded-md"
            >
              <span>View Full Product Index</span>
              <span className="tactile-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <StaggerCardsGrid className="mt-8 md:mt-12 grid grid-cols-1 gap-7 md:gap-9 md:grid-cols-2 lg:grid-cols-3">
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
                    <div className="p-3 pb-0 bg-background">
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-md border border-powder/60 bg-surface shadow-xs">
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
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                      <div>
                        <div className="flex items-center justify-between gap-2 border-b border-powder/40 pb-3">
                          <span className="inline-flex items-center rounded-sm bg-powder/20 px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-navy border border-powder">
                            {product.category}
                          </span>
                          <span className="font-mono text-[11px] font-medium tracking-wider text-steel uppercase">
                            SPEC 0{idx + 1}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl md:text-2xl font-display font-bold leading-[1.2] tracking-[-0.01em] text-ink group-hover:text-navy transition-colors duration-200 ease-in-out">
                          {product.name}
                        </h3>

                        <p className="mt-3 text-sm text-ink/75 line-clamp-2 leading-relaxed font-sans">
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
                                <dt className="text-ink/75 font-medium uppercase tracking-wider text-[11px] shrink-0">Substrate</dt>
                                <dd className="font-mono font-normal text-ink text-right truncate text-xs" title={materialSpec}>
                                  {materialSpec}
                                </dd>
                              </div>
                            )}
                            {thicknessSpec && (
                              <div className="flex items-baseline justify-between gap-3 border-b border-ink/5 pb-1.5">
                                <dt className="text-ink/75 font-medium uppercase tracking-wider text-[11px] shrink-0">Gauge / GSM</dt>
                                <dd className="font-mono font-normal text-ink text-right text-xs">
                                  {thicknessSpec.replace(/ — Standard:.*$/, "")}
                                </dd>
                              </div>
                            )}
                            {moqSpec && (
                              <div className="flex items-baseline justify-between gap-3">
                                <dt className="text-ink/75 font-medium uppercase tracking-wider text-[11px] shrink-0">Min. Order (MOQ)</dt>
                                <dd className="font-mono font-bold text-navy text-right text-xs">
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
                        <span className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold group-hover:text-steel transition-colors duration-200 ease-in-out">
                          <span>View Specifications</span>
                          <span className="tactile-arrow inline-block" aria-hidden="true">&rarr;</span>
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

      {/* Packaging Applications Showcase — Full-Width Architectural Flowing Menu */}
      <section id="packaging-forms" className="relative overflow-x-clip bg-light-atmosphere-alt border-y border-powder py-16 md:py-24 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10 md:mb-14">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-[#457B9D] inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" aria-hidden="true" />
              03 / APPLICATIONS &amp; FORMS
            </span>
            <MaskedHeading
              as="h2"
              className="text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.12] tracking-[-0.015em] font-display font-bold text-[#1D3557]"
            >
              Packaging Applications Showcase
            </MaskedHeading>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#1D3557]/80 font-sans">
              Custom-tailored flexible films, multi-barrier configurations, and pre-formed containment engineered across diverse physical product states.
            </p>
          </div>
        </div>

        {/* Mobile View (< 768px): Clean Document-Flow Hairline List */}
        <div className="flex flex-col w-full h-auto border-t border-[#A8DADC] md:hidden">
          {PACKAGING_FLOWING_ITEMS.map((item, idx) => (
            <Link
              key={item.text}
              href={item.link || "/contact"}
              className="relative block w-full py-5 px-6 sm:px-10 border-b border-[#A8DADC] active:bg-[#A8DADC]/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs tracking-[0.2em] text-[#457B9D] font-bold">
                  0{idx + 1}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#457B9D] shrink-0" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-xl leading-[1.25] text-[#1D3557]">
                {item.text}
              </h3>
              {item.meta && (
                <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#1D3557]/75">
                  {item.meta}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop View (>= 768px): Interactive Full-Width Flowing Menu */}
        <div className="hidden md:block relative z-10 w-full h-[460px] border-y border-[#A8DADC] bg-[#F1FAEE]">
          <FlowingMenu
            items={PACKAGING_FLOWING_ITEMS}
            speed={55}
            direction="left"
            duration={0.5}
            stretch={0.5}
            magnet={0.2}
            textColor="#1D3557"
            bgColor="#F1FAEE"
            marqueeBgColor="#1D3557"
            marqueeTextColor="#F1FAEE"
            borderColor="#A8DADC"
            dividers={true}
            dimInactive={true}
            align="left"
            showIndex={true}
            showArrow={true}
            imageShape="rounded"
            intro={false}
            ariaLabel="Packaging Applications Showcase"
          />
        </div>
      </section>

      {/* Technology Snapshot — Architectural Dark Navy Contrast Band */}
      <section id="printing-technology" className="relative overflow-x-clip bg-[#1D3557] py-16 lg:py-24 text-[#F1FAEE] border-b border-[#A8DADC]/25">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-[#A8DADC] inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" aria-hidden="true" />
              04 / MANUFACTURING CAPABILITIES
            </span>
            <MaskedHeading
              as="h2"
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.16] tracking-[-0.015em] text-[#F1FAEE]"
            >
              High-Precision Printing Technology
            </MaskedHeading>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#F1FAEE]/80 font-sans">
              State-of-the-art prepress, gravure cylinders, and high-speed flexographic converting lines ensuring micro-dot clarity and vivid shelf presence.
            </p>
          </div>

          <StaggerCardsGrid className="mt-8 md:mt-12 grid grid-cols-1 gap-7 md:gap-9 md:grid-cols-3">
            {printingCapabilities.map((cap, idx) => (
              <StaggerCard key={cap.title} index={idx}>
                <div
                  className="flex flex-col justify-between rounded-lg border border-[#A8DADC]/25 bg-[#F1FAEE]/[0.04] p-6 md:p-8 transition-colors duration-300 ease-in-out hover:border-[#A8DADC] hover:bg-[#F1FAEE]/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.18)] h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#A8DADC] tracking-wider">
                        PROCESS 0{idx + 1}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-[#A8DADC]/35 bg-[#A8DADC]/10 px-2.5 py-0.5 text-xs font-mono font-medium text-[#A8DADC]">
                        Certified Process
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl md:text-2xl font-display font-bold leading-[1.2] tracking-[-0.01em] text-[#F1FAEE]">
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#F1FAEE]/80 leading-relaxed font-sans">
                      {cap.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#A8DADC]/20 pt-4 flex items-center gap-2 font-mono text-xs text-[#A8DADC]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A8DADC]" />
                    <span>{cap.specTag}</span>
                  </div>
                </div>
              </StaggerCard>
            ))}
          </StaggerCardsGrid>
        </div>
      </section>

      {/* Manufacturing Scale Stats */}
      <Stats />

      {/* Enterprise Client Network — Dual-Row Logo Loop Marquee */}
      <section id="client-network" className="relative overflow-x-clip bg-light-atmosphere border-t border-powder py-16 md:py-24 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10 md:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-powder/40 pb-8">
            <div>
              <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-[#457B9D] inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" aria-hidden="true" />
                06 / CLIENT NETWORK • VERIFIED PARTNERS
              </span>
              <MaskedHeading
                as="h2"
                className="text-[clamp(2rem,4vw,3.25rem)] font-display font-bold leading-[1.15] tracking-[-0.015em] text-[#1D3557]"
              >
                Enterprise Client Network
              </MaskedHeading>
            </div>
            <div className="sm:text-right">
              <span className="font-mono text-xs text-[#457B9D] uppercase tracking-wider block font-bold">
                16 VERIFIED PARTNERS • DOMESTIC &amp; EXPORT
              </span>
              <p className="max-w-[44ch] text-xs sm:text-sm text-[#1D3557]/70 mt-1">
                Supplying verified packaging to domestic corporations and international export growers.
              </p>
            </div>
          </div>
        </div>

        {/* Dual-Row Counter-Scrolling Logo Loop — Full-Bleed Between Hairlines */}
        <EnterpriseClientMarquee />
      </section>

      {/* Frequently Asked Questions */}
      <HomeFAQ />

      {/* Interactive Production Quote Modal */}
      <QuoteModal />
    </div>
  );
}
