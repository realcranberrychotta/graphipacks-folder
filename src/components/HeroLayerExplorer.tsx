"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Sparkles,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Crosshair,
  Sliders,
  Layers,
} from "lucide-react";
import type { FilmLayer } from "@/lib/content";

/* -------------------------------------------------------------------------- */
/* Physical Swatch Data Types & Samples                                       */
/* -------------------------------------------------------------------------- */

export type InspectionLightMode = "surface" | "backlight" | "uv";

export interface PackagingSample {
  id: string;
  code: string;
  name: string;
  category: string;
  totalMicrons: number;
  layersBreakdown: string[];
  sealType: string;
  barrierRating: string;
  machinerySpec: string;
  primaryColor: string;
  foilSheen: boolean;
  clearPoly: boolean;
  printTechnology: string;
}

const PACKAGING_SAMPLES: PackagingSample[] = [
  {
    id: "barrier-pouch",
    code: "GP-BARRIER-69",
    name: "Polyester-Poly Barrier Retort Pouch",
    category: "Laminated Foil Pouch",
    totalMicrons: 69,
    layersBreakdown: [
      "12µm BOPET (Outer Print Web)",
      "7µm MET-PET (Gas & Moisture Barrier)",
      "50µm LLDPE (Hermetic Food Sealant)",
    ],
    sealType: "8mm Knurled Diamond Crimp + Tear Notch",
    barrierRating: "OTR < 0.4 cc/m² • WVTR < 0.1 g/m²",
    machinerySpec: "Rotogravure 8-Color / High-Speed FFS",
    primaryColor: "foil",
    foilSheen: true,
    clearPoly: false,
    printTechnology: "8-Color HD Rotogravure with Metallic Gold Inks",
  },
  {
    id: "grow-mulch",
    code: "GP-AGRI-150",
    name: "Dual-Tone Co-Ex Mulch & Grow Film",
    category: "Co-Extruded Agricultural",
    totalMicrons: 150,
    layersBreakdown: [
      "75µm White UV-Reflective Outer Layer",
      "75µm Carbon Black Opaque Root Barrier",
    ],
    sealType: "Continuous Thermal Weld + Gusset Fold",
    barrierRating: "100% Opacity • 24-Mo UV Stabilization",
    machinerySpec: "Blown Film 3-Layer Co-Extrusion",
    primaryColor: "pine-dark",
    foilSheen: false,
    clearPoly: false,
    printTechnology: "Weather-Resistant Industrial Flexo",
  },
  {
    id: "wicketted-poly",
    code: "GP-WICKET-35",
    name: "Optical Clarity Wicketted Poly Bag",
    category: "Automated Bakery & Produce",
    totalMicrons: 35,
    layersBreakdown: [
      "35µm Virgin High-Clarity LDPE",
      "Engineered Low COF (< 0.15) Slip Coating",
    ],
    sealType: "Lateral Fine Wire Micro-Seals + Wicket Tabs",
    barrierRating: "High Breathability • 97% Clarity",
    machinerySpec: "High-Speed Automated Wicket Lines (300 cpm)",
    primaryColor: "clear",
    foilSheen: false,
    clearPoly: true,
    printTechnology: "High-Definition Registered Flexo Print",
  },
];

