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
  Calendar,
  MessageCircle,
  Download,
} from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";
import { generateProductPdf } from "@/lib/generateProductPdf";

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
    }
    // Step 4 "Message & Requirements" is optional; no validation errors

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

  const executeSubmit = async (overrideMessage?: string) => {
    setSubmitError(null);
    setIsSubmitting(true);

    const messageToUse = typeof overrideMessage === "string" ? overrideMessage : formData.message;

    // Format specifications cleanly into requirements payload
    const specDetails = [
      formData.gauge ? `Selected Specification / Gauge: ${formData.gauge}` : "",
      formData.quantity ? `Target Quantity / Volume: ${formData.quantity}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const trimmedMessage = messageToUse.trim();
    const formattedMessage = specDetails
      ? (trimmedMessage ? `[${specDetails}]\n\n${trimmedMessage}` : `[${specDetails}]`)
      : (trimmedMessage || "Standard factory inquiry.");

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep < 4) {
      handleNext();
      return;
    }
    executeSubmit();
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

  // Match submitted product and variant to product datasheet if available
  const matchedProduct = PRODUCTS_DATA.find((p) => {
    const normForm = (formData.product || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const normName = p.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const normSlug = p.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      normForm === normName ||
      normForm === normSlug ||
      normName.includes(normForm) ||
      (normForm.length > 3 && normForm.includes(normSlug))
    );
  });

  const matchedVariant = matchedProduct
    ? matchedProduct.variants.find((v) => {
        const normFormGauge = (formData.gauge || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const normVarName = v.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        const normVarKey = v.key.toLowerCase().replace(/[^a-z0-9]/g, "");
        return (
          normFormGauge === normVarName ||
          normFormGauge === normVarKey ||
          normVarName.includes(normFormGauge) ||
          normFormGauge.includes(normVarName)
        );
      }) || matchedProduct.variants[0]
    : undefined;

  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const handleDownloadSpecSheet = () => {
    if (!matchedProduct || !matchedVariant) return;
    setIsPdfGenerating(true);
    try {
      generateProductPdf(matchedProduct, matchedVariant);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setTimeout(() => setIsPdfGenerating(false), 800);
    }
  };

  const productSummary = `${formData.product || "packaging solutions"}${formData.gauge ? ` (${formData.gauge})` : ""}`;
  const whatsappText = `Hi Graphipacks, I just submitted an inquiry for ${productSummary}.`;
  const whatsappDigits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  const whatsappUrl = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappText)}`
    : "";
  const bookingUrl = "https://calendar.app.google/q5BNs2SnLmeR4kNH7";

  return (
    <div
      className={`rounded-2xl ${isModal
        ? "bg-transparent border-0"
        : "border border-ink/10 bg-background"
        } p-5 sm:p-8 md:p-10 text-ink`}
    >
      {/* Header with Progress Bar */}
      {!isSubmitted && (
        <div className="border-b border-ink/10 pb-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-steel">
              Step {currentStep} of 4
            </span>
            <span className="font-mono text-[11px] text-ink/75 uppercase tracking-wider">
              {currentStep === 1 && "1. Product Selection"}
              {currentStep === 2 && "2. Quantity & Gauge"}
              {currentStep === 3 && "3. Contact Details"}
              {currentStep === 4 && "4. Message & Requirements"}
            </span>
          </div>

          {/* Thin Steel Fill Progress Bar (GPU scaleX only) */}
          <div className="mt-2.5 h-1.5 w-full bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full w-full origin-left bg-steel transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${currentStep / 4})` }}
            />
          </div>

          <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-[-0.01em] text-ink font-display">
            {currentStep === 1 && "Select Product of Interest"}
            {currentStep === 2 && "Choose Quantity & Gauge / Size"}
            {currentStep === 3 && "Your Contact Details"}
            {currentStep === 4 && "Message & Requirements"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-ink/75 font-sans">
            {currentStep === 1 && "Tap one of the 6 manufactured product lines below."}
            {currentStep === 2 && `Configure gauge thickness and order volume for ${formData.product || "your order"}.`}
            {currentStep === 3 && "Provide your contact information. Phone and Company are optional."}
            {currentStep === 4 && "Specify any custom dimensions, print colors, or delivery notes."}
          </p>
        </div>
      )}

      {/* Success State */}
      {isSubmitted ? (
        <div className="mt-8 space-y-6">
          {/* Keep existing success card exactly as it is */}
          <div className="rounded-2xl border border-powder/40 bg-surface p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 shadow-sm">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="mt-4 text-2xl font-bold text-ink font-display">
                Request received
              </h3>
              <p className="mt-2 text-base font-semibold text-navy">
                Our team will call you within 1 working day.
              </p>
              <p className="mt-2 text-xs text-ink/75 max-w-md mx-auto leading-relaxed font-sans">
                We have registered your inquiry for{" "}
                <span className="font-semibold text-ink">
                  {formData.product || "our flexible packaging solutions"}
                </span>
                {formData.gauge ? ` (${formData.gauge})` : ""}. One of our factory sales engineers in Madurai will review your specifications and contact you directly within 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-press w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-md bg-navy hover:bg-navy/90 px-6 py-2.5 text-xs sm:text-sm font-bold text-background transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-press w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-md border border-ink/20 bg-transparent hover:bg-ink/10 px-6 py-2.5 text-xs sm:text-sm font-bold text-ink transition-colors duration-200 ease-in-out cursor-pointer"
                  >
                    Close Window
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 1. Timeline: a 3-step horizontal timeline */}
          <div className="rounded-xl border border-powder/40 bg-background p-5 sm:p-6 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink/75 mb-4">
              Inquiry Progression
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
              {/* Step 1: Received ✓ (completed, steel check) */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-powder/20 border border-steel text-steel">
                  <Check className="h-4 w-4 text-steel" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-ink">
                    Received ✓
                  </div>
                  <div className="text-[11px] text-steel font-medium">Completed</div>
                </div>
              </div>

              {/* Connecting line */}
              <div className="hidden sm:block h-[1px] flex-1 max-w-[60px] bg-powder/40 mx-2" />

              {/* Step 2: Reviewing specs (today) (in progress) */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-background border border-navy">
                  <span className="text-xs font-bold font-mono">2</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-navy">
                    Reviewing specs (today)
                  </div>
                  <div className="text-[11px] text-steel font-semibold">In progress</div>
                </div>
              </div>

              {/* Connecting line */}
              <div className="hidden sm:block h-[1px] flex-1 max-w-[60px] bg-ink/20 mx-2" />

              {/* Step 3: Quote sent (within 24h) (upcoming) */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/70 border border-ink/20 text-ink/75">
                  <span className="text-xs font-bold font-mono text-ink/75">3</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-ink/75">
                    Quote sent (within 24h)
                  </div>
                  <div className="text-[11px] text-ink/60">Upcoming</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Spec Sheet PDF, Call Booking, WhatsApp */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
            {/* 2. Download Spec Sheet (PDF) button (hidden if no PDF exists) */}
            {matchedProduct && matchedVariant && (
              <button
                type="button"
                onClick={handleDownloadSpecSheet}
                disabled={isPdfGenerating}
                className="btn-press min-h-[44px] inline-flex items-center justify-center gap-2 rounded-md border border-steel bg-surface hover:bg-surface px-4 py-2.5 text-xs sm:text-sm font-bold text-ink transition-colors duration-200 cursor-pointer shadow-sm"
              >
                <Download className="h-4 w-4 text-steel" />
                <span>{isPdfGenerating ? "Generating..." : "Download Spec Sheet (PDF)"}</span>
              </button>
            )}

            {/* 3. Book your call button */}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press min-h-[44px] inline-flex items-center justify-center gap-2 rounded-md border border-ink/20 bg-white hover:bg-background px-4 py-2.5 text-xs sm:text-sm font-bold text-ink transition-colors duration-200 cursor-pointer shadow-sm"
            >
              <Calendar className="h-4 w-4 text-steel" />
              <span>Book your call — pick a time that suits you</span>
            </a>

            {/* 4. WhatsApp button (only rendered when valid WhatsApp number is configured) */}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press min-h-[44px] inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] hover:bg-[#1EBE5D] px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors duration-200 cursor-pointer shadow-sm"
              >
                <MessageCircle className="h-4 w-4 text-white" />
                <span>Chat on WhatsApp now</span>
              </a>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <div className="min-h-[290px]">
            {/* STEP 1: Product Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                    Product of Interest <span className="text-red">*</span>
                  </label>
                  {formData.product && (
                    <span className="font-mono text-[11px] font-semibold text-steel">
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
                        className={`btn-press group relative flex flex-col text-left overflow-hidden rounded-xl border-2 transition-colors duration-200 cursor-pointer ${isSelected
                          ? "border-steel bg-surface shadow-sm ring-1 ring-steel"
                          : "border-ink/10 bg-background hover:border-steel/70 hover:bg-background"
                          }`}
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                          <Image
                            src={choice.image}
                            alt={choice.name}
                            fill
                            loading="lazy"
                            decoding="async"
                            sizes="(max-width: 640px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-background">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1">
                          <span className="text-xs sm:text-sm font-bold text-ink leading-tight">
                            {choice.name}
                          </span>
                          <span className="mt-1 text-[10px] text-ink/75 font-mono">
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
                  <div className="flex items-center justify-between border-b border-ink/10 pb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                      Specification Gauge / Size:
                    </label>
                    <span className="font-mono text-[11px] text-steel font-semibold">
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
                          className={`btn-press group relative inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${isSelected
                            ? "bg-navy text-background border-2 border-steel"
                            : "bg-background text-ink border border-ink/15 hover:border-steel hover:text-steel"
                            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-xs transition-colors ${isSelected ? "bg-red" : "bg-ink/30 group-hover:bg-steel"
                              }`}
                          />
                          <span>{v.name}</span>
                          {v.badge && (
                            <span
                              className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${isSelected
                                ? "bg-navy text-powder"
                                : "bg-surface text-ink/75"
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
                  <div className="flex items-center justify-between border-b border-ink/10 pb-2">
                    <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-ink">
                      Target Order Quantity / Volume:
                    </label>
                    <span className="font-mono text-[11px] text-ink/75">
                      MOQ: <strong className="text-navy">{selectedProductChoice.moq}</strong>
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
                      className="block w-full min-h-[48px] rounded-lg border border-ink/15 bg-background px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/75/50 focus:border-steel focus:ring-1 focus:ring-steel focus:outline-hidden transition-colors duration-200"
                    />
                  </div>

                  {/* Quick selection presets */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-ink/75">Quick Presets:</span>
                    {selectedProductChoice.quantities.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, quantity: q }))}
                        className={`btn-press rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer border ${formData.quantity === q
                          ? "bg-navy text-background border-navy"
                          : "bg-surface text-ink border-ink/10 hover:border-steel hover:text-steel"
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
                      className="block text-xs font-bold uppercase tracking-wider text-ink"
                    >
                      Full Name <span className="text-red">*</span>
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
                      className={`mt-1.5 block w-full min-h-[48px] rounded-lg border bg-background px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/75/50 focus:outline-hidden transition-colors duration-200 ${errors.fullName
                        ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/40"
                        : "border-ink/15 focus:border-steel focus:ring-1 focus:ring-steel"
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
                      className="block text-xs font-bold uppercase tracking-wider text-ink"
                    >
                      Email Address <span className="text-red">*</span>
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
                      className={`mt-1.5 block w-full min-h-[48px] rounded-lg border bg-background px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/75/50 focus:outline-hidden transition-colors duration-200 ${errors.email
                        ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/40"
                        : "border-ink/15 focus:border-steel focus:ring-1 focus:ring-steel"
                        }`}
                    />
                    {errors.email ? (
                      <p id="email-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1.5" role="alert">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                        <span>{errors.email}</span>
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-ink/75">
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
                      className="block text-xs font-bold uppercase tracking-wider text-ink"
                    >
                      Phone Number <span className="text-[11px] font-normal lowercase text-ink/75">(optional)</span>
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
                      className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-ink/15 bg-background px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/75/50 focus:border-steel focus:ring-1 focus:ring-steel focus:outline-hidden transition-colors duration-200"
                    />
                    <p className="mt-1 text-[11px] text-ink/75">
                      e.g. 98765 43210, +91 accepted
                    </p>
                  </div>

                  {/* Company Name (Optional) */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-bold uppercase tracking-wider text-ink"
                    >
                      Company Name <span className="text-[11px] font-normal lowercase text-ink/75">(optional)</span>
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      autoComplete="organization"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Apex Agri Exports Ltd."
                      className="mt-1.5 block w-full min-h-[48px] rounded-lg border border-ink/15 bg-background px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/75/50 focus:border-steel focus:ring-1 focus:ring-steel focus:outline-hidden transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Message & Requirements */}
            {currentStep === 4 && (
              <div className="space-y-4">
                {/* Summary Recap Bar */}
                <div className="rounded-lg border border-powder/40 bg-surface p-3 text-xs flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div>
                    <span className="text-ink/75">Product:</span>{" "}
                    <strong className="text-navy">{formData.product}</strong>
                  </div>
                  {formData.gauge && (
                    <div>
                      <span className="text-ink/75">Gauge:</span>{" "}
                      <strong className="text-ink">{formData.gauge}</strong>
                    </div>
                  )}
                  {formData.quantity && (
                    <div>
                      <span className="text-ink/75">Volume:</span>{" "}
                      <strong className="text-ink">{formData.quantity}</strong>
                    </div>
                  )}
                  {formData.fullName && (
                    <div>
                      <span className="text-ink/75">Contact:</span>{" "}
                      <strong className="text-ink">{formData.fullName}</strong>
                    </div>
                  )}
                </div>

                {/* Message Textarea */}
                <div className={shakingFields.message ? "animate-shake" : ""}>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-ink"
                  >
                    Message &amp; Requirements{" "}
                    <span className="text-[11px] font-normal normal-case text-ink/75">(Optional)</span>
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
                    className={`mt-1.5 block w-full min-h-[120px] rounded-lg border bg-background px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/75/50 focus:outline-hidden resize-y transition-colors duration-200 ${errors.message
                      ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/40"
                      : "border-ink/15 focus:border-steel focus:ring-1 focus:ring-steel"
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
          <div className="mt-6 pt-4 flex items-center justify-between border-t border-ink/10 gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-press min-h-[48px] px-5 py-2.5 rounded-md border border-ink/20 bg-background hover:bg-surface text-ink text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5"
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
                className="btn-press min-h-[48px] px-6 py-2.5 rounded-md bg-navy hover:bg-navy/90 text-background text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5 ml-auto"
              >
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => executeSubmit("")}
                  disabled={isSubmitting}
                  className="btn-press min-h-[48px] px-4 sm:px-5 py-2.5 rounded-md border border-ink/20 bg-background hover:bg-surface text-ink/75 hover:text-ink text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Skip this step &rarr;</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-press min-h-[48px] px-6 sm:px-7 py-3 rounded-md bg-red hover:bg-[#d62839] text-background text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin text-background" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry &rarr;</span>
                    </>
                  )}
                </button>
              </div>
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
        <div className={`rounded-2xl ${isModal ? "bg-transparent border-0" : "border border-ink/10 bg-surface"} p-8 animate-pulse`}>
          <div className="h-6 w-1/3 bg-background rounded mb-4" />
          <div className="h-4 w-2/3 bg-background rounded mb-8" />
          <div className="space-y-4">
            <div className="h-10 bg-background rounded" />
            <div className="h-10 bg-background rounded" />
            <div className="h-10 bg-background rounded" />
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
