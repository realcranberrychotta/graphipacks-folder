"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  company,
  timeline,
  printingCapabilities,
  clients,
} from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import TimelineScroll from "@/components/TimelineScroll";

export const metadata: Metadata = {
  title: "About Us & Four Decades of Heritage | Graphipacks Private Limited",
  description:
    "Established in 1984 in Madurai, Graphipacks Private Limited brings 40+ years of industrial polymer extrusion, technical packaging engineering, and trusted B2B manufacturing.",
  openGraph: {
    title: "About Us & Four Decades of Heritage | Graphipacks Private Limited",
    description:
      "Established in 1984 in Madurai, Graphipacks Private Limited brings 40+ years of industrial polymer extrusion, technical packaging engineering, and trusted B2B manufacturing.",
  },
};

export default async function AboutPage() {
  cacheLife("days");

  return (
    <div className="flex flex-col bg-background text-ink">
      {/* Section 01: Hero - Soft Linen Editorial Header */}
      <header className="relative overflow-hidden bg-light-atmosphere-alt border-b border-powder pt-28 pb-14 md:pt-32 md:pb-16 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[#457B9D] mb-4">
              <span className="h-2 w-2 rounded-full bg-[#E63946] shrink-0" aria-hidden="true" />
              <span>ESTABLISHED 1984 &bull; FOUR DECADES OF HERITAGE</span>
            </span>

            <h1 className="font-display font-bold text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[1.04] tracking-[-0.02em] text-[#1D3557] [text-wrap:balance] max-w-4xl mx-auto">
              About {company.name}
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-sans font-medium text-heritage max-w-2xl mx-auto">
              {company.tagline}
            </p>

            <p className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed text-[#1D3557]/85 max-w-2xl mx-auto font-sans">
              {company.about}
            </p>

            {/* Leadership Badge */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-xl border border-ink/10 bg-background px-4 py-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-heritage text-background font-bold text-sm">
                  ED
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-steel">
                    Executive Leadership
                  </span>
                  <span className="text-base font-bold text-ink">
                    {company.executiveDirector}
                  </span>
                  <span className="text-xs text-ink/75 ml-2 font-sans">Executive Director</span>
                </div>
              </div>
            </div>

            {/* Core Specializations */}
            <div className="mt-8 w-full border-t border-powder/40 pt-6">
              <span className="block text-center text-xs font-mono uppercase tracking-wider text-steel">
                Core Converting &amp; Printing Specializations
              </span>
              <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-ink text-left">
                {company.specializations.map((spec, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-ink/10 bg-background p-3.5 hover:border-steel transition-colors"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-steel"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium text-ink">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="btn-press inline-flex items-center justify-center rounded-md bg-navy hover:bg-navy/90 px-6 py-3.5 text-sm font-bold text-background transition-colors"
              >
                Contact Leadership Team &rarr;
              </Link>
              <Link
                href="/products"
                className="btn-press inline-flex items-center justify-center rounded-md border border-ink/20 bg-background px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
              >
                Explore Product Specs
              </Link>
            </div>
          </div>

          {/* Madurai Plant Visual Proof Strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                src: "/images/infrastructure/infra-03-rotogravure-cylinders.jpg",
                alt: "8-colour rotogravure printing cylinders inside Graphipacks Madurai facility",
                label: "8-Colour Rotogravure Press",
              },
              {
                src: "/images/infrastructure/infra-02-film-lamination-rollers.jpg",
                alt: "Multi-layer blown film and lamination rollers in Madurai plant",
                label: "Multi-Layer Film Extrusion",
              },
              {
                src: "/images/infrastructure/infra-05-packing-conveyor.jpg",
                alt: "Automated wicketting and packing conveyor line at Graphipacks",
                label: "Automated Converting & Dispatch",
              },
            ].map((photo) => (
              <figure
                key={photo.src}
                className="overflow-hidden rounded-lg border border-powder/60 bg-background"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wider text-steel border-t border-powder/40">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </header>

      {/* Section 02: Commitments - Honeydew Atmospheric Section */}
      <section className="relative overflow-hidden bg-light-atmosphere border-b border-powder py-24 md:py-32 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
              01 / OPERATIONAL VALUES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.15] tracking-[-0.015em] text-ink">
              Our Corporate Commitments
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75 font-sans">
              Every extrusion batch, laminate reel, and pre-formed pouch is produced under strict quality discipline and direct customer accountability.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {company.commitments.map((commitment, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div
                  className="relative flex flex-col justify-between rounded-lg border border-powder/50 bg-background p-6 md:p-8 transition-colors duration-200 hover:border-steel h-full"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-powder bg-surface font-mono text-sm font-bold text-navy">
                      0{idx + 1}
                    </div>
                    <h3 className="mt-4 text-lg md:text-xl font-display font-bold leading-[1.2] text-ink">
                      {commitment}
                    </h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ink/10 flex items-center gap-2 text-xs font-semibold text-steel">
                    <span className="h-1.5 w-1.5 rounded-full bg-steel" />
                    <span>Verified Standard</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03: Heritage Timeline 1984–2016 (Pinned Scroll Sequence) */}
      <TimelineScroll timeline={timeline} />

      {/* Section 04: Printing & Extrusion Capabilities + Client Ecosystem */}
      <section className="relative overflow-hidden bg-light-atmosphere-alt border-t border-powder py-24 md:py-32 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Capabilities subsection */}
          <div className="max-w-3xl">
            <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
              03 / MANUFACTURING CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.15] tracking-[-0.015em] text-ink">
              Printing &amp; Extrusion Infrastructure
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75 font-sans">
              High-throughput rotogravure and flexographic conversion machinery equipped for demanding photographic print and high-barrier applications.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 gap-7 md:gap-9 md:grid-cols-3">
            {printingCapabilities.map((cap, idx) => (
              <ScrollReveal key={cap.title} delay={idx * 0.08}>
                <div
                  className="flex flex-col justify-between rounded-lg border border-powder/50 bg-background p-6 md:p-8 h-full hover:border-steel transition-colors duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-steel">
                        SYSTEM 0{idx + 1}
                      </span>
                      <span className="rounded-full border border-powder bg-surface px-2.5 py-0.5 text-xs font-mono font-medium text-ink">
                        Online Capacity
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl md:text-2xl font-display font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink/75 leading-relaxed font-sans">
                      {cap.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-ink/10 pt-3 font-mono text-xs text-steel font-medium">
                    {cap.specTag}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Client Ecosystem subsection */}
          <div className="mt-24 md:mt-32 border-t border-powder/40 pt-16 md:pt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
                  04 / CLIENT NETWORK
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.15] tracking-[-0.015em] text-ink">
                  Client Ecosystem &amp; B2B Trust
                </h2>
              </div>
              <p className="max-w-[44ch] text-[15px] md:text-base leading-[1.7] text-ink/75 sm:text-right font-sans">
                Partnering with top food brands, horticultural substrate exporters, and automated packaging converters.
              </p>
            </div>

            <div className="mt-12 md:mt-16 space-y-8">
              {clients.map((categoryGroup, idx) => (
                <ScrollReveal key={categoryGroup.category} delay={idx * 0.08}>
                  <div
                    className="rounded-2xl border border-powder/50 bg-surface p-6"
                  >
                    <div className="flex items-center gap-3 border-b border-powder/40 pb-3">
                      <span className="h-2 w-2 rounded-full bg-navy" />
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                        {categoryGroup.category}
                      </h3>
                      <span className="ml-auto rounded-full border border-powder bg-background px-2.5 py-0.5 text-xs font-semibold text-ink">
                        {categoryGroup.clients.length} Accounts
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                      {categoryGroup.clients.map((client) => (
                        <div
                          key={client}
                          className="flex min-h-[60px] items-center justify-center rounded-lg border border-powder/40 bg-background p-3 text-center transition-colors duration-200 hover:border-steel hover:bg-background"
                        >
                          <span className="text-sm font-semibold text-ink tracking-tight">
                            {client}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Quote CTA (Dark Navy Statement Band) */}
      <section className="relative overflow-hidden bg-royal-band border-t border-powder/30 py-24 md:py-32 text-background">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-powder mb-4">
                PLANT TECHNICAL CONSULTATION &bull; EST. 1984
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold leading-[1.15] tracking-[-0.015em] text-background">
                Discuss Your Technical Specifications
              </h2>
              <p className="mt-4 max-w-[60ch] text-[15px] md:text-base leading-[1.7] text-background/80 font-sans">
                Contact our leadership and production managers to request custom samples, evaluate tensile/barrier data, and receive manufacturing lead times.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-press inline-flex items-center justify-center rounded-md bg-red hover:bg-[#d62839] px-6 py-3.5 text-sm font-bold text-background transition-colors duration-200"
              >
                Inquire Directly &rarr;
              </Link>
              <Link
                href="/products"
                className="btn-press inline-flex items-center justify-center rounded-md border border-powder/50 bg-transparent px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-powder/15"
              >
                View All 6 Product Lines
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
