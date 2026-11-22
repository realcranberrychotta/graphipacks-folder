"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/content";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Plant & Commercial Sales | Graphipacks Private Limited",
  description:
    "Connect directly with Graphipacks plant engineers and B2B commercial sales in Madurai for custom polymer extrusion gauges, sample roll dispatches, and wholesale contract pricing.",
  openGraph: {
    title: "Contact Plant & Commercial Sales | Graphipacks Private Limited",
    description:
      "Connect directly with Graphipacks plant engineers and B2B commercial sales in Madurai for custom polymer extrusion gauges, sample roll dispatches, and wholesale contract pricing.",
  },
};

export default async function ContactPage() {
  cacheLife("days");

  const phone = process.env.CONTACT_PHONE || "+91 (0) 1234 567890";
  const email = process.env.CONTACT_EMAIL || "info@graphipacks.com";
  const address =
    process.env.CONTACT_ADDRESS || "Industrial Area, Phase II, Madurai, Tamil Nadu, India";
  const whatsappUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER || ""}?text=Hello%20Graphipacks`;

  return (
    <div className="flex flex-col bg-[#F6F2EB] text-[#1C1917]">
      {/* Editorial Header Section on Light Atmosphere */}
      <header className="relative overflow-hidden bg-light-atmosphere border-b border-[#A6864C]/25 pt-32 pb-20 md:pt-40 md:pb-28 text-[#1C1917]">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#A6864C] mb-4">
              DIRECT MANUFACTURING INQUIRIES &bull; EST. 1984
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-normal leading-[1.06] tracking-[-0.025em] text-[#1C1917] font-serif">
              Contact Graphipacks
            </h1>
            <p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#57524E] font-sans">
              Connect directly with our plant engineers and commercial sales team for custom film gauges, sample requests, and wholesale B2B contract pricing.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content: Clean Two-Column Industrial Layout */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact info & prominent WhatsApp link */}
          <div className="lg:col-span-5 space-y-8">
            {/* Corporate & Factory Contact Details */}
            <section className="rounded-2xl border border-[#1C1917]/10 bg-[#FBF9F5] p-6 md:p-8 text-[#1C1917]">
              <div className="flex items-center gap-3 border-b border-[#1C1917]/10 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3D0E18] font-mono text-sm font-extrabold text-[#F6F2EB]">
                  HQ
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-normal leading-[1.2] tracking-[-0.015em] text-[#1C1917] font-serif">
                    Manufacturing Plant &amp; HQ
                  </h2>
                  <p className="text-xs text-[#A6864C]">{company.tagline}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A6864C] block">
                    Registered Entity
                  </span>
                  <p className="mt-1 font-bold text-[#1C1917] text-base">
                    {company.name}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A6864C] block">
                    Leadership Direction
                  </span>
                  <p className="mt-1 text-[#57524E]">
                    Executive Director:{" "}
                    <span className="font-semibold text-[#1C1917]">
                      {company.executiveDirector}
                    </span>
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A6864C] block">
                    Factory &amp; Registered Address
                  </span>
                  <p className="mt-1 text-[#57524E] leading-relaxed">
                    {address}
                  </p>
                </div>

                <div className="border-t border-[#1C1917]/10 pt-5 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A6864C] block">
                      Direct Telephone Line
                    </span>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="mt-1 block font-mono text-base font-semibold text-[#1C1917] hover:text-[#3D0E18] transition-colors duration-200 ease-in-out"
                    >
                      {phone}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A6864C] block">
                      Official Inquiries Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 block text-base font-semibold text-[#1C1917] hover:text-[#3D0E18] transition-colors duration-200 ease-in-out"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Prominent WhatsApp Direct Chat Card */}
            <section className="rounded-2xl border border-[#1C1917]/10 bg-[#FBF9F5] p-6 md:p-8 text-[#1C1917]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE6DA] text-[#3D0E18] border border-[#A6864C]/30">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.767-5.77-5.767zm0 10.364c-.878 0-1.637-.246-2.316-.67l-.165-.104-1.58.414.422-1.541-.107-.171a4.582 4.582 0 01-.703-2.459c.001-2.531 2.06-4.59 4.591-4.59 2.531 0 4.59 2.059 4.59 4.59 0 2.532-2.059 4.591-4.59 4.591z"/>
                    <path d="M12.012 2c-5.508 0-9.988 4.479-9.99 9.988 0 1.936.556 3.753 1.543 5.305l-1.565 5.707 5.86-1.537c1.492.814 3.187 1.258 4.939 1.259 5.509 0 9.99-4.479 9.991-9.988 0-5.509-4.48-9.989-9.991-9.989zm.019 18.172c-1.558 0-3.049-.418-4.346-1.189l-.312-.185-3.23.847.862-3.149-.204-.325c-.848-1.349-1.297-2.92-1.297-4.536 0-4.73 3.848-8.578 8.579-8.578 4.73 0 8.577 3.848 8.578 8.578 0 4.73-3.848 8.578-8.579 8.578z"/>
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-normal leading-[1.2] tracking-[-0.015em] text-[#1C1917] font-serif">
                    Instant WhatsApp Support
                  </h3>
                  <p className="text-xs text-[#A6864C]">
                    Connect directly with our commercial team
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[15px] text-[#57524E] leading-[1.7] font-sans">
                Need quick clarification on extrusion capacity, minimum order quantities (MOQ), or export dispatch schedules? Message our sales desk instantly on WhatsApp.
              </p>

              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#3D0E18] hover:bg-[#27080F] border border-[#A6864C]/30 px-6 py-4 text-base font-bold text-[#F6F2EB] transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-[#3D0E18] focus:ring-offset-2 text-center"
                >
                  <svg className="h-5 w-5 fill-current text-[#A6864C] shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.767-5.77-5.767zm0 10.364c-.878 0-1.637-.246-2.316-.67l-.165-.104-1.58.414.422-1.541-.107-.171a4.582 4.582 0 01-.703-2.459c.001-2.531 2.06-4.59 4.591-4.59 2.531 0 4.59 2.059 4.59 4.59 0 2.532-2.059 4.591-4.59 4.591z"/>
                    <path d="M12.012 2c-5.508 0-9.988 4.479-9.99 9.988 0 1.936.556 3.753 1.543 5.305l-1.565 5.707 5.86-1.537c1.492.814 3.187 1.258 4.939 1.259 5.509 0 9.99-4.479 9.991-9.988 0-5.509-4.48-9.989-9.991-9.989zm.019 18.172c-1.558 0-3.049-.418-4.346-1.189l-.312-.185-3.23.847.862-3.149-.204-.325c-.848-1.349-1.297-2.92-1.297-4.536 0-4.73 3.848-8.578 8.579-8.578 4.73 0 8.577 3.848 8.578 8.578 0 4.73-3.848 8.578-8.579 8.578z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </section>
          </div>

          {/* Right Column: Interactive B2B Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Technical Support Callout */}
        <section className="relative overflow-hidden bg-light-atmosphere-alt mt-24 md:mt-32 rounded-2xl border border-[#A6864C]/30 p-8 md:p-12 text-[#1C1917]">
          <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="block text-[11px] uppercase tracking-[0.22em] font-medium text-[#A6864C] mb-4">
                EXPLORE FULL RANGE &bull; EST. 1984
              </span>
              <h3 className="text-2xl md:text-3xl font-normal leading-[1.2] tracking-[-0.02em] text-[#1C1917] font-serif">
                Looking for technical datasheets or sample rolls?
              </h3>
              <p className="mt-3 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-[#57524E] font-sans">
                Review our agricultural mulch films, dual-tone grow bags, high-barrier laminates, and wicketed poly bag specifications.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center shrink-0 rounded-lg bg-[#3D0E18] hover:bg-[#27080F] px-6 py-3.5 text-sm font-bold text-[#F6F2EB] transition-colors duration-200 ease-in-out text-center"
            >
              Browse Catalog &rarr;
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
