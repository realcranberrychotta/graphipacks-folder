"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { TimelineEvent } from "@/lib/content";

interface TimelineScrollProps {
  timeline: TimelineEvent[];
}

export default function TimelineScroll({ timeline }: TimelineScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  });

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Maps scroll progress across the container to horizontal translation of the cards track
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div className="relative bg-transparent text-[#F8F4EC]">
      {/* ========================================================= */}
      {/* Desktop Pinned Horizontal Scroll Sequence (md and up)     */}
      {/* ========================================================= */}
      <div ref={containerRef} className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Section Heading & Progress Bar */}
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pt-12 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
                  02 — Four Decades of Growth
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#F8F4EC] sm:text-4xl">
                  Heritage Timeline (1984 &ndash; 2016)
                </h2>
                <p className="mt-2 text-sm text-[#EFE8DC]">
                  A historical overview of technological transitions, plant expansions, and production milestones that shaped Graphipacks.
                </p>
              </div>

              {/* Interactive Scroll Indicator */}
              <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#B08D57]">
                  <span className="h-2 w-2 rounded-full bg-[#B08D57] animate-pulse" />
                  <span>Scroll to explore milestone journey</span>
                </div>
                <div className="h-1.5 w-48 overflow-hidden rounded-full bg-[#B08D57]/20">
                  <motion.div
                    style={{
                      scaleX: scrollYProgress,
                      transformOrigin: "left",
                      willChange: isScrolling ? "transform" : "auto",
                    }}
                    className="h-full w-full bg-gradient-to-r from-[#B08D57] to-[#F8F4EC]"
                  />
                </div>
              </div>
            </div>

            {/* Subtle horizontal track timeline axis */}
            <div className="relative mt-8 h-0.5 w-full bg-[#B08D57]/30 overflow-hidden">
              <motion.div
                style={{
                  scaleX: scrollYProgress,
                  transformOrigin: "left",
                  willChange: isScrolling ? "transform" : "auto",
                }}
                className="absolute top-0 left-0 h-full w-full bg-[#B08D57]"
              />
            </div>
          </div>

          {/* Horizontal Cards Track */}
          <div className="relative w-full overflow-hidden py-8">
            <motion.div
              style={{ x, willChange: isScrolling ? "transform" : "auto" }}
              className="flex gap-8 pl-8 sm:pl-16 lg:pl-24 pr-48 items-stretch"
            >
              {timeline.map((event, idx) => (
                <div
                  key={event.year}
                  className="w-[380px] sm:w-[420px] lg:w-[460px] shrink-0"
                >
                  <div className="h-full flex flex-col justify-between p-8 rounded-2xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl md:backdrop-blur-2xl shadow-xl transition-all duration-300 hover:border-[#B08D57]/50 hover:shadow-2xl">
                    <div>
                      {/* Top Milestone Header */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-lg border border-[#B08D57]/40 bg-[#1B3D5E]/60 px-4 py-1.5 font-mono text-base font-bold text-[#F8F4EC] shadow-sm">
                          <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
                          <span>{event.year}</span>
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B08D57]">
                          Milestone 0{idx + 1} / 0{timeline.length}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="mt-6 text-xl font-bold tracking-tight text-[#F8F4EC]">
                        {event.title}
                      </h3>

                      {/* Milestone Description */}
                      <p className="mt-4 text-sm text-[#EFE8DC] leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Bottom Metadata Ribbon */}
                    <div className="mt-8 border-t border-[#B08D57]/20 pt-4 flex items-center justify-between text-xs text-[#EFE8DC]/70">
                      <span className="font-mono uppercase tracking-wider text-[#B08D57]">
                        Era: {event.year} &bull; Graphipacks
                      </span>
                      <span className="font-semibold text-[#F8F4EC]">
                        Verified Milestone
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Mobile Responsive Vertical Timeline Fallback (under md)   */}
      {/* ========================================================= */}
      <div className="block md:hidden py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            02 — Four Decades of Growth
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#F8F4EC]">
            Heritage Timeline (1984 &ndash; 2016)
          </h2>
          <p className="mt-2 text-sm text-[#EFE8DC]">
            A historical overview of technological transitions, plant expansions, and production milestones that shaped Graphipacks.
          </p>

          <div className="relative mt-10">
            {/* Vertical connector line */}
            <div
              aria-hidden="true"
              className="absolute left-4 top-2 bottom-2 w-0.5 bg-[#B08D57]/40"
            />

            <div className="space-y-8">
              {timeline.map((event, idx) => (
                <div key={event.year} className="relative flex items-start pl-10">
                  {/* Node marker */}
                  <div className="absolute left-4 -ml-2.5 mt-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#091B2C] bg-[#1B3D5E] shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
                  </div>

                  {/* Card */}
                  <div className="w-full p-6 rounded-2xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl shadow-lg">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block rounded-md border border-[#B08D57]/40 bg-[#1B3D5E]/60 px-3 py-1 font-mono text-xs font-bold text-[#F8F4EC]">
                        {event.year}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#B08D57] uppercase tracking-wider">
                        Milestone 0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-[#F8F4EC]">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#EFE8DC] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
