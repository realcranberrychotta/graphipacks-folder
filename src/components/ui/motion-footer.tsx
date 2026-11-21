"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Package, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/lib/content";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES (Heritage Industrial Palette)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  background-color: transparent;
  color: #F8F4EC;
  font-family: var(--font-geist-sans, sans-serif);
  -webkit-font-smoothing: antialiased;
  
  /* Brand Tokens: Deep Navy (#091B2C), Navy Primary (#0F2A44), Bronze (#B08D57), Warm Ivory (#F8F4EC) */
  --pill-bg-1: rgba(255, 255, 255, 0.08);
  --pill-bg-2: rgba(255, 255, 255, 0.03);
  --pill-shadow: rgba(9, 27, 44, 0.35);
  --pill-highlight: rgba(248, 244, 236, 0.15);
  --pill-inset-shadow: rgba(176, 141, 87, 0.08);
  --pill-border: rgba(176, 141, 87, 0.3);
  
  --pill-bg-1-hover: #B08D57;
  --pill-bg-2-hover: #9A7843;
  --pill-border-hover: #B08D57;
  --pill-shadow-hover: rgba(176, 141, 87, 0.35);
  --pill-highlight-hover: rgba(248, 244, 236, 0.4);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-pulse-gold {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(176, 141, 87, 0.4)); }
  50% { transform: scale(1.18); filter: drop-shadow(0 0 12px rgba(176, 141, 87, 0.8)); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 36s linear infinite;
}