/* -------------------------------------------------------------------------- */
/* Subcomponent: Corner Torx Screw (Machined Stainless Steel)                */
/* -------------------------------------------------------------------------- */
function MilledTorxScrew({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#3d4a58] via-[#1b2b3a] to-[#091b2c] border border-[#B08D57]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_1.5px_3px_rgba(0,0,0,0.85)] flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div className="relative h-1.5 w-1.5 flex items-center justify-center">
        <span className="absolute h-[1.5px] w-1.5 bg-[#091B2C] shadow-[0_0.5px_0_rgba(255,255,255,0.2)]" />
        <span className="absolute h-1.5 w-[1.5px] bg-[#091B2C] shadow-[0.5px_0_0_rgba(255,255,255,0.2)]" />
        <span className="absolute h-[1px] w-[1px] rounded-full bg-[#B08D57]/60" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component: HeroLayerExplorer                                          */
/* -------------------------------------------------------------------------- */
export default function HeroLayerExplorer({}: {
  layers?: FilmLayer[];
}) {
  const [activeSampleIdx, setActiveSampleIdx] = useState<number>(0);
  const [lightMode, setLightMode] = useState<InspectionLightMode>("surface");
  const [isMagnifierActive] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse coordinate motion values for spring-driven interactive inspection lamp & 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 28 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D tilt transformations (gentle, authentic feel: ±5 degrees)
  const rotateX = useTransform(smoothY, [-180, 180], [4.5, -4.5]);
  const rotateY = useTransform(smoothX, [-180, 180], [-4.5, 4.5]);

  // Dynamic glare & spotlight percentage positions
  const glarePercentX = useTransform(smoothX, [-180, 180], [15, 85]);
  const glarePercentY = useTransform(smoothY, [-180, 180], [15, 85]);
  const glareBackground = useTransform(
    [glarePercentX, glarePercentY],
    ([gx, gy]) =>
      `radial-gradient(circle 180px at ${gx}% ${gy}%, rgba(255,255,255,0.85) 0%, rgba(176,141,87,0.3) 40%, transparent 80%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const currentSample = PACKAGING_SAMPLES[activeSampleIdx] ?? PACKAGING_SAMPLES[0];

  return (
    <div
      className="relative w-full max-w-xl mx-auto select-none"
      role="region"
      aria-label="Physical Packaging Swatch & Lightbox Inspection Deck"
    >
      {/* Outer Chassis: Machined Dark-Anodized Aluminum Frame */}
      <div className="relative rounded-2xl border border-[#B08D57]/35 border-t-[#F8F4EC]/60 bg-gradient-to-b from-[#132d48] via-[#0f2a44] to-[#091b2c] p-3.5 sm:p-5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(248,244,236,0.35),inset_0_-1px_0_rgba(0,0,0,0.9)]">
        {/* ─── 4 Corner Milled Machine Fasteners ─── */}
        <MilledTorxScrew className="absolute top-2.5 left-2.5 z-20" />
        <MilledTorxScrew className="absolute top-2.5 right-2.5 z-20" />
        <MilledTorxScrew className="absolute bottom-2.5 left-2.5 z-20" />
        <MilledTorxScrew className="absolute bottom-2.5 right-2.5 z-20" />

        {/* ─── Chassis Header: Engraved Nameplate & Active Illuminant Readout ─── */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#B08D57]/25 pb-3 px-1">
          <div className="flex items-center gap-2.5">
            {/* Pulsing Active Sensor Diode */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B08D57] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B08D57] shadow-[0_0_8px_#B08D57]" />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F8F4EC]">
                GRAPHIPACKS LAB-QC // BENCH 740
              </span>
              <span className="text-[9px] font-mono text-[#B08D57]/80 tracking-wider">
                PHYSICAL PACKAGING INSPECTION STAGE
              </span>
            </div>
          </div>

          {/* Calibrated Illuminant Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-sm border border-[#B08D57]/30 bg-[#091B2C] px-2 py-0.5 shadow-inner">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
            <span className="font-mono text-[9px] font-bold text-[#F8F4EC] tracking-wider uppercase">
              {lightMode === "surface"
                ? "D65 SPECULAR 45°"
                : lightMode === "backlight"
                ? "5000K TRANSMISSION"
                : "365nm UV FLUOROSCOPY"}
            </span>
          </div>
        </div>

        {/* ─── Tactile Swatch Selector Bar (Physical Milled Buttons) ─── */}
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          {PACKAGING_SAMPLES.map((sample, idx) => {
            const isSelected = activeSampleIdx === idx;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => setActiveSampleIdx(idx)}
                className={`group relative flex flex-col items-start p-2 rounded-lg border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B08D57] ${
                  isSelected
                    ? "bg-[#1B3D5E] border-[#B08D57]/60 shadow-[inset_0_1px_0_rgba(248,244,236,0.3),0_4px_12px_rgba(0,0,0,0.5)]"
                    : "bg-[#091B2C]/80 border-[#B08D57]/15 hover:bg-[#0F2A44] hover:border-[#B08D57]/35 text-[#F8F4EC]/70"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`font-mono text-[9px] font-bold tracking-wider ${
                      isSelected ? "text-[#B08D57]" : "text-[#B08D57]/70"
                    }`}
                  >
                    0{idx + 1} {"//"} STAGE
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ease-in-out ${
                      isSelected
                        ? "bg-[#B08D57] shadow-[0_0_6px_#B08D57]"
                        : "bg-[#1B3D5E]/60"
                    }`}
                  />
                </div>
                <span
                  className={`mt-1 font-mono text-[11px] font-bold leading-tight truncate w-full ${
                    isSelected ? "text-[#F8F4EC]" : "text-[#F8F4EC]/75"
                  }`}
                >
                  {sample.category}
                </span>
                <span className="mt-0.5 font-mono text-[9px] text-[#EFE8DC]/80 font-semibold">
                  {sample.totalMicrons}µm
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── Tactile Hardware Inspection Lamp Mode Switches ─── */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-[#B08D57]/20 bg-[#091B2C] p-1 shadow-inner">
          <div className="flex items-center gap-1.5 pl-2 font-mono text-[9px] font-bold tracking-widest text-[#B08D57]/80 uppercase">
            <Sliders className="h-3 w-3 text-[#B08D57]" />
            <span>OPTICAL MODE:</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Mode 1: Surface Reflection */}
            <button
              type="button"
              onClick={() => setLightMode("surface")}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ease-in-out ${
                lightMode === "surface"
                  ? "bg-gradient-to-r from-[#B08D57] to-[#E5CCA0] text-[#091B2C] shadow-sm font-extrabold"
                  : "bg-transparent text-[#F8F4EC]/65 hover:text-[#F8F4EC] hover:bg-[#0F2A44]"
              }`}
            >
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>SURFACE GLOSS</span>
            </button>

            {/* Mode 2: Diffuse Backlight Transmission */}
            <button
              type="button"
              onClick={() => setLightMode("backlight")}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ease-in-out ${
                lightMode === "backlight"
                  ? "bg-gradient-to-r from-[#F8F4EC] to-[#E5CCA0] text-[#091B2C] shadow-sm font-extrabold"
                  : "bg-transparent text-[#F8F4EC]/65 hover:text-[#F8F4EC] hover:bg-[#0F2A44]"
              }`}
            >
              <Eye className="h-3 w-3 shrink-0" />
              <span>BACKLIGHT</span>
            </button>

            {/* Mode 3: UV Pinhole Check */}
            <button
              type="button"
              onClick={() => setLightMode("uv")}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ease-in-out ${
                lightMode === "uv"
                  ? "bg-gradient-to-r from-[#a855f7] to-[#38bdf8] text-[#091B2C] shadow-sm font-extrabold"
                  : "bg-transparent text-[#F8F4EC]/65 hover:text-[#F8F4EC] hover:bg-[#0F2A44]"
              }`}
            >
              <ShieldCheck className="h-3 w-3 shrink-0" />
              <span>365nm UV</span>
            </button>
          </div>
        </div>

        {/* ─── Swatch Lightbox Bed (Recessed Stage with 3D Tilt) ─── */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mt-3.5 h-[340px] sm:h-[360px] w-full overflow-hidden rounded-xl border border-[#B08D57]/30 bg-[#091B2C] shadow-[inset_0_4px_16px_rgba(0,0,0,0.9),0_1px_0_rgba(248,244,236,0.15)] flex items-center justify-center cursor-crosshair perspective-[1000px]"
        >
          {/* Internal Ground-Glass Diffuse Lightbox Grid */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out pointer-events-none ${
              lightMode === "backlight"
                ? "opacity-60 bg-[radial-gradient(circle_at_center,rgba(248,244,236,0.35)_0%,rgba(27,61,94,0.3)_60%,transparent_100%)]"
                : lightMode === "uv"
                ? "opacity-75 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.35)_0%,rgba(14,165,233,0.15)_60%,transparent_100%)]"
                : "opacity-20"
            }`}
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#B08D5715_1px,transparent_1px),linear-gradient(to_bottom,#B08D5715_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Calibrated Measurement Scale Rulers on Left & Bottom */}
          <div className="absolute left-2 top-3 bottom-3 w-4 flex flex-col justify-between font-mono text-[7px] text-[#B08D57]/45 pointer-events-none select-none">
            <span>250mm</span>
            <span className="w-2 h-[1px] bg-[#B08D57]/30" />
            <span>150mm</span>
            <span className="w-2 h-[1px] bg-[#B08D57]/30" />
            <span>000mm</span>
          </div>

          {/* ─── PHYSICAL PACKAGING SWATCH (Interactive 3D Layer) ─── */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[82%] sm:w-[78%] h-[88%] rounded-lg transition-transform duration-75"
          >
            {/* Physical Pouch Body */}
            <div
              className={`relative h-full w-full rounded-md overflow-hidden border shadow-2xl transition-all duration-300 ${
                currentSample.foilSheen
                  ? "border-[#B08D57]/40 bg-gradient-to-br from-[#1B3D5E] via-[#0F2A44] to-[#091B2C]"
                  : currentSample.clearPoly
                  ? "border-[#B08D57]/40 bg-[#0F2A44]/30 backdrop-blur-xs"
                  : "border-[#B08D57]/30 bg-gradient-to-b from-[#1B3D5E] to-[#091B2C]"
              }`}
            >
              {/* Dynamic Metallized Foil Specular Glint (Tracks Cursor in Surface mode) */}
              {lightMode === "surface" && (
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-90 transition-opacity"
                  style={{
                    background: glareBackground,
                  }}
                />
              )}

              {/* Dynamic Backlight Transmission Glow */}
              {lightMode === "backlight" && (
                <div className="absolute inset-0 pointer-events-none bg-radial from-[#F8F4EC]/35 via-[#B08D57]/15 to-transparent mix-blend-screen animate-pulse duration-1000" />
              )}

              {/* Dynamic 365nm UV Fluoroscopy Glow (Seal Integrity Inspection) */}
              {lightMode === "uv" && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#7e22ce]/25 via-transparent to-[#06b6d4]/25 mix-blend-color-dodge" />
              )}

              {/* ─── Authentically Crimped Heat-Seals (Waffled/Knurled 4mm Matrix) ─── */}
              {/* Top Heat-Seal Crimp + Hanging Hole / Wicket Bar */}
              <div
                className={`relative h-7 w-full border-b flex items-center justify-between px-4 transition-colors ${
                  lightMode === "uv"
                    ? "border-[#B08D57] bg-[#B08D57]/25 shadow-[0_0_12px_#B08D57]"
                    : "border-[#B08D57]/35 bg-[repeating-linear-gradient(45deg,rgba(176,141,87,0.12)_0px,rgba(176,141,87,0.12)_2px,transparent_2px,transparent_4px)]"
                }`}
              >
                {/* Wicket Holes or Seal Notch */}
                {currentSample.clearPoly ? (
                  <div className="flex w-full items-center justify-around">
                    <span className="h-2.5 w-2.5 rounded-full border border-[#B08D57] bg-[#091B2C] shadow-inner" />
                    <span className="font-mono text-[8px] font-bold text-[#F8F4EC] tracking-widest uppercase">
                      AUTOMATED WICKET PIN REGISTRATION
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full border border-[#B08D57] bg-[#091B2C] shadow-inner" />
                  </div>
                ) : (
                  <>
                    <span className="font-mono text-[8px] font-extrabold uppercase tracking-widest text-[#F8F4EC]">
                      {lightMode === "uv"
                        ? "HERMETIC WELD: 100% PASS"
                        : "HERMETIC HEAT-SEAL CRIMPS (180°C)"}
                    </span>
                    <span className="font-mono text-[8px] text-[#B08D57] font-bold">
                      {currentSample.totalMicrons}µm
                    </span>
                  </>
                )}
              </div>

              {/* Left & Right Waffled Side Crimps with V-Cut Tear Notch */}
              <div
                className={`absolute left-0 top-7 bottom-7 w-2.5 border-r transition-colors ${
                  lightMode === "uv"
                    ? "border-[#B08D57] bg-[#B08D57]/30 shadow-[0_0_8px_#B08D57]"
                    : "border-[#B08D57]/25 bg-[repeating-linear-gradient(45deg,rgba(176,141,87,0.1)_0px,rgba(176,141,87,0.1)_2px,transparent_2px,transparent_4px)]"
                }`}
              >
                {/* Left Tear Notch */}
                {!currentSample.clearPoly && (
                  <div className="absolute top-10 left-0 w-1.5 h-2 bg-[#091B2C] rounded-r-xs border-r border-[#B08D57]/40 shadow-inner" />
                )}
              </div>

              <div
                className={`absolute right-0 top-7 bottom-7 w-2.5 border-l transition-colors ${
                  lightMode === "uv"
                    ? "border-[#B08D57] bg-[#B08D57]/30 shadow-[0_0_8px_#B08D57]"
                    : "border-[#B08D57]/25 bg-[repeating-linear-gradient(45deg,rgba(176,141,87,0.1)_0px,rgba(176,141,87,0.1)_2px,transparent_2px,transparent_4px)]"
                }`}
              >
                {/* Right Tear Notch */}
                {!currentSample.clearPoly && (
                  <div className="absolute top-10 right-0 w-1.5 h-2 bg-[#091B2C] rounded-l-xs border-l border-[#B08D57]/40 shadow-inner" />
                )}
              </div>

              {/* Bottom Heavy Weld Crimp */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-6 border-t flex items-center justify-between px-4 transition-colors ${
                  lightMode === "uv"
                    ? "border-[#B08D57] bg-[#B08D57]/30 shadow-[0_0_12px_#B08D57]"
                    : "border-[#B08D57]/30 bg-[repeating-linear-gradient(45deg,rgba(176,141,87,0.12)_0px,rgba(176,141,87,0.12)_2px,transparent_2px,transparent_4px)]"
                }`}
              >
                <span className="font-mono text-[8px] font-bold text-[#F8F4EC] tracking-wider uppercase">
                  BURST TEST: ASTM D1709 &gt; 420g
                </span>
                <span className="font-mono text-[8px] text-[#B08D57] font-bold">
                  {currentSample.code}
                </span>
              </div>

              {/* ─── Pouch Face Graphic & Print Typography ─── */}
              <div className="p-4 sm:p-5 pt-3 flex flex-col justify-between h-[calc(100%-52px)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B08D57]/40 bg-[#0F2A44]/80 px-2 py-0.5 font-mono text-[9px] font-bold text-[#F8F4EC]">
                      <CheckCircle2 className="h-3 w-3 text-[#B08D57]" />
                      <span>GRAPHIPACKS CERTIFIED</span>
                    </span>

                    {/* Flexo 4-Color Target Registration Marks */}
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[#00ffff] border border-white/20" title="Cyan" />
                      <span className="h-2 w-2 rounded-full bg-[#ff00ff] border border-white/20" title="Magenta" />
                      <span className="h-2 w-2 rounded-full bg-[#ffff00] border border-white/20" title="Yellow" />
                      <span className="h-2 w-2 rounded-full bg-[#000000] border border-white/20" title="Key/Black" />
                      <span className="h-2 w-2 rounded-full bg-[#B08D57] border border-white/20" title="Graphi Bronze" />
                    </div>
                  </div>

                  <h3 className="mt-3 font-serif text-base sm:text-lg font-extrabold tracking-tight text-[#F8F4EC]">
                    {currentSample.name}
                  </h3>

                  <p className="mt-1 font-mono text-[10px] text-[#F8F4EC]/80 leading-relaxed">
                    {currentSample.printTechnology}
                  </p>
                </div>

                {/* Substrate Stack Readout Inside Swatch */}
                <div className="rounded-md border border-[#B08D57]/25 bg-[#091B2C]/85 p-2.5 shadow-inner">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#B08D57] font-bold uppercase tracking-wider pb-1.5 border-b border-[#B08D57]/20">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3 w-3 text-[#B08D57]" />
                      <span>SUBSTRATE MATRIX</span>
                    </span>
                    <span className="text-[#F8F4EC] font-extrabold">
                      {currentSample.totalMicrons} MICRONS
                    </span>
                  </div>

                  <div className="mt-1.5 space-y-1">
                    {currentSample.layersBreakdown.map((lyr, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-center justify-between text-[9px] font-mono text-[#F8F4EC]/80"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="h-1 w-1 bg-[#B08D57] rounded-full" />
                          <span>{lyr}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Barcode & Machine Telemetry Strip */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#B08D57]/70">
                      BARRIER INTEGRITY
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[#F8F4EC]">
                      {currentSample.barrierRating}
                    </span>
                  </div>

                  {/* Faux Barcode Symbol */}
                  <div className="h-6 w-20 flex items-end gap-[1.5px] bg-[#091B2C] p-1 border border-[#B08D57]/20 rounded-xs">
                    {[3, 1, 4, 2, 1, 3, 2, 4, 1, 3, 2, 1, 4, 2].map((h, bIdx) => (
                      <span
                        key={bIdx}
                        className="w-[2px] bg-[#F8F4EC]"
                        style={{ height: `${h * 4}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Floating Optical Loupe / Crosshair Inspection Lamp ─── */}
          {isMagnifierActive && (
            <motion.div
              style={{
                x: smoothX,
                y: smoothY,
              }}
              className="pointer-events-none absolute z-30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            >
              {/* Loupe Lens Frame */}
              <div className="relative h-20 w-20 rounded-full border-2 border-[#F8F4EC] bg-[#B08D57]/10 backdrop-blur-xs shadow-[0_0_20px_rgba(176,141,87,0.4),inset_0_0_12px_rgba(248,244,236,0.3)] flex items-center justify-center">
                {/* Crosshairs */}
                <span className="absolute h-full w-[1px] bg-[#F8F4EC]/40" />
                <span className="absolute w-full h-[1px] bg-[#F8F4EC]/40" />
                <span className="h-2 w-2 rounded-full border border-[#B08D57] bg-transparent" />

                {/* Live Loupe Coordinate Readout Flag */}
                <div className="absolute -top-6 -right-16 whitespace-nowrap rounded border border-[#B08D57]/40 bg-[#091B2C]/90 px-1.5 py-0.5 font-mono text-[8px] font-bold text-[#F8F4EC] shadow-md">
                  MICRON TEST: PASS
                </div>
              </div>
            </motion.div>
          )}

          {/* Interactive Hint Overlay */}
          <div className="absolute bottom-2 right-3 pointer-events-none flex items-center gap-1.5 font-mono text-[9px] text-[#B08D57]/80 uppercase tracking-widest bg-[#091B2C]/75 px-2 py-0.5 rounded border border-[#B08D57]/20 backdrop-blur-xs">
            <Crosshair className="h-3 w-3 text-[#B08D57] animate-pulse" />
            <span>Hover to steer inspection lamp</span>
          </div>
        </div>

        {/* ─── Bottom Telemetry & Machinery Specification Console ─── */}
        <div className="mt-3.5 rounded-xl border border-[#B08D57]/25 bg-[#091B2C] p-3 shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            <div>
              <span className="block font-mono text-[8px] font-bold uppercase tracking-wider text-[#B08D57]/80">
                SEALING SPECIFICATION
              </span>
              <p className="mt-0.5 font-mono text-[11px] font-bold text-[#F8F4EC] truncate">
                {currentSample.sealType}
              </p>
            </div>

            <div>
              <span className="block font-mono text-[8px] font-bold uppercase tracking-wider text-[#B08D57]/80">
                MACHINERY COMPATIBILITY
              </span>
              <p className="mt-0.5 font-mono text-[11px] font-bold text-[#F8F4EC] truncate">
                {currentSample.machinerySpec}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 flex sm:flex-col justify-between sm:justify-start items-center sm:items-start border-t sm:border-t-0 border-[#B08D57]/15 pt-2 sm:pt-0">
              <span className="block font-mono text-[8px] font-bold uppercase tracking-wider text-[#B08D57]/80">
                DEFECT TELEMETRY
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#B08D57]">
                <CheckCircle2 className="h-3 w-3" />
                <span>0.00% PIN-HOLES</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
