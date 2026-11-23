"use client";

import {
  useState,
  useEffect,
  Suspense,
  type FormEvent,
  type ChangeEvent,
} from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  product: string;
  gauge: string;
  quantity: string;
  message: string;
}

export interface ProductChoice {
  name: string;
  slug: string;
  image: string;
  specs: string;
  moq: string;
  variants: Array<{ name: string; badge?: string }>;
  quantities: string[];
}

export const PRODUCT_CHOICES: ProductChoice[] = [
  {
    name: "Agriculture Mulch Film",
    slug: "agriculture-mulch-film",
    image: "/images/products/mulch-film.jpg",
    specs: "20-30μ · UV Stabilised",
    moq: "500 kg",
    variants: [
      { name: "Watermelon (30 microns)", badge: "Heavy Gauge" },
      { name: "Tomatoes (25 microns)", badge: "Standard Field" },
      { name: "Brinjal (20 microns)", badge: "Economical Field" },
    ],
    quantities: ["500 kg (MOQ)", "1,000 kg", "2,500 kg", "5,000 kg"],
  },
  {
    name: "Grow Bags",
    slug: "grow-bags",
    image: "/images/products/grow-bags.jpg",
    specs: "90-120 GSM · PP Woven",
    moq: "5,000 pcs",
    variants: [
      { name: "Open Top (100 GSM)", badge: "Standard Line" },
      { name: "Closed Top (120 GSM)", badge: "Heavy Duty" },
      { name: "Sleeve Type (90 GSM)", badge: "Continuous Sleeve" },
    ],
    quantities: ["5,000 pcs (MOQ)", "10,000 pcs", "25,000 pcs", "50,000 pcs"],
  },
  {
    name: "Coir Pith 50L & 5kg Block Bags",
    slug: "coir-pith-bags",
    image: "/images/products/coir-pith-bags.jpg",
    specs: "75-90 GSM · HDPE Woven Laminated",
    moq: "10,000 pcs",
    variants: [
      { name: "5kg Block Bag (75 GSM)", badge: "Export Standard" },
      { name: "50L Bag (90 GSM)", badge: "High Volume" },
    ],
    quantities: ["10,000 pcs (MOQ)", "25,000 pcs", "50,000 pcs (Container)"],
  },
  {
    name: "Laminated Rolls & Pouches",
    slug: "laminated-rolls-and-pouches",
    image: "/images/products/laminated-rolls-and-pouches.jpg",
    specs: "Up to 8-Colour Gravure · High Barrier",
    moq: "500 kg film / 10,000 pouches",
    variants: [
      { name: "PET 12 / PE 60", badge: "Duplex Standard" },
      { name: "BOPP 20 / CPP 40", badge: "FMCG Standard" },
      { name: "PET 12 / ALU 7 / PE 60", badge: "Triplex Ultra-Barrier" },
    ],
    quantities: ["500 kg (MOQ)", "10,000 pouches", "25,000 pouches", "50,000+ pouches"],
  },
  {
    name: "PP & LLDPE Bags",
    slug: "pp-and-lldpe-bags",
    image: "/images/products/pp-and-lldpe-bags.jpg",
    specs: "Woven Sacks & Extruded Liners",
    moq: "10,000 pcs",
    variants: [
      { name: "PP Woven Bag (50-80 GSM)", badge: "Outer Woven Sack" },
      { name: "LLDPE Liner Bag (50-100μ)", badge: "Moisture Liner" },
    ],
    quantities: ["10,000 pcs (MOQ)", "25,000 pcs", "50,000 pcs", "100,000 pcs"],
  },
  {
    name: "Wicketted Poly Bags",
    slug: "wicked-poly-bags",
    image: "/images/products/wicked-poly-bags.jpg",
    specs: "35-75μ · Automated Packing",
    moq: "25,000 pcs",
    variants: [
      { name: "35 Microns", badge: "Bakery Standard" },
      { name: "50 Microns", badge: "Garment & Retail" },
      { name: "75 Microns", badge: "Heavy-Duty Parts" },
    ],
    quantities: ["25,000 pcs (MOQ)", "50,000 pcs", "100,000 pcs", "250,000 pcs"],
  },
];

function getMatchedProduct(nameOrSlug: string | null | undefined): ProductChoice | undefined {
  if (!nameOrSlug) return undefined;
  const lower = nameOrSlug.trim().toLowerCase();
  return PRODUCT_CHOICES.find(
    (p) =>
      p.slug.toLowerCase() === lower ||
      p.name.toLowerCase() === lower ||
      p.name.toLowerCase().includes(lower)
  );
}

