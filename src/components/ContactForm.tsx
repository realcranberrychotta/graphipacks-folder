"use client";

import {
  useState,
  Suspense,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { products } from "@/lib/content";

export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

function getInitialProduct(productParam: string | null): string {
  if (!productParam) return "";
  const match = products.find(
    (p) =>
      p.slug.toLowerCase() === productParam.toLowerCase() ||
      p.name.toLowerCase() === productParam.toLowerCase()
  );
  return match ? match.name : "";
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  const [formData, setFormData] = useState<ContactFormData>(() => ({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    product: getInitialProduct(productParam),
    message: "",
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      product: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="rounded-2xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl md:backdrop-blur-2xl p-5 sm:p-10 shadow-xl text-[#F8F4EC]">
      <div className="border-b border-[#B08D57]/20 pb-5">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B08D57]">
          Direct Sales &amp; Technical Consultation
        </span>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#F8F4EC]">
          Request a Quote &amp; Specifications
        </h2>
        <p className="mt-1 text-sm text-[#EFE8DC]">
          Fill out the details below. Our manufacturing sales engineers respond within 24 hours.
        </p>
      </div>

      {isSubmitted ? (
        <div className="mt-8 rounded-2xl border border-[#B08D57]/30 bg-[#091B2C]/70 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1B3D5E]/60 text-[#B08D57] border border-[#B08D57]/40 shadow-sm">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-[#F8F4EC]">
            Inquiry Submitted Successfully!
          </h3>
          <p className="mt-2 text-base font-semibold text-[#B08D57]">
            Thank you! Our sales team will contact you shortly.
          </p>
          <p className="mt-2 text-xs text-[#EFE8DC] max-w-md mx-auto">
            We have registered your interest in{" "}
            <span className="font-semibold text-[#F8F4EC]">
              {formData.product || "our flexible packaging solutions"}
            </span>
            . One of our plant engineers will review your specs and be in touch soon.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#B08D57]/40 bg-[#091B2C]/60 px-5 py-2.5 text-xs sm:text-sm font-bold text-[#F8F4EC] shadow-sm hover:bg-[#1B3D5E]/40 transition cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold uppercase tracking-wider text-[#F8F4EC]/80"
              >
                Full Name <span className="text-[#B08D57]">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/60 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/50 focus:border-[#B08D57] focus:bg-[#091B2C]/80 focus:outline-hidden focus:ring-1 focus:ring-[#B08D57]"
              />
            </div>

            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-xs font-bold uppercase tracking-wider text-[#F8F4EC]/80"
              >
                Company Name <span className="text-[#B08D57]">*</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                autoComplete="organization"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Apex Agri Exports Ltd."
                className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/60 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/50 focus:border-[#B08D57] focus:bg-[#091B2C]/80 focus:outline-hidden focus:ring-1 focus:ring-[#B08D57]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#F8F4EC]/80"
              >
                Email Address <span className="text-[#B08D57]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ramesh@apexagri.com"
                className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/60 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/50 focus:border-[#B08D57] focus:bg-[#091B2C]/80 focus:outline-hidden focus:ring-1 focus:ring-[#B08D57]"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold uppercase tracking-wider text-[#F8F4EC]/80"
              >
                Phone Number <span className="text-[#B08D57]">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/60 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/50 focus:border-[#B08D57] focus:bg-[#091B2C]/80 focus:outline-hidden focus:ring-1 focus:ring-[#B08D57]"
              />
            </div>
          </div>

          {/* Product of Interest Dropdown */}
          <div>
            <label
              htmlFor="product"
              className="block text-xs font-bold uppercase tracking-wider text-[#F8F4EC]/80"
            >
              Product of Interest <span className="text-[#B08D57]">*</span>
            </label>
            <select
              id="product"
              name="product"
              required
              value={formData.product}
              onChange={handleChange}
              className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/60 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] focus:border-[#B08D57] focus:bg-[#091B2C]/80 focus:outline-hidden focus:ring-1 focus:ring-[#B08D57]"
            >
              <option value="" className="bg-[#091B2C] text-[#F8F4EC]">Select a product of interest...</option>
              {products.map((p) => (
                <option key={p.slug} value={p.name} className="bg-[#091B2C] text-[#F8F4EC]">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-[#F8F4EC]/80"
            >
              Message &amp; Requirements <span className="text-[#B08D57]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Specify gauge thickness (microns), dimensions, order quantities, print colors, or sample delivery requests..."
              className="mt-1.5 block w-full min-h-[120px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/60 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/50 focus:border-[#B08D57] focus:bg-[#091B2C]/80 focus:outline-hidden focus:ring-1 focus:ring-[#B08D57] resize-y"
            />
          </div>

          {/* Submit Button with Framer Motion hover & tap */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { scale: 1.02 }}
              whileTap={isSubmitting ? undefined : { scale: 0.95 }}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-base font-bold text-[#091B2C] shadow-md shadow-[#B08D57]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-[#091B2C]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Submit Inquiry &rarr;</span>
              )}
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-[#B08D57]/20 bg-[#0F2A44]/40 backdrop-blur-xl p-8 shadow-xl animate-pulse">
          <div className="h-6 w-1/3 bg-[#1B3D5E]/30 rounded mb-4" />
          <div className="h-4 w-2/3 bg-[#1B3D5E]/20 rounded mb-8" />
          <div className="space-y-4">
            <div className="h-10 bg-[#1B3D5E]/20 rounded" />
            <div className="h-10 bg-[#1B3D5E]/20 rounded" />
            <div className="h-10 bg-[#1B3D5E]/20 rounded" />
          </div>
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
