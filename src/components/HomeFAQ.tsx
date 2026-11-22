"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "Mulch Film: 500 kg. Grow Bags: 5,000 pcs. Coir Pith Bags: 10,000 pcs. Laminated Rolls & Pouches: 500 kg film / 10,000 pouches. PP & LLDPE Bags: 10,000 pcs. Wicked Poly Bags: 25,000 pcs. MOQ varies by product, size, and print — ask for a quote for your exact requirement.",
  },
  {
    question: "How long does an order take?",
    answer:
      "Mulch Film: 10–12 days. Grow Bags: 12–15 days. Coir Pith: 10–14 days. Laminated Rolls & Pouches: 15–18 days. PP & LLDPE Bags: 10–12 days. Wicked Poly Bags: 7–10 days. Lead time starts after artwork approval and advance payment.",
  },
  {
    question: "Can you print our brand / artwork on the bags?",
    answer:
      "Yes — up to 8-colour rotogravure and flexo printing, with electronic cylinder engraving and multi-colour precision ink registration. Send your artwork for a print proof before production.",
  },
  {
    question: "Do you provide samples before a bulk order?",
    answer:
      "Yes — free samples on request, courier charges extra. Samples help you check material, gauge, print, and size before you place a bulk order.",
  },
  {
    question: "What are the payment terms?",
    answer:
      "50% advance, balance before dispatch — for standard orders. Credit terms (30 / 60 days) are available for regular B2B buyers, subject to approval.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "Ex-Madurai, PAN India. Delivery schedule is confirmed with your quote, based on quantity and destination.",
  },
  {
    question: "What materials and structures do you use?",
    answer:
      "Virgin LLDPE + UV Masterbatch for Mulch Film, PP woven laminated for Grow Bags, HDPE woven laminated for Coir Pith, and multi-layer laminates for pouches — e.g. PET 12µ / MET-PET 12µ / LLDPE 80µ, PET + LDPE, PET + BOPP, BOPP + CPP. Full specs are on each product page.",
  },
  {
    question: "How do I get a quote?",
    answer:
      'Use the "Get a Quote" form on this site or the Contact page — tell us the product, size, quantity, and print requirement. Our team will call you within 1 working day.',
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="border-t border-[#B08D57]/20 bg-[#0F2A44] py-20 sm:py-24 text-[#F8F4EC]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            06 / FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#F8F4EC]">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 divide-y divide-[#B08D57]/20 border-y border-[#B08D57]/20">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full min-h-[56px] items-center justify-between py-5 text-left text-base sm:text-lg font-medium text-[#F8F4EC] hover:text-[#B08D57] transition-colors duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#B08D57]"
                >
                  <span className="pr-6 font-serif">{item.question}</span>
                  <span className="shrink-0 flex items-center justify-center h-7 w-7 rounded-full border border-[#B08D57]/30 bg-[#091B2C] text-[#B08D57] transition-colors duration-200">
                    {isOpen ? (
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pt-1 text-sm sm:text-base text-[#EFE8DC]/85 leading-relaxed font-sans">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