.animate-footer-pulse-gold {
  animation: footer-pulse-gold 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Precision Technical Die-Line Grid */
.footer-bg-grid {
  background-size: 64px 64px;
  background-image: 
    linear-gradient(to right, rgba(176, 141, 87, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(176, 141, 87, 0.08) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

/* Deep Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(176, 141, 87, 0.16) 0%, 
    rgba(15, 42, 68, 0.35) 45%, 
    transparent 75%
  );
}

/* Smoked Polymer Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.3s ease-in-out;
  color: #F8F4EC;
}

.footer-glass-pill:hover {
  background: #B08D57 !important;
  border-color: #B08D57 !important;
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      0 0 25px rgba(176, 141, 87, 0.2),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #091B2C !important;
}

/* Giant Background Watermark Text */
.footer-giant-bg-text {
  font-family: var(--font-display, 'Bodoni Moda', serif);
  font-size: 17vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: rgba(176, 141, 87, 0.07);
  -webkit-text-stroke: 1.5px rgba(176, 141, 87, 0.16);
}

.footer-heading {
  font-family: var(--font-display, 'Bodoni Moda', serif);
  color: #F8F4EC;
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency Physics)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    href?: string;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
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
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
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
    }, []);

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
    <span>40+ Years Manufacturing Excellence</span> <span className="text-[#B08D57]">✦</span>
    <span>In-House Multi-Layer Co-Extrusion</span> <span className="text-[#F8F4EC]">✦</span>
    <span>8-Color Rotogravure Printing</span> <span className="text-[#B08D57]">✦</span>
    <span>Automated Wicketted Poly Bags</span> <span className="text-[#F8F4EC]">✦</span>
    <span>Custom Barrier Laminates &amp; Pouches</span> <span className="text-[#B08D57]">✦</span>
    <span>UV-Stabilized Agriculture Mulch Film</span> <span className="text-[#F8F4EC]">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "8vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard document flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box as the user scrolls into it. 
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen min-h-[640px] w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex h-screen min-h-[640px] w-full flex-col justify-between overflow-hidden bg-[#0F2A44]/90 backdrop-blur-2xl text-[#F8F4EC] cinematic-footer-wrapper border-t border-[#B08D57]/25">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none uppercase text-[#B08D57]/15"
          >
            GRAPHIPACKS
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-[#B08D57]/30 bg-[#091B2C]/90 backdrop-blur-md py-3.5 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-[11px] md:text-xs font-mono font-bold tracking-[0.25em] text-[#B08D57] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 md:mt-20 w-full max-w-5xl mx-auto">
            {/* Provenance eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B08D57]/30 bg-[#091B2C]/70 px-4 py-1 text-[11px] font-mono font-semibold tracking-widest text-[#B08D57] uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] animate-pulse" />
              <span>B2B Industrial Packaging Solutions</span>
            </div>

            <h2
              ref={headingRef}
              className="text-2xl sm:text-6xl md:text-7xl font-extrabold text-[#F8F4EC] font-serif tracking-tight mb-4 text-center max-w-4xl leading-[1.15] sm:leading-[1.1]"
            >
              Ready to engineer your packaging?
            </h2>

            <p className="text-sm md:text-base text-[#EFE8DC]/85 font-medium text-center max-w-2xl mb-8 leading-relaxed">
              Partner with Graphipacks for precision blown film extrusion, 8-color rotogravure printing, and automated wicketted poly bags tailored to your machinery.
            </p>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              {/* Primary RFQ & Product Links */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as={Link}
                  href="/contact"
                  className="footer-glass-pill px-8 py-4 rounded-full border border-[#B08D57] bg-[#B08D57] text-[#091B2C] font-bold text-sm md:text-base flex items-center gap-3 group hover:bg-[#9A7843] transition-all duration-200 ease-in-out"
                >
                  <ArrowUpRight className="w-5 h-5 text-[#091B2C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ease-in-out" />
                  Request Technical Quote
                </MagneticButton>
                
                <MagneticButton
                  as={Link}
                  href="/products"
                  className="footer-glass-pill px-8 py-4 rounded-full border border-[#B08D57]/30 text-[#F8F4EC] font-semibold text-sm md:text-base flex items-center gap-3 group hover:bg-[#B08D57] hover:text-[#091B2C] transition-all duration-200 ease-in-out"
                >
                  <Package className="w-5 h-5 text-[#B08D57] group-hover:text-[#091B2C] transition-colors duration-200 ease-in-out" />
                  Explore Product Line
                </MagneticButton>
              </div>

              {/* Secondary Navigation Pills */}
              <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 w-full mt-2">
                <MagneticButton
                  as={Link}
                  href="/products#agriculture-mulch-film"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-[#B08D57]/30 text-[#F8F4EC] font-semibold text-xs md:text-sm hover:bg-[#B08D57] hover:text-[#091B2C] transition-all duration-200 ease-in-out flex items-center justify-center"
                >
                  Mulch &amp; Grow Films
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/products#wicketted-poly-bags"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-[#B08D57]/30 text-[#F8F4EC] font-semibold text-xs md:text-sm hover:bg-[#B08D57] hover:text-[#091B2C] transition-all duration-200 ease-in-out flex items-center justify-center"
                >
                  Wicketted Bags
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/products#laminated-rolls-and-pouches"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-[#B08D57]/30 text-[#F8F4EC] font-semibold text-xs md:text-sm hover:bg-[#B08D57] hover:text-[#091B2C] transition-all duration-200 ease-in-out flex items-center justify-center"
                >
                  Barrier Laminates
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/infrastructure"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-[#B08D57]/30 text-[#F8F4EC] font-semibold text-xs md:text-sm hover:bg-[#B08D57] hover:text-[#091B2C] transition-all duration-200 ease-in-out flex items-center justify-center"
                >
                  Our Infrastructure
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/contact"
                  className="footer-glass-pill min-h-[44px] px-5 py-2.5 rounded-full border border-[#B08D57]/30 text-[#F8F4EC] font-semibold text-xs md:text-sm hover:bg-[#B08D57] hover:text-[#091B2C] transition-all duration-200 ease-in-out flex items-center justify-center"
                >
                  Factory &amp; Location
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
            
            {/* Copyright */}
            <div className="text-[#EFE8DC]/70 text-[10px] md:text-xs font-mono font-medium tracking-wider uppercase order-2 md:order-1 text-center md:text-left">
              &copy; 2026 {company.name}. All rights reserved.
            </div>

            {/* Heritage Badge */}
            <div className="footer-glass-pill px-4 sm:px-6 py-2 sm:py-2.5 rounded-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 order-1 md:order-2 cursor-default border border-[#B08D57]/30 text-center max-w-full">
              <span className="text-[#EFE8DC]/70 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest">Est. 1984</span>
              <span className="animate-footer-pulse-gold text-xs text-[#B08D57]">✦</span>
              <span className="text-[#F8F4EC] font-bold text-xs tracking-normal">40+ Years of Manufacturing Excellence</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-11 h-11 rounded-full footer-glass-pill border border-[#B08D57]/30 flex items-center justify-center text-[#F8F4EC] hover:bg-[#B08D57] hover:text-[#091B2C] transition-all duration-200 ease-in-out group order-3"
            >
              <ArrowUp className="w-5 h-5 text-[#F8F4EC] group-hover:text-[#091B2C] transform group-hover:-translate-y-1 transition-all duration-300 ease-in-out" />
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
