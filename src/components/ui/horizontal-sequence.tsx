"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "./horizontal-sequence.css";

export interface ManufacturingStage {
  id: string;
  numeral: string;
  step: number;
  category: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  alt: string;
}

export const DEFAULT_MANUFACTURING_STAGES: ManufacturingStage[] = [
  {
    id: "pellets",
    numeral: "01",
    step: 1,
    category: "RAW MATERIAL",
    title: "Pellets",
    shortTitle: "Pellets",
    description: "Feed hopper loaded with white polymer pellets for extrusion.",
    image: "/images/products/pp-and-lldpe-bags.jpg",
    alt: "Feed hopper loaded with white polymer pellets for extrusion",
  },
  {
    id: "blown-film",
    numeral: "02",
    step: 2,
    category: "EXTRUSION",
    title: "Blown Film",
    shortTitle: "Blown Film",
    description: "Extrusion bubble cooled and flattened through nip rollers.",
    image: "/images/infrastructure/infra-02-film-lamination-rollers.jpg",
    alt: "Extrusion bubble cooled and flattened through nip rollers",
  },
  {
    id: "rotogravure",
    numeral: "03",
    step: 3,
    category: "8-COLOUR PRESS",
    title: "Rotogravure Printing",
    shortTitle: "Rotogravure",
    description: "8-colour cylinders registering vivid print on film rolls.",
    image: "/images/infrastructure/infra-03-rotogravure-cylinders.jpg",
    alt: "8-colour cylinders registering vivid print on film rolls",
  },
  {
    id: "finished-pouch",
    numeral: "04",
    step: 4,
    category: "CONVERSION",
    title: "Finished Pouch",
    shortTitle: "Finished Pouch",
    description: "Final laminated stand-up pouches sealed and ready for dispatch.",
    image: "/images/products/laminated-rolls-and-pouches.jpg",
    alt: "Final laminated stand-up pouches sealed and ready for dispatch",
  },
];

interface HorizontalSequenceProps {
  stages?: ManufacturingStage[];
  header?: React.ReactNode;
}

