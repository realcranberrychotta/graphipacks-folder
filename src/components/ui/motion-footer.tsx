"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight, Package, ArrowUp, Play, Pause } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { company } from "@/lib/content";
import { openQuoteModal } from "@/components/QuoteModal";

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES (Multi-Tone Coolors Sovereign Navy & Steel Blue)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  color: var(--background);
  font-family: var(--font-sans, sans-serif);
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: var(--navy);
  --pill-bg-2: var(--navy);
  --pill-shadow: rgba(0, 0, 0, 0.45);
  --pill-highlight: rgba(241, 250, 238, 0.08);
  --pill-inset-shadow: rgba(0, 0, 0, 0.3);
  --pill-border: rgba(168, 218, 220, 0.35);
  
  --pill-bg-1-hover: var(--steel);
  --pill-bg-2-hover: var(--steel);
  --pill-border-hover: var(--powder);
  --pill-shadow-hover: rgba(69, 123, 157, 0.35);
  --pill-highlight-hover: rgba(241, 250, 238, 0.4);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-pulse-star {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(168, 218, 220, 0.4)); }
  50% { transform: scale(1.18); filter: drop-shadow(0 0 12px rgba(230, 57, 70, 0.8)); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 36s linear infinite;
}

.animate-footer-pulse-star {
  animation: footer-pulse-star 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Precision Technical Die-Line Grid */
.footer-bg-grid {
  background-size: 64px 64px;
  background-image: 
    linear-gradient(to right, rgba(168, 218, 220, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(168, 218, 220, 0.08) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

.footer-aurora {
  display: none !important;
}

/* Restrained Dark Navy / Powder Blue Pill Theming */
.footer-glass-pill {
  background: var(--navy);
  border: 1px solid rgba(168, 218, 220, 0.35);
  transition: background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, color 0.25s ease-in-out;
  color: var(--background);
}

.footer-glass-pill:hover {
  background: var(--steel) !important;
  border-color: var(--powder) !important;
  color: var(--background) !important;
}

/* Giant Background Watermark Text */
.footer-giant-bg-text {
  font-family: var(--font-display, Georgia, serif);
  font-size: 17vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px rgba(168, 218, 220, 0.15);
  mask-image: linear-gradient(to bottom, black 0%, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 70%, transparent 100%);
}

.footer-heading {
  font-family: var(--font-display, Georgia, serif);
  color: var(--background);
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    href?: string;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
      if (typeof window === "undefined" || shouldReduceMotion) return;
      if (window.matchMedia?.("(pointer: coarse)")?.matches) return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.2,
            y: y * 0.2,
            scale: 1.02,
            ease: "power3.out",
            duration: 0.25,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "power3.out",
            duration: 0.3,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, [shouldReduceMotion]);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT (Graphipacks Private Limited)
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6">
    <span>40+ Years Manufacturing Excellence</span> <span className="text-powder">✦</span>
    <span>In-House Multi-Layer Co-Extrusion</span> <span className="text-background">✦</span>
    <span>8-Color Rotogravure Printing</span> <span className="text-powder">✦</span>
    <span>Automated Wicketted Poly Bags</span> <span className="text-background">✦</span>
    <span>Custom Barrier Laminates &amp; Pouches</span> <span className="text-powder">✦</span>
    <span>UV-Stabilized Agriculture Mulch Film</span> <span className="text-background">✦</span>
  </div>
);

export function CinematicFooter() {
  const shouldReduceMotion = useReducedMotion();
  const [isTickerPlaying, setIsTickerPlaying] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      queueMicrotask(() => {
        setIsTickerPlaying(false);
      });
    }
  }, [shouldReduceMotion]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer className="relative z-10 h-auto py-16 md:py-20 w-full flex flex-col justify-between overflow-hidden bg-[#1D3557] text-background cinematic-footer-wrapper border-t border-powder/30">
        {/* Tactile Archival Grain Layer */}
        <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />

        {/* Ambient Technical Die-Line Grid Background */}
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* Giant background text */}
        <div
          className="footer-giant-bg-text absolute -bottom-[2rem] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none uppercase"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          }}
        >
          GRAPHIPACKSS
        </div>

        {/* 1. Capabilities Marquee (Top of footer) */}
        <div
          className="group/ticker relative left-0 w-full overflow-hidden border-y border-powder/30 bg-navy py-3 md:py-3.5 z-10 mb-12 md:mb-16"
          role="region"
          aria-label="Capabilities Ticker"
        >
            <div
              className={`flex w-max text-[11px] md:text-xs font-mono font-bold tracking-[0.25em] text-powder uppercase transition-none ${
                shouldReduceMotion
                  ? ""
                  : isTickerPlaying
                  ? "animate-footer-scroll-marquee group-hover/ticker:[animation-play-state:paused]"
                  : "[animation-play-state:paused]"
              }`}
              style={
                shouldReduceMotion
                  ? { animation: "none", transform: "none" }
                  : { animationPlayState: isTickerPlaying ? undefined : "paused" }
              }
            >
              <MarqueeItem />
              <MarqueeItem />
            </div>

            {/* Capability Ticker Pause / Play Control */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsTickerPlaying((prev) => !prev);
              }}
              aria-label={
                isTickerPlaying && !shouldReduceMotion
                  ? "Pause capability ticker"
                  : "Play capability ticker"
              }
              title={
                isTickerPlaying && !shouldReduceMotion
                  ? "Pause capability ticker"
                  : "Play capability ticker"
              }
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-powder/50 bg-navy text-powder hover:border-powder hover:text-background transition-colors duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-powder"
            >
              {isTickerPlaying && !shouldReduceMotion ? (
                <Pause className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Play className="h-3 w-3 ml-0.5" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mb-12 md:mb-16 w-full max-w-5xl mx-auto">
            {/* Provenance eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-powder/45 bg-navy px-4 py-1 text-[11px] font-mono font-medium tracking-widest text-powder uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-red" />
              <span>B2B Industrial Packaging Solutions</span>
            </div>

            <h2
              className="text-2xl sm:text-6xl md:text-7xl font-bold text-background font-display tracking-[-0.015em] mb-4 text-center max-w-4xl leading-[1.16] sm:leading-[1.12]"
            >
              Ready to engineer your packaging?
            </h2>

            <p className="text-sm md:text-base text-background/85 font-normal text-center max-w-2xl mb-8 leading-relaxed">
              From specialized barrier film formulations to 8-color rotogravure printing and automated wicket bag lines, our Madurai facility delivers certified packaging tailored to your exact machinery requirements.
            </p>

            {/* Interactive Magnetic Pills Layout */}
            <div className="flex flex-col items-center gap-5 w-full">
              {/* Primary RFQ & Product Links */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as="button"
                  onClick={() => openQuoteModal()}
                  className="btn-press footer-glass-pill px-8 py-4 rounded-md border border-red bg-red text-background font-bold text-sm md:text-base flex items-center gap-3 group hover:bg-[#d62839] hover:text-background transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  <ArrowUpRight className="w-5 h-5 text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" />
                  Request Technical Quote
                </MagneticButton>
                
                <MagneticButton
                  as={Link}
                  href="/products"
                  className="btn-press footer-glass-pill px-8 py-4 rounded-md border border-powder/40 text-background font-semibold text-sm md:text-base flex items-center gap-3 group hover:bg-steel hover:text-background transition-colors duration-200 ease-in-out"
                >
                  <Package className="w-5 h-5 text-powder group-hover:text-background transition-colors duration-200 ease-in-out" />
                  Explore Product Line
                </MagneticButton>
              </div>

              {/* Secondary Navigation Pills */}
              <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 w-full mt-2">
                <MagneticButton
                  as={Link}
                  href="/products#agriculture-mulch-film"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-powder/35 text-background/90 font-semibold text-xs md:text-sm hover:bg-steel hover:text-background transition-colors duration-200 ease-in-out flex items-center justify-center"
                >
                  Mulch &amp; Grow Films
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/products#wicketted-poly-bags"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-powder/35 text-background/90 font-semibold text-xs md:text-sm hover:bg-steel hover:text-background transition-colors duration-200 ease-in-out flex items-center justify-center"
                >
                  Wicketted Bags
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/products#laminated-rolls-and-pouches"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-powder/35 text-background/90 font-semibold text-xs md:text-sm hover:bg-steel hover:text-background transition-colors duration-200 ease-in-out flex items-center justify-center"
                >
                  Barrier Laminates
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/infrastructure"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-powder/35 text-background/90 font-semibold text-xs md:text-sm hover:bg-steel hover:text-background transition-colors duration-200 ease-in-out flex items-center justify-center"
                >
                  Our Infrastructure
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/contact"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-powder/35 text-background/90 font-semibold text-xs md:text-sm hover:bg-steel hover:text-background transition-colors duration-200 ease-in-out flex items-center justify-center"
                >
                  Factory &amp; Location
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5 border-t border-powder/25 pt-6">
            
            {/* Copyright */}
            <div className="text-[rgba(241,250,238,0.72)] text-[10px] md:text-xs font-mono font-medium tracking-wider uppercase order-2 md:order-1 text-center md:text-left">
              &copy; 2026 {company.name}. All rights reserved.
            </div>

            {/* Heritage Badge */}
            <div className="footer-glass-pill px-4 sm:px-6 py-2 sm:py-2.5 rounded-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 order-1 md:order-2 cursor-default border border-powder/35 bg-surface/10 text-center max-w-full">
              <span className="text-red text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest">Est. 1984</span>
              <span className="animate-footer-pulse-star text-xs text-red">✦</span>
              <span className="text-background font-bold text-xs tracking-normal">40+ Years of Manufacturing Excellence</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-11 h-11 rounded-full footer-glass-pill border border-powder/35 flex items-center justify-center text-background hover:bg-steel hover:text-background transition-colors duration-200 ease-in-out group order-3"
            >
              <ArrowUp className="w-5 h-5 text-background group-hover:text-background transform group-hover:-translate-y-1 transition-transform duration-300 ease-in-out" />
            </MagneticButton>

          </div>
      </footer>
    </>
  );
}

export default CinematicFooter;
