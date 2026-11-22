"use client";

import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export const CLIENT_LOGOS = [
  "The Spice Club",
  "Elite Foods",
  "Pelemix",
  "Dutch Plantin",
  "Fibredust",
  "FLUBBERS",
  "MAHESH VALUE GROUP",
];

export default function ClientLogoMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(!shouldReduceMotion);

  // If Reduce Motion is on, show the logos as a steady static row, no scrolling
  if (shouldReduceMotion) {
    return (
      <div
        className="w-full border-y border-[#B08D57]/20 bg-[#091B2C]/80 py-6 sm:py-8"
        role="region"
        aria-label="Client Network Partners"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-center">
            {CLIENT_LOGOS.map((client, idx) => (
              <React.Fragment key={client}>
                <span className="font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide text-[#F8F4EC] select-none">
                  {client}
                </span>
                {idx < CLIENT_LOGOS.length - 1 && (
                  <span
                    className="text-[#B08D57] select-none text-xs sm:text-sm"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Double list to guarantee seamless coverage across all screen widths
  const loopedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div
      className="group/client-marquee relative w-full overflow-hidden border-y border-[#B08D57]/20 bg-[#091B2C]/80 backdrop-blur-md py-5 sm:py-6 select-none"
      role="region"
      aria-label="Enterprise Client Marquee"
      data-client-marquee-paused={!isPlaying}
    >
      {/* Left & Right gradient masks for smooth luxury edge fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#091B2C] via-[#091B2C]/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#091B2C] via-[#091B2C]/80 to-transparent"
        aria-hidden="true"
      />

      {/* Marquee Track (scrolling left to right, 30s full loop, pause on hover) */}
      <div
        className={`flex w-max items-center transition-none ${
          isPlaying
            ? "animate-client-marquee group-hover/client-marquee:[animation-play-state:paused]"
            : "[animation-play-state:paused]"
        }`}
        style={{
          animationPlayState: isPlaying ? undefined : "paused",
        }}
      >
        {/* Set 1 */}
        <div className="flex shrink-0 items-center">
          {loopedLogos.map((client, idx) => (
            <span key={`group1-${client}-${idx}`} className="inline-flex items-center">
              <span className="font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide text-[#F8F4EC] hover:text-[#B08D57] transition-colors duration-200 whitespace-nowrap">
                {client}
              </span>
              <span
                className="text-[#B08D57] text-xs sm:text-sm mx-6 sm:mx-8 md:mx-10 select-none"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </div>

        {/* Set 2 (Identical for seamless infinite loop) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {loopedLogos.map((client, idx) => (
            <span key={`group2-${client}-${idx}`} className="inline-flex items-center">
              <span className="font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide text-[#F8F4EC] hover:text-[#B08D57] transition-colors duration-200 whitespace-nowrap">
                {client}
              </span>
              <span
                className="text-[#B08D57] text-xs sm:text-sm mx-6 sm:mx-8 md:mx-10 select-none"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Pause / Play Control Button (Same style as Capabilities Ticker) */}
      <button
        type="button"
        onClick={() => setIsPlaying((prev) => !prev)}
        aria-label={isPlaying ? "Pause client marquee" : "Play client marquee"}
        title={isPlaying ? "Pause client marquee" : "Play client marquee"}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-[#B08D57]/50 bg-[#091B2C]/90 text-[#B08D57] hover:border-[#B08D57] hover:text-[#F8F4EC] shadow-md transition-colors duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#B08D57]"
      >
        {isPlaying ? (
          <Pause className="h-3 w-3" aria-hidden="true" />
        ) : (
          <Play className="h-3 w-3 ml-0.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
