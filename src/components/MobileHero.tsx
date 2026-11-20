"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, X, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import HeroHeadline from "@/components/HeroHeadline";
import { company } from "@/lib/content";

export interface FilmRollProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  moq: string;
  spec: string;
}

export const FILM_ROLL_PRODUCTS: FilmRollProduct[] = [
  {
    id: "mulch-film",
    name: "Agriculture Mulch Film",
    category: "Agricultural Solutions",
    image: "/images/products/mulch-film.jpg",
    moq: "500 kg",
    spec: "Virgin LLDPE with Advanced UV Stabilization • 20–30 microns (MOQ: 500 kg)",
  },
  {
    id: "grow-bags",
    name: "Grow Bags",
    category: "Agricultural Solutions",
    image: "/images/products/grow-bags.jpg",
    moq: "5,000 pcs",
    spec: "UV-Stabilised PP Woven Planters • 90, 100, 120 GSM • MOQ: 5,000 pcs",
  },
  {
    id: "coir-pith-bags",
    name: "Coir Pith 50L & 5kg Block Bags",
    category: "Substrate & Export Packaging",
    image: "/images/products/coir-pith-bags.jpg",
    moq: "10,000 pcs",
    spec: "Heavy-Duty HDPE Woven Laminated • Inside PE moisture barrier • MOQ: 10,000 pcs",
  },
  {
    id: "laminated-rolls-and-pouches",
    name: "Laminated Rolls & Pouches",
    category: "Flexible Barrier Packaging",
    image: "/images/products/laminated-rolls-and-pouches.jpg",
    moq: "500 kg film / 10,000 pouches",
    spec: "Multi-Layer High-Barrier Substrates • Up to 8-Colour Rotogravure • MOQ: 500 kg",
  },
  {
    id: "pp-and-lldpe-bags",
    name: "PP & LLDPE Bags",
    category: "Industrial & Retail Packaging",
    image: "/images/products/pp-and-lldpe-bags.jpg",
    moq: "10,000 pcs",
    spec: "High-Tensile Woven Bags (50-80 GSM) & LLDPE Liners (50-100μ) • MOQ: 10,000 pcs",
  },
  {
    id: "wicked-poly-bags",
    name: "Wicked Poly Bags",
    category: "Automated Packaging Solutions",
    image: "/images/products/wicked-poly-bags.jpg",
    moq: "25,000 pcs",
    spec: "Precision Metal-Wicketed Poly Bags • 35, 50, 75 Microns • MOQ: 25,000 pcs",
  },
];

const CARD_WIDTH = 190; // card width in px
const CARD_GAP = 14; // gap between cards in px
const STEP = CARD_WIDTH + CARD_GAP; // 204px per item
const TOTAL_ITEMS = FILM_ROLL_PRODUCTS.length; // 6
const CYCLE_WIDTH = TOTAL_ITEMS * STEP; // 1224px per full loop

