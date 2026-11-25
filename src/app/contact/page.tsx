"use cache";

import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/content";
import ContactForm from "@/components/ContactForm";
import MaskedHeading from "@/components/ui/masked-heading";

export const metadata: Metadata = {
  title: "Contact Plant & Commercial Sales | Graphipackss Private Limited",
  description:
    "Connect directly with Graphipackss plant engineers and B2B commercial sales in Madurai for custom polymer extrusion gauges, sample roll dispatches, and wholesale contract pricing.",
  openGraph: {
    title: "Contact Plant & Commercial Sales | Graphipackss Private Limited",
    description:
      "Connect directly with Graphipackss plant engineers and B2B commercial sales in Madurai for custom polymer extrusion gauges, sample roll dispatches, and wholesale contract pricing.",
  },
};

export default async function ContactPage() {
  cacheLife("days");

  const phone = (process.env.NEXT_PUBLIC_CONTACT_PHONE || process.env.CONTACT_PHONE || "").trim();
  const email = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_EMAIL || "info@graphipacks.com").trim();
  const address = (
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS ||
    process.env.CONTACT_ADDRESS ||
    "Madurai, Tamil Nadu, India"
  ).trim();
  const whatsappDigits = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.WHATSAPP_NUMBER ||
    ""
  ).replace(/\D/g, "");
  const whatsappUrl = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=Hello%20Graphipackss`
    : "";

  return (
    <div className="flex flex-col bg-background text-ink">
      {/* Editorial Header Section on Light Atmosphere */}
      <header className="relative overflow-hidden bg-light-atmosphere border-b border-powder pt-28 pb-14 md:pt-32 md:pb-16 text-ink">
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[#457B9D] mb-4">
              <span className="h-2 w-2 rounded-full bg-[#E63946] shrink-0" aria-hidden="true" />
              <span>DIRECT MANUFACTURING INQUIRIES &bull; EST. 1984</span>
            </span>
            <MaskedHeading
              as="h1"
              className="font-display font-bold text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[1.04] tracking-[-0.02em] text-[#1D3557] [text-wrap:balance] max-w-4xl mx-auto"
            >
              Contact Graphipackss
            </MaskedHeading>
            <p className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed text-[#1D3557]/85 max-w-2xl mx-auto font-sans">
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
            <section className="rounded-2xl border border-ink/10 bg-background p-6 md:p-8 text-ink">
              <div className="flex items-center gap-3 border-b border-ink/10 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-heritage font-mono text-sm font-extrabold text-background">
                  HQ
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                    Manufacturing Plant &amp; HQ
                  </h2>
                  <p className="text-xs text-steel">{company.tagline}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-steel block">
                    Registered Entity
                  </span>
                  <p className="mt-1 font-bold text-ink text-base">
                    {company.name}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-steel block">
                    Leadership Direction
                  </span>
                  <p className="mt-1 text-ink/75">
                    Executive Director:{" "}
                    <span className="font-semibold text-ink">
                      {company.executiveDirector}
                    </span>
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-steel block">
                    Factory &amp; Registered Address
                  </span>
                  <p className="mt-1 text-ink/75 leading-relaxed">
                    {address}
                  </p>
                </div>

                <div className="border-t border-ink/10 pt-5 space-y-4">
                  {phone && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-steel block">
                        Direct Telephone Line
                      </span>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="mt-1 block font-mono text-base font-semibold text-ink hover:text-heritage transition-colors duration-200 ease-in-out"
                      >
                        {phone}
                      </a>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-steel block">
                      Official Inquiries Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 block text-base font-semibold text-ink hover:text-heritage transition-colors duration-200 ease-in-out"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Direct Desk / WhatsApp Card */}
            {whatsappUrl ? (
              <section className="rounded-2xl border border-ink/10 bg-background p-6 md:p-8 text-ink">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-surface text-navy border border-powder">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.767-5.77-5.767zm0 10.364c-.878 0-1.637-.246-2.316-.67l-.165-.104-1.58.414.422-1.541-.107-.171a4.582 4.582 0 01-.703-2.459c.001-2.531 2.06-4.59 4.591-4.59 2.531 0 4.59 2.059 4.59 4.59 0 2.532-2.059 4.591-4.59 4.591z"/>
                      <path d="M12.012 2c-5.508 0-9.988 4.479-9.99 9.988 0 1.936.556 3.753 1.543 5.305l-1.565 5.707 5.86-1.537c1.492.814 3.187 1.258 4.939 1.259 5.509 0 9.99-4.479 9.991-9.988 0-5.509-4.48-9.989-9.991-9.989zm.019 18.172c-1.558 0-3.049-.418-4.346-1.189l-.312-.185-3.23.847.862-3.149-.204-.325c-.848-1.349-1.297-2.92-1.297-4.536 0-4.73 3.848-8.578 8.579-8.578 4.73 0 8.577 3.848 8.578 8.578 0 4.73-3.848 8.578-8.579 8.578z"/>
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                      Instant WhatsApp Support
                    </h3>
                    <p className="text-xs text-steel">
                      Connect directly with our commercial team
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[15px] text-ink/75 leading-[1.7] font-sans">
                  Need quick clarification on extrusion capacity, minimum order quantities (MOQ), or export dispatch schedules? Message our sales desk instantly on WhatsApp.
                </p>

                <div className="mt-6">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-navy hover:bg-steel border border-powder px-6 py-4 text-base font-bold text-background transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-navy focus:ring-offset-2 text-center"
                  >
                    <svg className="h-5 w-5 fill-current text-powder shrink-0" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.767-5.77-5.767zm0 10.364c-.878 0-1.637-.246-2.316-.67l-.165-.104-1.58.414.422-1.541-.107-.171a4.582 4.582 0 01-.703-2.459c.001-2.531 2.06-4.59 4.591-4.59 2.531 0 4.59 2.059 4.59 4.59 0 2.532-2.059 4.591-4.59 4.591z"/>
                      <path d="M12.012 2c-5.508 0-9.988 4.479-9.99 9.988 0 1.936.556 3.753 1.543 5.305l-1.565 5.707 5.86-1.537c1.492.814 3.187 1.258 4.939 1.259 5.509 0 9.99-4.479 9.991-9.988 0-5.509-4.48-9.989-9.991-9.989zm.019 18.172c-1.558 0-3.049-.418-4.346-1.189l-.312-.185-3.23.847.862-3.149-.204-.325c-.848-1.349-1.297-2.92-1.297-4.536 0-4.73 3.848-8.578 8.579-8.578 4.73 0 8.577 3.848 8.578 8.578 0 4.73-3.848 8.578-8.579 8.578z"/>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </section>
            ) : (
              <section className="rounded-2xl border border-ink/10 bg-background p-6 md:p-8 text-ink">
                <h3 className="text-xl md:text-2xl font-display font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                  Commercial Sales Desk
                </h3>
                <p className="mt-3 text-[15px] text-ink/75 leading-[1.7] font-sans">
                  Submit your required film structure, bag dimensions, and quantity in the quote builder or book a direct engineering consultation below for a callback within one working day.
                </p>
                <div className="mt-6">
                  <a
                    href="#book-your-call"
                    className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy hover:bg-steel border border-powder px-6 py-3.5 text-sm font-bold text-background transition-colors duration-200 ease-in-out"
                  >
                    <span>Schedule Engineering Call &rarr;</span>
                  </a>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Interactive B2B Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Book Your Call - Embedded Google Calendar Booking Section */}
        <section
          id="book-your-call"
          aria-labelledby="booking-heading"
          className="mt-16 md:mt-24 rounded-2xl border border-ink/10 bg-background p-6 sm:p-8 md:p-12 text-ink"
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-3">
              DIRECT APPOINTMENTS &bull; INSTANT SCHEDULING
            </span>
            <h2
              id="booking-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-[1.15] tracking-[-0.015em] text-ink"
            >
              Book your call
            </h2>
            <p className="mt-3 text-[15px] md:text-base leading-[1.7] text-ink/75 font-sans">
              Schedule a direct consultation with our plant engineering and commercial sales team at a time that suits you.
            </p>
          </div>

          {/* Embedded Google Calendar Iframe */}
          <div className="mt-8 flex justify-center w-full">
            <iframe
              src="https://calendar.app.google/q5BNs2SnLmeR4kNH7"
              title="Book your call"
              className="w-full md:w-[640px] h-[600px] border-0 rounded-xl bg-white shadow-sm"
              width="100%"
              height="600"
            />
          </div>

          {/* Fallback below the iframe */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <p className="text-xs text-ink/75">
              If Google blocks the embed or the calendar does not load:
            </p>
            <a
              href="https://calendar.app.google/q5BNs2SnLmeR4kNH7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-md bg-navy hover:bg-steel border border-powder px-6 py-3.5 text-xs sm:text-sm font-bold text-background transition-colors duration-200 ease-in-out shadow-sm focus:outline-hidden focus:ring-2 focus:ring-navy focus:ring-offset-2"
            >
              <span>Open booking in a new tab &rarr;</span>
            </a>
          </div>
        </section>

        {/* Technical Support Callout */}
        <section className="relative overflow-hidden bg-light-atmosphere-alt mt-24 md:mt-32 rounded-2xl border border-powder p-8 md:p-12 text-ink">
          <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel mb-4">
                EXPLORE FULL RANGE &bull; EST. 1984
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold leading-[1.2] tracking-[-0.015em] text-ink">
                Looking for technical datasheets or sample rolls?
              </h3>
              <p className="mt-3 max-w-[62ch] text-[15px] md:text-base leading-[1.7] text-ink/75 font-sans">
                Review our agricultural mulch films, dual-tone grow bags, high-barrier laminates, and wicketted poly bag specifications.
              </p>
            </div>
            <Link
              href="/products"
              className="btn-press inline-flex items-center justify-center shrink-0 rounded-md bg-red hover:bg-[#d62839] px-6 py-3.5 text-sm font-bold text-background transition-colors duration-200 ease-in-out text-center"
            >
              Browse Catalog &rarr;
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
