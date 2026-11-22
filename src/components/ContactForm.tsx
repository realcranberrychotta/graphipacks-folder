"use client";

import {
  useState,
  Suspense,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
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

interface ContactFormProps {
  initialProduct?: string;
  isModal?: boolean;
}

function ContactFormInner({ initialProduct, isModal }: ContactFormProps) {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  const [formData, setFormData] = useState<ContactFormData>(() => ({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    product: initialProduct || getInitialProduct(productParam),
    message: "",
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakingFields, setShakingFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const newShaking: Record<string, boolean> = {};

    const cleanFullName = formData.fullName.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanProduct = formData.product.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanFullName) {
      newErrors.fullName = "Please add your name";
      newShaking.fullName = true;
    }
    if (!cleanEmail) {
      newErrors.email = "Please add your email";
      newShaking.email = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "That email doesn't look right — check for a typo?";
      newShaking.email = true;
    }
    if (!cleanProduct) {
      newErrors.product = "Please select a product of interest";
      newShaking.product = true;
    }
    if (!cleanMessage) {
      newErrors.message = "Please tell us about your requirements";
      newShaking.message = true;
    }

    return { newErrors, newShaking };
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newErrors, newShaking } = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShakingFields(newShaking);

      setTimeout(() => {
        setShakingFields({});
      }, 350);

      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(firstKey);
      if (el) {
        el.focus();
      }
      return;
    }

    setErrors({});
    setShakingFields({});
    setSubmitError(null);
    setIsSubmitting(true);

    const cleanedPayload = {
      fullName: formData.fullName.trim(),
      companyName: formData.companyName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      product: formData.product.trim(),
      message: formData.message.trim(),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedPayload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit quote request. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      product: initialProduct || "",
      message: "",
    });
    setErrors({});
    setShakingFields({});
    setSubmitError(null);
    setIsSubmitted(false);
  };

  return (
    <div
      className={`rounded-2xl ${
        isModal
          ? "bg-transparent border-0"
          : "border border-[#1C1917]/10 bg-[#FBF9F5]"
      } p-5 sm:p-10 text-[#1C1917]`}
    >
      <div className="border-b border-[#1C1917]/10 pb-5">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A6864C]">
          Direct Sales &amp; Technical Consultation
        </span>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#1C1917] font-serif">
          Request a Quote &amp; Specifications
        </h2>
        <p className="mt-1 text-sm text-[#57524E] font-sans">
          Fill out the details below. Our manufacturing sales engineers respond within 24 hours.
        </p>
      </div>

      {isSubmitted ? (
        <div className="mt-8 rounded-2xl border border-[#A6864C] bg-[#EDE6DA] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3D0E18] text-[#F6F2EB]">
            <CheckCircle2 className="h-8 w-8 text-[#A6864C]" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-[#1C1917] font-serif">
            Request received
          </h3>
          <p className="mt-2 text-base font-semibold text-[#3D0E18]">
            Our team will call you within 1 working day.
          </p>
          <p className="mt-2 text-xs text-[#57524E] max-w-md mx-auto leading-relaxed font-sans">
            We have registered your inquiry for{" "}
            <span className="font-semibold text-[#1C1917]">
              {formData.product || "our flexible packaging solutions"}
            </span>
            . One of our factory sales engineers in Madurai will review your specifications and contact you directly within 24 hours.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#3D0E18] hover:bg-[#27080F] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#F6F2EB] transition-colors duration-200 ease-in-out cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className={shakingFields.fullName ? "animate-shake" : ""}>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]"
              >
                Full Name <span className="text-[#3D0E18]">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={`mt-1.5 block w-full min-h-[48px] rounded-lg border bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:outline-hidden transition-colors duration-200 ease-in-out ${
                  errors.fullName
                    ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/40"
                    : "border-[#1C1917]/15 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18]"
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1.5" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Company Name */}
            <div className={shakingFields.companyName ? "animate-shake" : ""}>
              <label
                htmlFor="companyName"
                className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]"
              >
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                autoComplete="organization"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Apex Agri Exports Ltd."
                className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18] focus:outline-hidden transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email Address */}
            <div className={shakingFields.email ? "animate-shake" : ""}>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]"
              >
                Email Address <span className="text-[#3D0E18]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ramesh@apexagri.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`mt-1.5 block w-full min-h-[48px] rounded-lg border bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:outline-hidden transition-colors duration-200 ease-in-out ${
                  errors.email
                    ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/40"
                    : "border-[#1C1917]/15 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18]"
                }`}
              />
              {errors.email ? (
                <p id="email-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1.5" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                  <span>{errors.email}</span>
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-[#57524E]">
                  We&apos;ll reply within 1 working day.
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className={shakingFields.phone ? "animate-shake" : ""}>
              <label
                htmlFor="phone"
                className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18] focus:outline-hidden transition-colors duration-200 ease-in-out"
              />
              <p className="mt-1 text-[11px] text-[#57524E]">
                e.g. 98765 43210, +91 accepted
              </p>
            </div>
          </div>

          {/* Product of Interest Dropdown */}
          <div className={shakingFields.product ? "animate-shake" : ""}>
            <label
              htmlFor="product"
              className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]"
            >
              Product of Interest <span className="text-[#3D0E18]">*</span>
            </label>
            <select
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              aria-invalid={!!errors.product}
              aria-describedby={errors.product ? "product-error" : undefined}
              className={`mt-1.5 block w-full min-h-[48px] rounded-lg border bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] focus:outline-hidden transition-colors duration-200 ease-in-out ${
                errors.product
                  ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/40"
                  : "border-[#1C1917]/15 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18]"
              }`}
            >
              <option value="" className="bg-[#FFFFFF] text-[#1C1917]">Select a product of interest...</option>
              {products.map((p) => (
                <option key={p.slug} value={p.name} className="bg-[#FFFFFF] text-[#1C1917]">
                  {p.name}
                </option>
              ))}
            </select>
            {errors.product && (
              <p id="product-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1.5" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                <span>{errors.product}</span>
              </p>
            )}
          </div>

          {/* Message Textarea */}
          <div className={shakingFields.message ? "animate-shake" : ""}>
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]"
            >
              Message &amp; Requirements <span className="text-[#3D0E18]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Specify gauge thickness (microns), dimensions, order quantities, print colors, or sample delivery requests..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`mt-1.5 block w-full min-h-[120px] rounded-lg border bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:outline-hidden resize-y transition-colors duration-200 ease-in-out ${
                errors.message
                  ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/40"
                  : "border-[#1C1917]/15 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18]"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1.5" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Submission Error Banner */}
          {submitError && (
            <div
              className="rounded-lg border border-red-600 bg-red-50 p-3 text-xs text-red-800 flex items-center gap-2"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Submit Button with Framer Motion hover & tap */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { scale: 1.01 }}
              whileTap={isSubmitting ? undefined : { scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#3D0E18] hover:bg-[#27080F] px-6 py-3.5 text-base font-bold text-[#F6F2EB] transition-colors duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#3D0E18] focus:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-[#F6F2EB]"
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

export default function ContactForm({ initialProduct, isModal }: ContactFormProps) {
  return (
    <Suspense
      fallback={
        <div className={`rounded-2xl ${isModal ? "bg-transparent border-0" : "border border-[#1C1917]/10 bg-[#EDE6DA]"} p-8 animate-pulse`}>
          <div className="h-6 w-1/3 bg-[#FBF9F5] rounded mb-4" />
          <div className="h-4 w-2/3 bg-[#FBF9F5] rounded mb-8" />
          <div className="space-y-4">
            <div className="h-10 bg-[#FBF9F5] rounded" />
            <div className="h-10 bg-[#FBF9F5] rounded" />
            <div className="h-10 bg-[#FBF9F5] rounded" />
          </div>
        </div>
      }
    >
      <ContactFormInner initialProduct={initialProduct} isModal={isModal} />
    </Suspense>
  );
}