export const HorizontalSequence: React.FC<HorizontalSequenceProps> = ({
  stages = DEFAULT_MANUFACTURING_STAGES,
  header,
}) => {
  // Outer runway wrapper ref (tall 360vh on desktop)
  const runwayRef = useRef<HTMLElement | null>(null);
  // Sticky inner frame ref
  const stickyRef = useRef<HTMLDivElement | null>(null);
  // Viewport container ref (clips the horizontal track)
  const viewportRef = useRef<HTMLDivElement | null>(null);
  // Horizontal track ref (translates horizontally)
  const trackRef = useRef<HTMLDivElement | null>(null);
  // Mobile track ref
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // Exact desktop horizontal travel calculation & scroll-progress driver
  useEffect(() => {
    const updateScroll = () => {
      const runway = runwayRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!runway || !viewport || !track) return;

      // On mobile or reduced motion, skip desktop sticky horizontal driver
      if (window.innerWidth < 1024 || isReducedMotion) return;

      const runwayRect = runway.getBoundingClientRect();
      const stickyTop = 64; // lg:top-16 = 4rem = 64px (clears fixed navbar)
      const stickyHeight = window.innerHeight - stickyTop;
      const totalScroll = runway.offsetHeight - stickyHeight;

      if (totalScroll <= 0) return;

      // Distance scrolled into the runway since the sticky frame engaged
      const currentScroll = stickyTop - runwayRect.top;
      const p = Math.min(1, Math.max(0, currentScroll / totalScroll));

      // Maximum horizontal travel needed to bring Card 04 flush against the right margin
      const maxTravel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const translateX = -p * maxTravel;

      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      setProgress(p);

      const stageIdx = Math.min(
        stages.length - 1,
        Math.floor(p * (stages.length - 0.001))
      );
      setActiveIndex(stageIdx);
    };

    // Attach to scroll and resize
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });

    // Track size changes with ResizeObserver
    const ro = new ResizeObserver(() => {
      updateScroll();
    });
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);

    // Initial calculation
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      ro.disconnect();
    };
  }, [stages.length, isReducedMotion]);

  // Click on desktop step indicator to smooth scroll directly to stage
  const scrollToStage = useCallback((targetIndex: number) => {
    const runway = runwayRef.current;
    if (!runway) return;

    const stickyTop = 64;
    const stickyHeight = window.innerHeight - stickyTop;
    const totalScroll = runway.offsetHeight - stickyHeight;
    const stageRatio = targetIndex / (stages.length - 1);

    const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = runwayTop - stickyTop + stageRatio * totalScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  }, [stages.length]);

  // Mobile / Reduced-motion manual arrows
  const scrollMobileByCard = useCallback((direction: "prev" | "next") => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 16
      : 320;
    el.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  }, []);

  // Mobile scroll handler to update indicator dots
  const handleMobileScroll = useCallback(() => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 16
      : 320;
    const idx = Math.min(
      stages.length - 1,
      Math.max(0, Math.round(el.scrollLeft / cardWidth))
    );
    setMobileActiveIndex(idx);
  }, [stages.length]);

  const scrollToMobileStage = useCallback((targetIndex: number) => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const card = el.children[targetIndex] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  return (
    <section
      id="pellet-to-pouch"
      ref={runwayRef}
      className={`relative w-full overflow-x-clip bg-light-atmosphere-alt border-b border-powder text-ink ${
        isReducedMotion ? "h-auto" : "lg:h-[360vh]"
      }`}
    >
      <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (>= 1024px) — Sticky Inner Viewport Frame                    */}
      {/* ========================================================================= */}
      <div
        ref={stickyRef}
        className={`relative z-10 w-full ${
          isReducedMotion
            ? "hidden"
            : "hidden lg:flex lg:flex-col lg:justify-between lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-hidden pt-6 pb-6"
        }`}
      >
        {/* Top Header Row — Clears navbar with top-16, locked in view */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 shrink-0">
          {header}
        </div>

        {/* Middle Viewport — Holds the horizontal card track */}
        <div ref={viewportRef} className="w-full overflow-hidden my-auto py-2">
          <div
            ref={trackRef}
            className="flex flex-nowrap gap-8 w-max will-change-transform items-center"
            style={{
              paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 4rem))",
              paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2 + 4rem))",
            }}
          >
            {stages.map((stage, stageIdx) => (
              <div
                key={stage.id}
                className="horizontal-sequence-card w-[76vw] max-w-[920px] shrink-0 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 sm:p-7 lg:p-8">
                  {/* Left Column (5 cols on lg) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
                    <div>
                      {/* Top row: Step numeral + Category pill */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#457B9D]">
                          {stage.numeral}
                        </span>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#A8DADC] bg-white/70 shadow-xs">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#E63946]"
                            aria-hidden="true"
                          />
                          <span className="font-mono text-[11px] font-semibold tracking-wider text-[#1D3557] uppercase">
                            {stage.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1D3557] tracking-tight">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-[#1D3557]/80 leading-relaxed font-sans">
                        {stage.description}
                      </p>
                    </div>

                    {/* 4-segment step progress bar */}
                    <div className="pt-4 border-t border-[#A8DADC]/40">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#457B9D] mb-2 font-semibold">
                        <span>STAGE {stage.numeral} / 04</span>
                        <span className="text-[#1D3557]/60 font-sans text-[11px] tracking-normal font-normal">
                          Step {stage.step} of 4
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 h-1.5 w-full">
                        {stages.map((_, sIdx) => (
                          <div
                            key={sIdx}
                            className={`h-full rounded-full transition-colors duration-300 ${
                              sIdx <= stageIdx ? "bg-[#457B9D]" : "bg-[#A8DADC]/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (7 cols on lg) */}
                  <div className="lg:col-span-7">
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-[#A8DADC] bg-[#1D3557]/5 shadow-inner">
                      <Image
                        src={stage.image}
                        alt={stage.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                      />
                      <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#1D3557]/90 backdrop-blur-sm rounded border border-[#A8DADC]/40 text-[10px] font-mono text-[#F1FAEE] tracking-widest uppercase">
                        STAGE {stage.numeral} • {stage.category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pinned Progress Rail Row */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 shrink-0 pb-2">
          {/* 2px Powder Blue rail filled smoothly in Dark Navy */}
          <div className="relative w-full h-[2px] bg-[#A8DADC]/40 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 bg-[#1D3557] rounded-full transition-all duration-75 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            />
          </div>

          {/* 4 Step indicators beneath the rail */}
          <div className="grid grid-cols-4 gap-4 pt-3">
            {stages.map((stage, idx) => {
              const isActive = activeIndex === idx;
              const isPast = progress >= (idx + 0.4) / stages.length;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => scrollToStage(idx)}
                  className="flex items-center gap-2.5 text-left group cursor-pointer transition-colors focus:outline-none"
                  aria-label={`Jump to stage ${stage.numeral}: ${stage.title}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 shrink-0 ${
                      isActive
                        ? "bg-[#E63946] ring-4 ring-[#E63946]/25 scale-125"
                        : isPast
                        ? "bg-[#1D3557]"
                        : "bg-[#A8DADC]"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <span
                      className={`block font-mono text-[10px] tracking-widest uppercase transition-colors ${
                        isActive ? "text-[#457B9D] font-bold" : "text-[#1D3557]/60"
                      }`}
                    >
                      {stage.numeral}
                    </span>
                    <span
                      className={`block text-xs font-semibold truncate transition-colors ${
                        isActive ? "text-[#1D3557]" : "text-[#1D3557]/70"
                      }`}
                    >
                      {stage.shortTitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET / REDUCED-MOTION VIEW — Native Horizontal Scroll-Snap     */}
      {/* ========================================================================= */}
      <div
        className={`relative z-10 w-full py-16 md:py-20 ${
          isReducedMotion ? "block" : "block lg:hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-8">
          {header}

          {/* Controls row: Swipe cue on mobile, Arrow buttons for reduced motion or tactile control */}
          <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#A8DADC]/40">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#457B9D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" aria-hidden="true" />
              <span>Conveyor Sequence</span>
              <span className="text-[#1D3557]/60 font-sans tracking-normal">• Swipe →</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollMobileByCard("prev")}
                className="w-8 h-8 rounded-full border border-[#A8DADC] bg-[#F1FAEE] text-[#1D3557] flex items-center justify-center hover:bg-[#1D3557] hover:text-[#F1FAEE] transition-colors focus:outline-none"
                aria-label="Previous stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollMobileByCard("next")}
                className="w-8 h-8 rounded-full border border-[#A8DADC] bg-[#F1FAEE] text-[#1D3557] flex items-center justify-center hover:bg-[#1D3557] hover:text-[#F1FAEE] transition-colors focus:outline-none"
                aria-label="Next stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Native Horizontal Scroll-Snap Track */}
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 sm:px-10 pb-4 no-scrollbar scroll-smooth"
        >
          {stages.map((stage, stageIdx) => (
            <div
              key={stage.id}
              className="horizontal-sequence-card w-[88vw] max-w-[540px] shrink-0 snap-center overflow-hidden flex flex-col justify-between"
            >
              {/* Photo on top for mobile */}
              <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#A8DADC] bg-[#1D3557]/5">
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#1D3557]/90 backdrop-blur-sm rounded border border-[#A8DADC]/40 text-[10px] font-mono text-[#F1FAEE] tracking-widest uppercase">
                  STAGE {stage.numeral} • {stage.category}
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xl font-bold tracking-tight text-[#457B9D]">
                      {stage.numeral}
                    </span>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#A8DADC] bg-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" aria-hidden="true" />
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-[#1D3557] uppercase">
                        {stage.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-[#1D3557]">
                    {stage.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#1D3557]/80 leading-relaxed font-sans">
                    {stage.description}
                  </p>
                </div>

                {/* 4-segment step progress bar */}
                <div className="pt-3 border-t border-[#A8DADC]/40">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#457B9D] mb-1.5 font-semibold">
                    <span>STAGE {stage.numeral} / 04</span>
                    <span className="text-[#1D3557]/60 font-sans tracking-normal">
                      Step {stage.step} of 4
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1 w-full">
                    {stages.map((_, sIdx) => (
                      <div
                        key={sIdx}
                        className={`h-full rounded-full ${
                          sIdx <= stageIdx ? "bg-[#457B9D]" : "bg-[#A8DADC]/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Stage Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {stages.map((stage, idx) => {
            const isActive = mobileActiveIndex === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => scrollToMobileStage(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? "w-6 h-2 bg-[#E63946]"
                    : "w-2 h-2 bg-[#A8DADC] hover:bg-[#457B9D]"
                }`}
                aria-label={`Go to stage ${stage.numeral}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HorizontalSequence;
