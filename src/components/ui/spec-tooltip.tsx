"use client";

import * as React from "react";
import { useEffect, useId, useRef, useState } from "react";

export const PACKAGING_GLOSSARY: Record<string, string> = {
  "µm": "1/1000th of a millimeter — measures plastic film thickness. Higher microns mean stronger, stiffer film.",
  Micron: "1/1000th of a millimeter — measures plastic film thickness. Higher microns mean stronger, stiffer film.",
  Microns: "1/1000th of a millimeter — measures plastic film thickness. Higher microns mean stronger, stiffer film.",
  GSM: "Grams per Square Meter — measures fabric or woven sack weight and durability.",
  MOQ: "Minimum Order Quantity — the smallest production run required to set up extrusion or printing cylinders.",
  LLDPE: "Linear Low-Density / Low-Density Polyethylene — flexible, puncture-resistant polymer resin used for films and liners.",
  LDPE: "Linear Low-Density / Low-Density Polyethylene — flexible, puncture-resistant polymer resin used for films and liners.",
  HDPE: "High-Density Polyethylene — rigid, moisture-resistant woven or film polymer ideal for heavy-duty export bags.",
  BOPP: "Multi-layer barrier films (BOPP = crisp print/clarity, CPP = strong heat-seal, PET = high tensile & aroma barrier).",
  CPP: "Multi-layer barrier films (BOPP = crisp print/clarity, CPP = strong heat-seal, PET = high tensile & aroma barrier).",
  PET: "Multi-layer barrier films (BOPP = crisp print/clarity, CPP = strong heat-seal, PET = high tensile & aroma barrier).",
  Rotogravure: "Engraved cylinder printing process delivering photo-grade, high-volume multi-colour print registration.",
};

const TERM_REGEX = /\b(Microns|Micron|GSM|MOQ|LLDPE|LDPE|HDPE|BOPP|CPP|PET|Rotogravure)\b|µm/g;

export interface SpecTooltipProps {
  term: string;
  children?: React.ReactNode;
}

export function SpecTooltip({ term, children }: SpecTooltipProps) {
  const definition = PACKAGING_GLOSSARY[term];
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; placement: "top" | "bottom" }>({
    top: 0,
    left: 0,
    placement: "top",
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const pointerDownRef = useRef(false);
  const wasOpenOnPointerDownRef = useRef(false);
  const tooltipId = useId();

  const updatePosition = () => {
    const el = triggerRef.current;
    if (!el || typeof window === "undefined") return;
    const rect = el.getBoundingClientRect();
    const popW = 240;
    const margin = 12;
    const centerLeft = rect.left + rect.width / 2 - popW / 2;
    const clampedLeft = Math.max(margin, Math.min(window.innerWidth - popW - margin, centerLeft));
    const placeBelow = rect.top < 120;
    setCoords({
      top: placeBelow ? rect.bottom + 8 : rect.top - 8,
      left: clampedLeft,
      placement: placeBelow ? "bottom" : "top",
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const handleOutside = (e: PointerEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!definition) {
    return <>{children ?? term}</>;
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => {
        updatePosition();
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onPointerDown={() => {
          pointerDownRef.current = true;
          wasOpenOnPointerDownRef.current = open;
        }}
        onFocus={() => {
          if (pointerDownRef.current) {
            pointerDownRef.current = false;
            return;
          }
          updatePosition();
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          pointerDownRef.current = false;
          updatePosition();
          setOpen(!wasOpenOnPointerDownRef.current);
        }}
        className="inline items-baseline text-left font-inherit text-inherit underline decoration-dotted underline-offset-4 decoration-[#457B9D]/70 hover:decoration-[#1D3557] cursor-help focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#457B9D]"
      >
        {children ?? term}
      </button>

      {open && (
        <span
          ref={popoverRef}
          id={tooltipId}
          role="tooltip"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            width: 240,
            backgroundColor: "#1D3557",
            borderColor: "#A8DADC",
            color: "#F1FAEE",
            transform: coords.placement === "top" ? "translateY(-100%)" : "translateY(0)",
          }}
          className="z-[9995] pointer-events-none block rounded-lg border border-[#A8DADC] bg-[#1D3557] p-3 text-left font-sans text-xs font-normal leading-relaxed text-[#F1FAEE] shadow-[0_12px_28px_rgba(29,53,87,0.32)]"
        >
          <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8DADC] mb-1">
            {term}
          </span>
          <span className="block">{definition}</span>
        </span>
      )}
    </span>
  );
}

export function SpecTextWithTooltips({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = new RegExp(TERM_REGEX.source, "g");
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const matchedTerm = match[0];
    parts.push(
      <SpecTooltip key={`${matchedTerm}-${match.index}`} term={matchedTerm}>
        {matchedTerm}
      </SpecTooltip>
    );
    lastIndex = match.index + matchedTerm.length;
  }

  if (lastIndex === 0) {
    return <>{text}</>;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts}</>;
}
