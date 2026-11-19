"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Plant & Commercial Sales | Graphipacks Private Limited",
  description:
    "Connect directly with Graphipacks plant engineers and B2B commercial sales in Coimbatore for custom polymer extrusion gauges, sample roll dispatches, and wholesale contract pricing.",
  openGraph: {
    title: "Contact Plant & Commercial Sales | Graphipacks Private Limited",
    description:
      "Connect directly with Graphipacks plant engineers and B2B commercial sales in Coimbatore for custom polymer extrusion gauges, sample roll dispatches, and wholesale contract pricing.",
  },
};
import { company } from "@/lib/content";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
  cacheLife("days");

  const phone = process.env.CONTACT_PHONE || "+91 (0) 1234 567890";
  const email = process.env.CONTACT_EMAIL || "info@graphipacks.com";
  const address =
    process.env.CONTACT_ADDRESS || "Industrial Area, Phase II, Coimbatore, Tamil Nadu, India";
  const whatsappUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER || ""}?text=Hello%20Graphipacks`;

  return (
    <div className="flex flex-col bg-transparent text-[#F8F4EC]">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-[#B08D57]/20 border-t-[#B08D57]/30 bg-[#0F2A44]/60 backdrop-blur-xl md:backdrop-blur-2xl py-20 text-[#F8F4EC] sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,141,87,0.18),transparent_50%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#B08D570a_1px,transparent_1px),linear-gradient(to_bottom,#B08D570a_1px,transparent_1px)] bg-[size:4rem_4rem]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/40 bg-[#1B3D5E]/40 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#F8F4EC] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
              <span>Direct Manufacturing Inquiries</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-[#F8F4EC]">
              Contact Graphipacks
            </h1>
            <p className="mt-3 text-sm sm:text-lg text-[#EFE8DC] leading-relaxed">
              Connect directly with our plant engineers and commercial sales team for custom film gauges, sample requests, and wholesale B2B contract pricing.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content: Clean Two-Column Industrial Layout */}
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact info & prominent WhatsApp link */}
          <div className="lg:col-span-5 space-y-8">
            {/* Corporate & Factory Contact Details */}
            <section className="rounded-2xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl md:backdrop-blur-2xl p-6 sm:p-8 shadow-xl text-[#F8F4EC]">
              <div className="flex items-center gap-3 border-b border-[#B08D57]/20 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#B08D57]/35 bg-[#1B3D5E]/60 font-mono text-sm font-extrabold text-[#F8F4EC]">
                  HQ
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#F8F4EC]">
                    Manufacturing Plant &amp; HQ
                  </h2>
                  <p className="text-xs text-[#B08D57]">{company.tagline}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57] block">
                    Registered Entity
                  </span>
                  <p className="mt-1 font-bold text-[#F8F4EC] text-base">
                    {company.name}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57] block">
                    Leadership Direction
                  </span>
                  <p className="mt-1 text-[#EFE8DC]">
                    Executive Director:{" "}
                    <span className="font-semibold text-[#F8F4EC]">
                      {company.executiveDirector}
                    </span>
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57] block">
                    Factory &amp; Registered Address
                  </span>
                  <p className="mt-1 text-[#EFE8DC] leading-relaxed">
                    {address}
                  </p>
                </div>

                <div className="border-t border-[#B08D57]/20 pt-5 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57] block">
                      Direct Telephone Line
                    </span>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="mt-1 block font-mono text-base font-semibold text-[#F8F4EC] hover:text-[#B08D57] transition"
                    >
                      {phone}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57] block">
                      Official Inquiries Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 block text-base font-semibold text-[#F8F4EC] hover:text-[#B08D57] transition"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Prominent WhatsApp Direct Chat Card */}
            <section className="rounded-2xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl md:backdrop-blur-2xl p-6 sm:p-8 shadow-xl text-[#F8F4EC]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3D5E]/60 text-[#B08D57] border border-[#B08D57]/30 shadow-xs">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.767-5.77-5.767zm0 10.364c-.878 0-1.637-.246-2.316-.67l-.165-.104-1.58.414.422-1.541-.107-.171a4.582 4.582 0 01-.703-2.459c.001-2.531 2.06-4.59 4.591-4.59 2.531 0 4.59 2.059 4.59 4.59 0 2.532-2.059 4.591-4.59 4.591z"/>
                    <path d="M12.012 2c-5.508 0-9.988 4.479-9.99 9.988 0 1.936.556 3.753 1.543 5.305l-1.565 5.707 5.86-1.537c1.492.814 3.187 1.258 4.939 1.259 5.509 0 9.99-4.479 9.991-9.988 0-5.509-4.48-9.989-9.991-9.989zm.019 18.172c-1.558 0-3.049-.418-4.346-1.189l-.312-.185-3.23.847.862-3.149-.204-.325c-.848-1.349-1.297-2.92-1.297-4.536 0-4.73 3.848-8.578 8.579-8.578 4.73 0 8.577 3.848 8.578 8.578 0 4.73-3.848 8.578-8.579 8.578z"/>
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#F8F4EC]">
                    Instant WhatsApp Support
                  </h3>
                  <p className="text-xs text-[#B08D57]">
                    Connect directly with our commercial team
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[#EFE8DC] leading-relaxed">
                Need quick clarification on extrusion capacity, minimum order quantities (MOQ), or export dispatch schedules? Message our sales desk instantly on WhatsApp.
              </p>

              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#091B2C]/80 hover:bg-[#1B3D5E]/60 border border-[#B08D57] px-6 py-4 text-base font-bold text-[#F8F4EC] shadow-md transition hover:scale-[1.01] active:scale-[0.99] focus:outline-hidden focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 text-center"
                >
                  <svg className="h-5 w-5 fill-current text-[#B08D57] shrink-0" viewBox="0 0 24 24">
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
        <section className="mt-16 rounded-2xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-2xl p-8 sm:p-12 text-[#F8F4EC]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B08D57]">
                Explore Full Range
              </span>
              <h3 className="mt-1 text-2xl font-bold text-[#F8F4EC]">
                Looking for technical datasheets or sample rolls?
              </h3>
              <p className="mt-2 text-sm text-[#EFE8DC] max-w-xl">
                Review our agricultural mulch films, dual-tone grow bags, high-barrier laminates, and wicketed poly bag specifications.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center shrink-0 rounded-lg bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-sm font-bold text-[#091B2C] shadow-lg shadow-[#B08D57]/25 transition hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Browse Catalog &rarr;
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