interface ContactFormProps {
  initialProduct?: string;
  initialVariant?: string;
  isModal?: boolean;
  onClose?: () => void;
}

function ContactFormInner({
  initialProduct,
  initialVariant,
  isModal,
  onClose,
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  const resolvedInitial =
    getMatchedProduct(initialProduct) ||
    getMatchedProduct(productParam) ||
    PRODUCT_CHOICES[0];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const [formData, setFormData] = useState<ContactFormData>(() => ({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    product: initialProduct || (productParam ? resolvedInitial.name : ""),
    gauge: initialVariant || (initialProduct || productParam ? resolvedInitial.variants[0]?.name || "" : ""),
    quantity: initialProduct || productParam ? resolvedInitial.quantities[0] || "" : "",
    message: "",
  }));

  // Update product if initialProduct changes dynamically
  useEffect(() => {
    if (initialProduct) {
      const match = getMatchedProduct(initialProduct);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          product: match.name,
          gauge: initialVariant || prev.gauge || match.variants[0]?.name || "",
          quantity: prev.quantity || match.quantities[0] || "",
        }));
      }
    }
  }, [initialProduct, initialVariant]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakingFields, setShakingFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedProductChoice =
    PRODUCT_CHOICES.find((p) => p.name === formData.product) || PRODUCT_CHOICES[0];

  const handleProductSelect = (choice: ProductChoice) => {
    setFormData((prev) => ({
      ...prev,
      product: choice.name,
      gauge: choice.variants[0]?.name || "",
      quantity: prev.quantity && prev.quantity.includes(choice.moq) ? prev.quantity : choice.quantities[0] || "",
    }));
    if (errors.product) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.product;
        return next;
      });
    }
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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    const newShaking: Record<string, boolean> = {};

    if (step === 1) {
      if (!formData.product) {
        newErrors.product = "Please select a product of interest";
        newShaking.product = true;
      }
    } else if (step === 2) {
      // Step 2: Ensure at least gauge or default is set
      if (!formData.gauge && selectedProductChoice.variants[0]) {
        setFormData((prev) => ({ ...prev, gauge: selectedProductChoice.variants[0].name }));
      }
    } else if (step === 3) {
      const cleanFullName = formData.fullName.trim();
      const cleanEmail = formData.email.trim().toLowerCase();

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
    } else if (step === 4) {
      const cleanMessage = formData.message.trim();
      if (!cleanMessage) {
        newErrors.message = "Please tell us about your requirements";
        newShaking.message = true;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShakingFields(newShaking);
      setTimeout(() => setShakingFields({}), 350);
      return false;
    }

    setErrors({});
    setShakingFields({});
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setSubmitError(null);
    setIsSubmitting(true);

    // Format specifications cleanly into requirements payload
    const specDetails = [
      formData.gauge ? `Selected Specification / Gauge: ${formData.gauge}` : "",
      formData.quantity ? `Target Quantity / Volume: ${formData.quantity}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const formattedMessage = specDetails
      ? `[${specDetails}]\n\n${formData.message.trim()}`
      : formData.message.trim();

    const cleanedPayload = {
      fullName: formData.fullName.trim(),
      companyName: formData.companyName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      product: formData.product.trim(),
      message: formattedMessage,
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
      product: initialProduct || (productParam ? resolvedInitial.name : ""),
      gauge: initialVariant || (initialProduct || productParam ? resolvedInitial.variants[0]?.name || "" : ""),
      quantity: initialProduct || productParam ? resolvedInitial.quantities[0] || "" : "",
      message: "",
    });
    setErrors({});
    setShakingFields({});
    setSubmitError(null);
    setIsSubmitted(false);
    setCurrentStep(1);
  };

  return (
    <div
      className={`rounded-2xl ${isModal
        ? "bg-transparent border-0"
        : "border border-[#1C1917]/10 bg-[#FBF9F5]"
        } p-5 sm:p-8 md:p-10 text-[#1C1917]`}
    >
      {/* Header with Progress Bar */}
      {!isSubmitted && (
        <div className="border-b border-[#1C1917]/10 pb-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A6864C]">
              Step {currentStep} of 4
            </span>
            <span className="font-mono text-[11px] text-[#57524E] uppercase tracking-wider">
              {currentStep === 1 && "1. Product Selection"}
              {currentStep === 2 && "2. Quantity & Gauge"}
              {currentStep === 3 && "3. Contact Details"}
              {currentStep === 4 && "4. Message & Requirements"}
            </span>
          </div>

          {/* Thin Brass Fill Progress Bar */}
          <div className="mt-2.5 h-1.5 w-full bg-[#1C1917]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#A6864C] transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917] font-serif">
            {currentStep === 1 && "Select Product of Interest"}
            {currentStep === 2 && "Choose Quantity & Gauge / Size"}
            {currentStep === 3 && "Your Contact Details"}
            {currentStep === 4 && "Message & Requirements"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#57524E] font-sans">
            {currentStep === 1 && "Tap one of the 6 manufactured product lines below."}
            {currentStep === 2 && `Configure gauge thickness and order volume for ${formData.product || "your order"}.`}
            {currentStep === 3 && "Provide your contact information. Phone and Company are optional."}
            {currentStep === 4 && "Specify any custom dimensions, print colors, or delivery notes."}
          </p>
        </div>
      )}

      {/* Success State */}
      {isSubmitted ? (
        <div className="mt-8 rounded-2xl border border-[#A6864C] bg-[#EDE6DA] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 shadow-sm">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
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
              {formData.gauge ? ` (${formData.gauge})` : ""}. One of our factory sales engineers in Madurai will review your specifications and contact you directly within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="btn-press w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#3D0E18] hover:bg-[#27080F] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#F6F2EB] transition-colors duration-200 ease-in-out cursor-pointer"
              >
                Submit Another Inquiry
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-press w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-lg border border-[#1C1917]/20 bg-transparent hover:bg-[#1C1917]/10 px-6 py-2.5 text-xs sm:text-sm font-bold text-[#1C1917] transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  Close Window
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <div className="min-h-[290px]">
            {/* STEP 1: Product Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                    Product of Interest <span className="text-[#3D0E18]">*</span>
                  </label>
                  {formData.product && (
                    <span className="font-mono text-[11px] font-semibold text-[#A6864C]">
                      Selected: {formData.product}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRODUCT_CHOICES.map((choice) => {
                    const isSelected = formData.product === choice.name;
                    return (
                      <button
                        key={choice.slug}
                        type="button"
                        onClick={() => handleProductSelect(choice)}
                        className={`btn-press group relative flex flex-col text-left overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer ${isSelected
                          ? "border-[#3D0E18] bg-[#EDE6DA] shadow-sm ring-1 ring-[#3D0E18]"
                          : "border-[#1C1917]/10 bg-[#FFFFFF] hover:border-[#A6864C]/70 hover:bg-[#FBF9F5]"
                          }`}
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EDE6DA]">
                          <Image
                            src={choice.image}
                            alt={choice.name}
                            fill
                            sizes="(max-width: 640px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#3D0E18] text-[#F6F2EB]">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1">
                          <span className="text-xs sm:text-sm font-bold text-[#1C1917] leading-tight">
                            {choice.name}
                          </span>
                          <span className="mt-1 text-[10px] text-[#57524E] font-mono">
                            {choice.specs}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {errors.product && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1.5" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                    <span>{errors.product}</span>
                  </p>
                )}
              </div>
            )}

            {/* STEP 2: Quantity / Gauge */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Gauge / Size Options from Product Page */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Specification Gauge / Size:
                    </label>
                    <span className="font-mono text-[11px] text-[#A6864C] font-semibold">
                      {selectedProductChoice.variants.length} configurations available
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {selectedProductChoice.variants.map((v) => {
                      const isSelected = formData.gauge === v.name;
                      return (
                        <button
                          key={v.name}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, gauge: v.name }))}
                          className={`btn-press group relative inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isSelected
                            ? "bg-[#3D0E18] text-[#F6F2EB] border-2 border-[#A6864C]"
                            : "bg-[#FFFFFF] text-[#1C1917] border border-[#1C1917]/15 hover:border-[#A6864C]"
                            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-xs transition-colors ${isSelected ? "bg-[#A6864C]" : "bg-[#1C1917]/30 group-hover:bg-[#A6864C]"
                              }`}
                          />
                          <span>{v.name}</span>
                          {v.badge && (
                            <span
                              className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${isSelected
                                ? "bg-[#27080F] text-[#A6864C]"
                                : "bg-[#EDE6DA] text-[#57524E]"
                                }`}
                            >
                              {v.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity / Volume Selection */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2">
                    <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Target Order Quantity / Volume:
                    </label>
                    <span className="font-mono text-[11px] text-[#57524E]">
                      MOQ: <strong className="text-[#3D0E18]">{selectedProductChoice.moq}</strong>
                    </span>
                  </div>

                  <div className="mt-3">
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder={`e.g. ${selectedProductChoice.quantities[0]} or custom monthly volume`}
                      className="block w-full min-h-[48px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18] focus:outline-hidden transition-colors duration-200"
                    />
                  </div>

                  {/* Quick selection presets */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-[#57524E]">Quick Presets:</span>
                    {selectedProductChoice.quantities.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, quantity: q }))}
                        className={`btn-press rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer border ${formData.quantity === q
                          ? "bg-[#3D0E18] text-[#F6F2EB] border-[#3D0E18]"
                          : "bg-[#EDE6DA] text-[#1C1917] border-[#1C1917]/10 hover:border-[#A6864C]"
                          }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className={`mt-1.5 block w-full min-h-[48px] rounded-lg border bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:outline-hidden transition-colors duration-200 ${errors.fullName
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
                      className={`mt-1.5 block w-full min-h-[48px] rounded-lg border bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:outline-hidden transition-colors duration-200 ${errors.email
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number (Optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]"
                    >
                      Phone Number <span className="text-[11px] font-normal lowercase text-[#57524E]">(optional)</span>
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
                      className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18] focus:outline-hidden transition-colors duration-200"
                    />
                    <p className="mt-1 text-[11px] text-[#57524E]">
                      e.g. 98765 43210, +91 accepted
                    </p>
                  </div>

                  {/* Company Name (Optional) */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1C1917]"
                    >
                      Company Name <span className="text-[11px] font-normal lowercase text-[#57524E]">(optional)</span>
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      autoComplete="organization"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Apex Agri Exports Ltd."
                      className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-[#1C1917]/15 bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:border-[#3D0E18] focus:ring-1 focus:ring-[#3D0E18] focus:outline-hidden transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Message & Requirements */}
            {currentStep === 4 && (
              <div className="space-y-4">
                {/* Summary Recap Bar */}
                <div className="rounded-lg border border-[#A6864C]/35 bg-[#EDE6DA] p-3 text-xs flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div>
                    <span className="text-[#57524E]">Product:</span>{" "}
                    <strong className="text-[#3D0E18]">{formData.product}</strong>
                  </div>
                  {formData.gauge && (
                    <div>
                      <span className="text-[#57524E]">Gauge:</span>{" "}
                      <strong className="text-[#1C1917]">{formData.gauge}</strong>
                    </div>
                  )}
                  {formData.quantity && (
                    <div>
                      <span className="text-[#57524E]">Volume:</span>{" "}
                      <strong className="text-[#1C1917]">{formData.quantity}</strong>
                    </div>
                  )}
                  {formData.fullName && (
                    <div>
                      <span className="text-[#57524E]">Contact:</span>{" "}
                      <strong className="text-[#1C1917]">{formData.fullName}</strong>
                    </div>
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
                    className={`mt-1.5 block w-full min-h-[120px] rounded-lg border bg-[#FFFFFF] px-4 py-3 text-base sm:text-sm text-[#1C1917] placeholder:text-[#57524E]/50 focus:outline-hidden resize-y transition-colors duration-200 ${errors.message
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

                {submitError && (
                  <div
                    className="rounded-lg border border-red-600 bg-red-50 p-3 text-xs text-red-800 flex items-center gap-2"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{submitError}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stepped Navigation Buttons (Back / Next / Submit) */}
          <div className="mt-6 pt-4 flex items-center justify-between border-t border-[#1C1917]/10 gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-press min-h-[48px] px-5 py-2.5 rounded-lg border border-[#1C1917]/20 bg-[#FFFFFF] hover:bg-[#EDE6DA] text-[#1C1917] text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-press min-h-[48px] px-6 py-2.5 rounded-lg bg-[#3D0E18] hover:bg-[#27080F] text-[#F6F2EB] text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5 ml-auto"
              >
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-press min-h-[48px] px-7 py-3 rounded-xl bg-[#3D0E18] hover:bg-[#27080F] text-[#F6F2EB] text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-[#F6F2EB]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactForm({
  initialProduct,
  initialVariant,
  isModal,
  onClose,
}: ContactFormProps) {
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
      <ContactFormInner
        initialProduct={initialProduct}
        initialVariant={initialVariant}
        isModal={isModal}
        onClose={onClose}
      />
    </Suspense>
  );
}