export default function MobileHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(360);
  const [offset, setOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag & momentum tracking refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const offsetRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isAxisLockedRef = useRef<boolean | null>(null);

  // Mini-Estimator Modal State
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProductId, setSelectedProductId] = useState<string>(FILM_ROLL_PRODUCTS[0].id);
  const [quantity, setQuantity] = useState("Standard MOQ Trial Batch");
  const [customQuantity, setCustomQuantity] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Measure container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Sync ref with state
  offsetRef.current = offset;

  // Calculate centered active index based on current offset
  const computeActiveIndex = useCallback(
    (currentOffset: number, cWidth: number) => {
      const centerTarget = cWidth / 2 - CARD_WIDTH / 2;
      // relative card coordinate: currentOffset + i * STEP
      // centerTarget = currentOffset + i * STEP  =>  i = (centerTarget - currentOffset) / STEP
      const rawIndex = (centerTarget - currentOffset) / STEP;
      const normalizedIndex = Math.round(rawIndex) % TOTAL_ITEMS;
      return (normalizedIndex + TOTAL_ITEMS) % TOTAL_ITEMS;
    },
    []
  );

  // Snap to specific index
  const snapToIndex = useCallback(
    (index: number, animate = true) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const centerTarget = containerWidth / 2 - CARD_WIDTH / 2;

      // Find the closest equivalent offset that centers `index`
      const current = offsetRef.current;
      // We want: centerTarget - (targetOffset) = (k * TOTAL_ITEMS + index) * STEP
      // => targetOffset = centerTarget - (k * TOTAL_ITEMS + index) * STEP
      const baseTarget = centerTarget - index * STEP;
      // Find k such that targetOffset is closest to current
      const k = Math.round((baseTarget - current) / CYCLE_WIDTH);
      const finalTarget = baseTarget - k * CYCLE_WIDTH;

      if (!animate) {
        setOffset(finalTarget);
        setActiveIndex(index);
        return;
      }

      // Smooth ease-out snap animation
      const startTime = performance.now();
      const startOffset = current;
      const duration = 340;

      const animateSnap = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const nextOffset = startOffset + (finalTarget - startOffset) * ease;
        setOffset(nextOffset);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animateSnap);
        } else {
          setActiveIndex(index);
        }
      };
      animFrameRef.current = requestAnimationFrame(animateSnap);
    },
    [containerWidth]
  );

  // Initialize centered on item 0
  useEffect(() => {
    if (containerWidth > 0) {
      snapToIndex(0, false);
    }
  }, [containerWidth, snapToIndex]);

  // Touch Handlers with Axis Lock (Preserving Vertical Scrolling)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    isDraggingRef.current = true;
    isAxisLockedRef.current = null;
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startXRef.current;
    const diffY = currentY - startYRef.current;

    // Detect gesture axis on initial move
    if (isAxisLockedRef.current === null) {
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);
      if (absX > 6 || absY > 6) {
        if (absY >= absX) {
          // User is scrolling vertically: release and don't intercept
          isAxisLockedRef.current = false;
          isDraggingRef.current = false;
          return;
        } else {
          // User is swiping horizontally on the film roll
          isAxisLockedRef.current = true;
        }
      } else {
        return;
      }
    }

    if (isAxisLockedRef.current === true) {
      const now = performance.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      const moveDelta = currentX - lastXRef.current;

      velocityRef.current = moveDelta / dt;
      lastXRef.current = currentX;
      lastTimeRef.current = now;

      const newOffset = offsetRef.current + moveDelta;
      setOffset(newOffset);
      setActiveIndex(computeActiveIndex(newOffset, containerWidth));
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current || isAxisLockedRef.current !== true) {
      isDraggingRef.current = false;
      isAxisLockedRef.current = null;
      return;
    }
    isDraggingRef.current = false;
    isAxisLockedRef.current = null;

    let v = velocityRef.current * 16; // convert to approx px/frame
    // Cap velocity
    v = Math.max(-28, Math.min(28, v));

    // Momentum deceleration loop
    const runMomentum = () => {
      v *= 0.92; // friction
      const nextOffset = offsetRef.current + v;
      setOffset(nextOffset);
      setActiveIndex(computeActiveIndex(nextOffset, containerWidth));

      if (Math.abs(v) > 0.6) {
        animFrameRef.current = requestAnimationFrame(runMomentum);
      } else {
        // Snap to nearest item once momentum dissipates
        const nearestIndex = computeActiveIndex(nextOffset, containerWidth);
        snapToIndex(nearestIndex, true);
      }
    };

    if (Math.abs(v) > 1.5) {
      animFrameRef.current = requestAnimationFrame(runMomentum);
    } else {
      const nearestIndex = computeActiveIndex(offsetRef.current, containerWidth);
      snapToIndex(nearestIndex, true);
    }
  };

  // Sync selected product in estimator whenever active film roll card changes
  const activeProduct = FILM_ROLL_PRODUCTS[activeIndex];

  const handleOpenEstimator = () => {
    setSelectedProductId(activeProduct.id);
    setStep(1);
    setIsSubmitted(false);
    setEstimatorOpen(true);
  };

  const handleEstimatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Render 3 repetitions for continuous virtual loop
  const renderSlots: { item: FilmRollProduct; virtualIndex: number }[] = [];
  [-1, 0, 1].forEach((cycle) => {
    FILM_ROLL_PRODUCTS.forEach((prod, i) => {
      renderSlots.push({
        item: prod,
        virtualIndex: cycle * TOTAL_ITEMS + i,
      });
    });
  });

  return (
    <div className="w-full flex flex-col text-[#F8F4EC]">
      {/* 1. Minimal Provenance Indicator */}
      <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#B08D57]">
        <Sparkles className="h-3.5 w-3.5 text-[#B08D57] shrink-0" aria-hidden="true" />
        <span>EST. 1984</span>
        <span className="text-[#B08D57]/40">&bull;</span>
        <span className="text-[#F8F4EC]/80">{company.name}</span>
      </div>

      {/* 2. Responsive 3-Line Mobile Headline */}
      <div className="mt-5 overflow-visible">
        <HeroHeadline />
      </div>

      {/* 3. Concise Factual Statement */}
      <p className="mt-4 text-sm font-light leading-relaxed text-[#EFE8DC]/85">
        {company.about}
      </p>

      {/* 4. Film Roll Visual Title & Swipe Prompt */}
      <div className="mt-8 flex items-center justify-between border-b border-[#B08D57]/25 pb-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#B08D57] animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B08D57]">
            Core Product Film Roll
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#EFE8DC]/60">
          Swipe to inspect &bull; 0{activeIndex + 1}/06
        </span>
      </div>

      {/* 5. Interactive Horizontal Film Roll Strip */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden mt-4 pt-3 pb-2 touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Top Sprocket Perforations (Packaging web / Film Roll aesthetic) */}
        <div className="flex justify-between items-center px-2 py-1 bg-[#091B2C]/90 border-t border-b border-[#B08D57]/25 rounded-t-lg mb-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="h-2 w-3 rounded-xs bg-[#0F2A44] border border-[#B08D57]/30 shrink-0"
            />
          ))}
        </div>

        {/* Film Strip Viewport */}
        <div
          className="relative h-[210px] w-full"
          style={{
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {renderSlots.map(({ item, virtualIndex }) => {
            const cardLeft = offset + virtualIndex * STEP;
            // Only render elements within visible window buffer (+/- 300px)
            if (cardLeft < -CARD_WIDTH - 150 || cardLeft > containerWidth + 150) {
              return null;
            }

            const cardCenter = cardLeft + CARD_WIDTH / 2;
            const screenCenter = containerWidth / 2;
            const distFromCenter = Math.abs(cardCenter - screenCenter);
            const isCentered = distFromCenter < STEP / 2;

            return (
              <div
                key={`${item.id}-${virtualIndex}`}
                onClick={() => snapToIndex(virtualIndex % TOTAL_ITEMS, true)}
                className={`absolute top-2 transition-transform duration-200 cursor-pointer ${
                  isCentered
                    ? "scale-105 z-20"
                    : "scale-90 opacity-60 z-10"
                }`}
                style={{
                  left: `${cardLeft}px`,
                  width: `${CARD_WIDTH}px`,
                }}
              >
                <div
                  className={`overflow-hidden rounded-xl border bg-[#091B2C] shadow-lg transition-all duration-200 ${
                    isCentered
                      ? "border-2 border-[#B08D57] shadow-xl shadow-[#091B2C]/80"
                      : "border border-[#B08D57]/30"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full bg-[#091B2C]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={320}
                      height={240}
                      sizes="220px"
                      priority={virtualIndex === 0}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      className="size-full object-cover"
                    />
                    {isCentered && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center rounded-full bg-[#B08D57] px-2 py-0.5 font-mono text-[9px] font-bold text-[#091B2C] shadow-xs">
                          Active
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 bg-[#0F2A44]/95 border-t border-[#B08D57]/20">
                    <p className="text-xs font-bold text-[#F8F4EC] truncate">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Sprocket Perforations */}
        <div className="flex justify-between items-center px-2 py-1 bg-[#091B2C]/90 border-t border-b border-[#B08D57]/25 rounded-b-lg mt-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="h-2 w-3 rounded-xs bg-[#0F2A44] border border-[#B08D57]/30 shrink-0"
            />
          ))}
        </div>
      </div>

      {/* 6. Centred Product Details Card (Name + 1-Line Real Spec from products.ts) */}
      <div className="mt-3 rounded-xl border border-[#B08D57]/35 bg-[#0F2A44]/80 backdrop-blur-md p-4 shadow-lg text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/30 bg-[#1B3D5E]/60 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#F8F4EC] mb-1.5">
          <span>{activeProduct.category}</span>
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#F8F4EC]">
          {activeProduct.name}
        </h3>
        <p className="mt-1 text-xs text-[#B08D57] font-medium leading-relaxed">
          {activeProduct.spec}
        </p>

        {/* Navigation Indicator Controls */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#B08D57]/20 text-xs">
          <button
            type="button"
            onClick={() => snapToIndex((activeIndex - 1 + TOTAL_ITEMS) % TOTAL_ITEMS)}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#EFE8DC]/80 hover:text-[#B08D57] transition"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev Roll
          </button>
          <div className="flex items-center gap-1.5">
            {FILM_ROLL_PRODUCTS.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeIndex ? "w-5 bg-[#B08D57]" : "w-1.5 bg-[#EFE8DC]/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => snapToIndex((activeIndex + 1) % TOTAL_ITEMS)}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#EFE8DC]/80 hover:text-[#B08D57] transition"
          >
            Next Roll <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 7. Single Bronze CTA Button: "Get a Quote in 30 Seconds" */}
      <div className="mt-5">
        <button
          type="button"
          onClick={handleOpenEstimator}
          className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3.5 text-base font-bold text-[#091B2C] shadow-lg shadow-[#B08D57]/25 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <span>Get a Quote in 30 Seconds</span>
          <ArrowRight className="h-4 w-4 text-[#091B2C]" />
        </button>
      </div>

      {/* 8. The 3-Step Mini-Estimator Modal */}
      {estimatorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#091B2C]/85 backdrop-blur-md p-4"
          onClick={() => setEstimatorOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#B08D57]/40 bg-[#0F2A44] shadow-2xl text-[#F8F4EC]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#091B2C] p-5 border-b border-[#B08D57]/25">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#B08D57]">
                  Instant Commercial Estimator &bull; 30 Seconds
                </span>
                <button
                  type="button"
                  onClick={() => setEstimatorOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#F8F4EC] hover:bg-[#B08D57] hover:text-[#091B2C] transition"
                  aria-label="Close estimator"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-[#F8F4EC]">
                {isSubmitted
                  ? "Inquiry Received"
                  : `Step ${step} of 3: ${
                      step === 1
                        ? "Select Packaging Line"
                        : step === 2
                        ? "Target Quantity Tier"
                        : "Contact Information"
                    }`}
              </h2>

              {!isSubmitted && (
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      step >= 1 ? "bg-[#B08D57]" : "bg-[#1B3D5E]"
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      step >= 2 ? "bg-[#B08D57]" : "bg-[#1B3D5E]"
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      step === 3 ? "bg-[#B08D57]" : "bg-[#1B3D5E]"
                    }`}
                  />
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-5 max-h-[75vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1B3D5E]/60 text-[#B08D57] border border-[#B08D57]/40 shadow-sm">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F8F4EC]">
                    Request received — our team will call you within 1 working day.
                  </h3>
                  <div className="rounded-xl border border-[#B08D57]/20 bg-[#091B2C]/70 p-4 text-left text-xs space-y-2 mt-4">
                    <div>
                      <span className="font-bold text-[#B08D57] block">Selected Product:</span>
                      <span className="text-[#F8F4EC]">
                        {FILM_ROLL_PRODUCTS.find((p) => p.id === selectedProductId)?.name}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#B08D57] block">Estimated Volume:</span>
                      <span className="text-[#F8F4EC]">{customQuantity || quantity}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#B08D57] block">Contact Representative:</span>
                      <span className="text-[#F8F4EC]">
                        {contactName} ({contactPhone || contactEmail})
                      </span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setEstimatorOpen(false)}
                      className="w-full min-h-[48px] rounded-xl bg-[#B08D57] hover:bg-[#9A7843] text-sm font-bold text-[#091B2C] transition flex items-center justify-center cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEstimatorSubmit} className="space-y-4">
                  {/* Step 1: Pick Product */}
                  {step === 1 && (
                    <div className="space-y-2.5">
                      <p className="text-xs text-[#EFE8DC]/80 mb-3">
                        Select one of our 6 factory-direct polymer packaging lines:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {FILM_ROLL_PRODUCTS.map((prod) => {
                          const isSelected = prod.id === selectedProductId;
                          return (
                            <button
                              key={prod.id}
                              type="button"
                              onClick={() => setSelectedProductId(prod.id)}
                              className={`w-full min-h-[44px] p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                                isSelected
                                  ? "bg-[#1B3D5E]/80 border-[#B08D57] shadow-sm"
                                  : "bg-[#091B2C]/60 border-[#B08D57]/20 hover:border-[#B08D57]/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                                    isSelected ? "bg-[#B08D57]" : "bg-[#0F2A44] border border-[#B08D57]/40"
                                  }`}
                                />
                                <div>
                                  <div className="text-xs font-bold text-[#F8F4EC]">
                                    {prod.name}
                                  </div>
                                  <div className="text-[10px] text-[#B08D57] font-mono">
                                    MOQ: {prod.moq}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[11px] font-mono text-[#EFE8DC]/60">
                                {isSelected ? "Selected ✓" : "Select"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full min-h-[48px] rounded-xl bg-[#B08D57] hover:bg-[#9A7843] text-sm font-bold text-[#091B2C] transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Step 2: Choose Quantity</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Pick Quantity */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-xs text-[#EFE8DC]/80">
                        Selected:{" "}
                        <span className="font-bold text-[#B08D57]">
                          {FILM_ROLL_PRODUCTS.find((p) => p.id === selectedProductId)?.name}
                        </span>
                      </p>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#B08D57]">
                          Select Standard Commercial Tier:
                        </label>
                        {[
                          "Trial Batch (Standard MOQ)",
                          "Production Run (2x MOQ)",
                          "Commercial Contract (5x MOQ)",
                          "Annual Supply Contract",
                        ].map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => {
                              setQuantity(tier);
                              setCustomQuantity("");
                            }}
                            className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                              quantity === tier && !customQuantity
                                ? "bg-[#1B3D5E]/80 border-[#B08D57] font-bold text-[#F8F4EC]"
                                : "bg-[#091B2C]/60 border-[#B08D57]/20 text-[#EFE8DC]/80"
                            }`}
                          >
                            <span>{tier}</span>
                            {quantity === tier && !customQuantity && (
                              <span className="text-[#B08D57] font-bold">✓</span>
                            )}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#B08D57] mb-1">
                          Or Enter Custom Quantity (kg / pcs / MT):
                        </label>
                        <input
                          type="text"
                          value={customQuantity}
                          onChange={(e) => setCustomQuantity(e.target.value)}
                          placeholder="e.g. 2,500 kg or 50,000 bags"
                          className="w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/70 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/40 focus:border-[#B08D57] focus:outline-hidden"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="min-h-[48px] px-4 rounded-xl border border-[#B08D57]/30 bg-[#091B2C]/60 text-xs font-semibold text-[#EFE8DC] cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1 min-h-[48px] rounded-xl bg-[#B08D57] hover:bg-[#9A7843] text-sm font-bold text-[#091B2C] transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Step 3: Contact Info</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Enter Name + Phone/Email */}
                  {step === 3 && (
                    <div className="space-y-3.5">
                      <div className="rounded-lg bg-[#091B2C]/60 p-3 text-xs border border-[#B08D57]/20">
                        <span className="text-[#B08D57] font-bold">Estimating for: </span>
                        <span className="text-[#F8F4EC]">
                          {FILM_ROLL_PRODUCTS.find((p) => p.id === selectedProductId)?.name} (
                          {customQuantity || quantity})
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#B08D57] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="name"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Rajesh Kannan"
                          className="w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/70 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/40 focus:border-[#B08D57] focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#B08D57] mb-1">
                          Phone Number / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          inputMode="tel"
                          autoComplete="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/70 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/40 focus:border-[#B08D57] focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#B08D57] mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          inputMode="email"
                          autoComplete="email"
                          autoCapitalize="none"
                          spellCheck={false}
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="e.g. rajesh@company.com"
                          className="w-full min-h-[48px] rounded-lg border border-[#B08D57]/30 bg-[#091B2C]/70 px-4 py-3 text-base sm:text-sm text-[#F8F4EC] placeholder:text-[#F8F4EC]/40 focus:border-[#B08D57] focus:outline-hidden"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="min-h-[48px] px-4 rounded-xl border border-[#B08D57]/30 bg-[#091B2C]/60 text-xs font-semibold text-[#EFE8DC] cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 min-h-[48px] rounded-xl bg-[#B08D57] hover:bg-[#9A7843] text-sm font-bold text-[#091B2C] transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Get Quote Now &rarr;</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
