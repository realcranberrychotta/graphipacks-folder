"use client";

interface HeroSpecializationsProps {
  specializations: string[];
}

const specIndices = [
  { id: "01", category: "PRINT PRECISION" },
  { id: "02", category: "POLYMER CONVERSION" },
];

export default function HeroSpecializations({
  specializations,
}: HeroSpecializationsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      {specializations.map((spec, idx) => {
        const meta = specIndices[idx] || {
          id: `0${idx + 1}`,
          category: "TECHNICAL SPEC",
        };
        return (
          <div
            key={idx}
            className="relative rounded-xl pl-4 pr-4 py-3.5 bg-[#0F2A44]/40 backdrop-blur-xl md:backdrop-blur-2xl border border-[#B08D57]/20 border-t-[#F8F4EC]/30 border-l-2 border-l-[#B08D57] shadow-[inset_0_1px_0_0_rgba(248,244,236,0.15)] flex flex-col justify-between group transition-colors hover:border-[#B08D57]/50"
          >
            {/* Recessed Dark Well for Spec Index Tag */}
            <div className="inline-flex items-center gap-2 self-start rounded-md bg-[#1B3D5E]/40 px-2.5 py-1 shadow-inner border border-[#B08D57]/25">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#B08D57]"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#F8F4EC] uppercase">
                SPEC {meta.id} &bull; {meta.category}
              </span>
            </div>
            <p className="mt-2.5 text-sm font-medium leading-relaxed text-[#F8F4EC] tracking-normal font-sans">
              {spec}
            </p>
          </div>
        );
      })}
    </div>
  );
}
