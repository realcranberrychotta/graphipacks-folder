"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";

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
import {
  company,
  timeline,
  printingTechnology,
  clients,
} from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import TimelineScroll from "@/components/TimelineScroll";

export default async function AboutPage() {
  cacheLife("days");

  return (
    <div className="flex flex-col bg-transparent text-[#F8F4EC]">
      {/* Section 01: Hero - Shader Glassmorphism Header */}
      <header className="relative overflow-hidden border-b border-[#B08D57]/25 border-t-[#B08D57]/20 bg-[#0F2A44]/60 backdrop-blur-xl md:backdrop-blur-2xl py-24 text-[#F8F4EC] sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,141,87,0.18),transparent_50%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#B08D570a_1px,transparent_1px),linear-gradient(to_bottom,#B08D570a_1px,transparent_1px)] bg-[size:4rem_4rem]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-full border border-[#B08D57]/40 bg-[#1B3D5E]/50 px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono uppercase tracking-wide text-[#F8F4EC] shadow-sm max-w-full">
              <span className="h-2 w-2 rounded-full bg-[#B08D57] animate-pulse shrink-0" />
              <span>Established 1984 &bull; Four Decades of Converting Expertise</span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8F4EC]">
              About {company.name}
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-medium bg-gradient-to-r from-[#F8F4EC] via-[#B08D57] to-[#C9A96E] bg-clip-text text-transparent">
              {company.tagline}
            </p>

            <p className="mt-4 max-w-3xl text-sm sm:text-base lg:text-lg text-[#EFE8DC]/85 leading-relaxed">
              {company.about}
            </p>

            {/* Leadership Badge */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-3 rounded-xl border border-[#B08D57]/30 bg-[#091B2C]/70 px-4 py-3 backdrop-blur-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#B08D57] text-[#091B2C] font-bold text-sm shadow-xs">
                ED
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#B08D57]">
                  Executive Leadership
                </span>
                <span className="text-base font-bold text-[#F8F4EC]">
                  {company.executiveDirector}
                </span>
                <span className="text-xs text-[#EFE8DC]/80 ml-2">Executive Director</span>
              </div>
            </div>

            {/* Core Specializations */}
            <div className="mt-8 border-t border-[#B08D57]/20 pt-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B08D57]">
                Core Converting &amp; Printing Specializations
              </span>
              <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-[#F8F4EC]">
                {company.specializations.map((spec, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-[#B08D57]/20 border-t-[#B08D57]/35 bg-[#0F2A44]/50 backdrop-blur-xl p-3.5"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-[#B08D57]"
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
                    <span className="font-medium text-[#F8F4EC]">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-sm font-bold text-[#091B2C] shadow-lg shadow-[#B08D57]/25 transition"
              >
                Contact Leadership Team &rarr;
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg border border-[#B08D57]/45 bg-[#0F2A44]/60 px-6 py-3.5 text-sm font-semibold text-[#F8F4EC] transition hover:bg-[#1B3D5E]/60"
              >
                Explore Product Specs
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Section 02: Commitments - Glassmorphism Container */}
      <section className="border-b border-[#B08D57]/20 bg-[#0F2A44]/30 backdrop-blur-xl py-24 sm:py-28 text-[#F8F4EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              01 — Operational Values
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F8F4EC]">
              Our Corporate Commitments
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#EFE8DC]/85 leading-relaxed">
              Every extrusion batch, laminate reel, and pre-formed pouch is produced under strict quality discipline and direct customer accountability.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {company.commitments.map((commitment, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div
                  className="relative flex flex-col justify-between rounded-xl border border-[#B08D57]/20 border-t-[#B08D57]/35 bg-[#0F2A44]/50 backdrop-blur-xl md:backdrop-blur-2xl p-6 shadow-xl transition hover:border-[#B08D57]/50 h-full"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#B08D57]/40 bg-[#1B3D5E]/50 font-mono text-sm font-bold text-[#B08D57]">
                      0{idx + 1}
                    </div>
                    <h3 className="mt-4 text-base font-bold text-[#F8F4EC] leading-snug">
                      {commitment}
                    </h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#B08D57]/20 flex items-center gap-2 text-xs font-semibold text-[#B08D57]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
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
      <section className="border-t border-[#B08D57]/20 bg-[#0F2A44]/30 backdrop-blur-xl py-24 sm:py-28 text-[#F8F4EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Capabilities subsection */}
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              03 — Manufacturing Capabilities
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F8F4EC]">
              Printing &amp; Extrusion Infrastructure
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#EFE8DC]/85 leading-relaxed">
              High-throughput rotogravure and flexographic conversion machinery equipped for demanding photographic print and high-barrier applications.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {printingTechnology.map((tech, idx) => (
              <ScrollReveal key={tech} delay={idx * 0.08}>
                <div
                  className="flex flex-col justify-between rounded-xl border border-[#B08D57]/20 border-t-[#B08D57]/35 bg-[#0F2A44]/50 backdrop-blur-xl md:backdrop-blur-2xl p-6 shadow-xl h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#B08D57]">
                        SYSTEM 0{idx + 1}
                      </span>
                      <span className="rounded-full border border-[#B08D57]/30 bg-[#1B3D5E]/50 px-2.5 py-0.5 text-xs font-semibold text-[#F8F4EC]">
                        Online Capacity
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[#F8F4EC]">
                      {tech}
                    </h3>
                    <p className="mt-2 text-sm text-[#EFE8DC]/85">
                      Engineered for continuous tension control, precision solvent and water ink transfer, and substrate versatility across PE, PP, and multi-layer laminates.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#B08D57]/20 pt-3 text-xs text-[#EFE8DC]/70 font-medium">
                    Controlled cylinder &amp; plate registration
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Client Ecosystem subsection */}
          <div className="mt-20 border-t border-[#B08D57]/20 pt-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
                  04 — Client Network
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#F8F4EC] sm:text-4xl">
                  Client Ecosystem &amp; B2B Trust
                </h2>
              </div>
              <p className="text-sm text-[#EFE8DC]/70 sm:text-right max-w-sm">
                Partnering with top food brands, horticultural substrate exporters, and automated packaging converters.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              {clients.map((categoryGroup, idx) => (
                <ScrollReveal key={categoryGroup.category} delay={idx * 0.08}>
                  <div
                    className="rounded-2xl border border-[#B08D57]/20 border-t-[#B08D57]/35 bg-[#0F2A44]/50 backdrop-blur-xl md:backdrop-blur-2xl p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-3 border-b border-[#B08D57]/20 pb-3">
                      <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#F8F4EC]">
                        {categoryGroup.category}
                      </h3>
                      <span className="ml-auto rounded-full border border-[#B08D57]/25 bg-[#1B3D5E]/60 px-2.5 py-0.5 text-xs font-semibold text-[#F8F4EC]">
                        {categoryGroup.clients.length} Accounts
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                      {categoryGroup.clients.map((client) => (
                        <div
                          key={client}
                          className="flex min-h-[60px] items-center justify-center rounded-lg border border-[#B08D57]/20 bg-[#091B2C]/50 p-3 text-center transition hover:border-[#B08D57]/60 hover:bg-[#091B2C]/80 shadow-xs"
                        >
                          <span className="text-sm font-semibold text-[#F8F4EC] tracking-tight">
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

      {/* Bottom Quote CTA */}
      <section className="border-t border-[#B08D57]/25 bg-[#091B2C]/90 backdrop-blur-2xl py-20 text-[#F8F4EC]">
        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F8F4EC]">
                Discuss Your Technical Specifications
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#EFE8DC]/85 leading-relaxed">
                Contact our leadership and production managers to request custom samples, evaluate tensile/barrier data, and receive manufacturing lead times.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-sm font-bold text-[#091B2C] shadow-lg shadow-[#B08D57]/25 transition"
              >
                Inquire Directly &rarr;
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg border border-[#B08D57]/45 bg-[#0F2A44]/60 px-6 py-3.5 text-sm font-semibold text-[#F8F4EC] transition hover:bg-[#1B3D5E]/60"
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
