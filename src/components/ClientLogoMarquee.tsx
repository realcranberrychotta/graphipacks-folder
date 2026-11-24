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

  if (shouldReduceMotion) {
    return (
      <div
        className="w-full border-y border-powder bg-background py-6 sm:py-8"
        role="region"
        aria-label="Client Network Partners"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-center">
            {CLIENT_LOGOS.map((client, idx) => (
              <React.Fragment key={client}>
                <span className="font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide text-ink select-none">
                  {client}
                </span>
                {idx < CLIENT_LOGOS.length - 1 && (
                  <span
                    className="text-steel select-none text-xs sm:text-sm"
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

  const loopedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div
      className="group/client-marquee relative w-full overflow-hidden border-y border-powder bg-background py-5 sm:py-6 select-none"
      role="region"
      aria-label="Enterprise Client Marquee"
      data-client-marquee-paused={!isPlaying}
    >
      {/* Left & Right gradient masks for smooth luxury edge fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-background via-background/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-background via-background/80 to-transparent"
        aria-hidden="true"
      />

      {/* Marquee Track */}
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
              <span className="font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide text-ink hover:text-heritage transition-colors duration-200 whitespace-nowrap">
                {client}
              </span>
              <span
                className="text-steel text-xs sm:text-sm mx-6 sm:mx-8 md:mx-10 select-none"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </div>

        {/* Set 2 */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {loopedLogos.map((client, idx) => (
            <span key={`group2-${client}-${idx}`} className="inline-flex items-center">
              <span className="font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide text-ink hover:text-heritage transition-colors duration-200 whitespace-nowrap">
                {client}
              </span>
              <span
                className="text-steel text-xs sm:text-sm mx-6 sm:mx-8 md:mx-10 select-none"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Pause / Play Control Button */}
      <button
        type="button"
        onClick={() => setIsPlaying((prev) => !prev)}
        aria-label={isPlaying ? "Pause client marquee" : "Play client marquee"}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-powder bg-surface text-navy hover:bg-steel hover:text-background transition-colors duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-navy"
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
