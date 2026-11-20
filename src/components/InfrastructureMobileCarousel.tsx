"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WorksWheelItem } from "@/components/ui/works-wheel";

interface InfrastructureMobileCarouselProps {
  items: WorksWheelItem[];
  label?: string;
}

export default function InfrastructureMobileCarousel({
  items,
  label = "Graphipacks Factory",
}: InfrastructureMobileCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const isSwipingHorizontal = useRef<boolean | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const total = items.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 3 seconds; pause when touching/dragging or paused, resume after
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, total]);

  // Touch event handlers with vertical scroll preservation
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
    isSwipingHorizontal.current = null;
    setIsPaused(true);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (e.touches.length !== 1) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Detect gesture axis on initial movement
    if (isSwipingHorizontal.current === null) {
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      if (absX > 7 || absY > 7) {
        if (absY >= absX) {
          // User is scrolling vertically: do NOT intercept or block vertical scroll
          isSwipingHorizontal.current = false;
          return;
        } else {
          // User is swiping horizontally on the carousel
          isSwipingHorizontal.current = true;
          setIsDragging(true);
        }
      }
    }

    if (isSwipingHorizontal.current === true) {
      touchDeltaX.current = diffX;
      // Dampen dragging at edges or allow continuous cyclic drag feel
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (isSwipingHorizontal.current === true) {
      const threshold = 45; // 45px swipe threshold
      if (touchDeltaX.current < -threshold) {
        handleNext();
      } else if (touchDeltaX.current > threshold) {
        handlePrev();
      }
    }

    // Reset touch coordinates and drag states
    touchStartX.current = null;
    touchStartY.current = null;
    touchDeltaX.current = 0;
    isSwipingHorizontal.current = null;
    setDragOffset(0);
    setIsDragging(false);

    // Resume auto-advance after 1.5 seconds of inactivity
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  const selectStation = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false), 3000;
    }, 3000);
  };

  return (
    <div className="w-full max-w-full overflow-hidden pt-20 pb-16 px-4">
      {/* Centre "Graphipacks Factory" Heading */}
      <div className="text-center max-w-sm mx-auto mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/40 bg-[#1B3D5E]/40 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-[#B08D57] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57] animate-pulse" />
          <span>Coimbatore Plant Capabilities</span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8F4EC] font-[family-name:var(--font-display)]">
          {label}
        </h1>
        <p className="mt-2 text-xs text-[#EFE8DC]/80 leading-relaxed">
          Tour our 6 manufacturing stations from prepress cylinder engraving to automated wicket bag converting.
        </p>
      </div>

      {/* Touch Carousel Frame (100vw bounded, no horizontal overflow, allows vertical scroll) */}
      <div
        className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-[#B08D57]/30 bg-[#0F2A44]/90 backdrop-blur-xl shadow-2xl touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Animated Carousel Track */}
        <div
          className={`flex w-full ${isDragging ? "" : "transition-transform duration-500 ease-out"}`}
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {items.map((station, idx) => (
            <div key={station.title} className="w-full shrink-0 relative">
              {/* Aspect Ratio Preservation: Aspect 4/3, object-cover, zero stretching */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#091B2C]">
                <Image
                  src={station.image}
                  alt={station.title}
                  width={600}
                  height={450}
                  sizes="(max-width: 640px) 100vw, 400px"
                  priority={idx === 0}
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjJhNDQiLz48L3N2Zz4="
                  className="size-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center rounded-full bg-[#0F2A44]/95 backdrop-blur-md px-3 py-1 font-mono text-[11px] font-bold text-[#F8F4EC] border border-[#B08D57]/40 shadow-sm">
                    Station 0{idx + 1} of 0{items.length}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#091B2C] via-[#091B2C]/75 to-transparent p-4 pt-10">
                  <h2 className="text-lg font-bold text-[#F8F4EC] font-[family-name:var(--font-display)]">
                    {station.title}
                  </h2>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-[#B08D57] font-mono font-medium">
                      Verified Converting Infrastructure
                    </span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#F8F4EC] bg-[#B08D57]/40 px-2.5 py-0.5 rounded-full border border-[#B08D57]/60">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Toolbar */}
        <div className="p-3 bg-[#091B2C]/95 border-t border-[#B08D57]/20 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[#0F2A44] hover:bg-[#1B3D5E] text-[#F8F4EC] border border-[#B08D57]/30 transition cursor-pointer"
            aria-label="Previous station"
          >
            <ChevronLeft className="h-5 w-5 text-[#B08D57]" />
          </button>

          {/* Dots and Swipe Prompt */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectStation(i)}
                  aria-label={`Go to station ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === activeIndex
                      ? "w-6 h-2 bg-[#B08D57]"
                      : "w-2 h-2 bg-[#EFE8DC]/30 hover:bg-[#EFE8DC]/60"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-[#EFE8DC]/70 tracking-wider">
              0{activeIndex + 1} / 0{total} • Swipe to navigate
            </span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[#0F2A44] hover:bg-[#1B3D5E] text-[#F8F4EC] border border-[#B08D57]/30 transition cursor-pointer"
            aria-label="Next station"
          >
            <ChevronRight className="h-5 w-5 text-[#B08D57]" />
          </button>
        </div>
      </div>

      {/* Side Labels Stacked Below Carousel */}
      <div className="max-w-md mx-auto mt-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            Manufacturing Stations Index
          </span>
          <span className="font-mono text-[11px] text-[#EFE8DC]/60">
            Tap station to view
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => selectStation(i)}
                className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? "bg-[#0F2A44] border-[#B08D57] text-[#F8F4EC] shadow-md shadow-[#091B2C]/40"
                    : "bg-[#091B2C]/60 border-[#B08D57]/20 text-[#EFE8DC]/70 hover:bg-[#0F2A44]/60 hover:text-[#F8F4EC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? "bg-[#B08D57] text-[#091B2C]"
                        : "bg-[#1B3D5E]/50 text-[#B08D57]"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="text-sm font-semibold tracking-tight">
                    {item.title}
                  </span>
                </div>

                {isActive ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#B08D57]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57] animate-pulse" />
                    Viewing
                  </span>
                ) : (
                  <span className="text-xs text-[#EFE8DC]/40 font-mono">
                    Inspect &rarr;
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
