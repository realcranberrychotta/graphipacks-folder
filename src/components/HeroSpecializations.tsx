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
            className="relative rounded-xl pl-4 pr-4 py-3.5 bg-[#FBF9F5] border border-[#1C1917]/10 border-l-2 border-l-[#A6864C] flex flex-col justify-between group transition-colors hover:border-[#A6864C]"
          >
            {/* Spec Index Tag */}
            <div className="inline-flex items-center gap-2 self-start rounded-md bg-[#EDE6DA] px-2.5 py-1 border border-[#A6864C]/25">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#3D0E18]"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1C1917] uppercase">
                SPEC {meta.id} &bull; {meta.category}
              </span>
            </div>
            <p className="mt-2.5 text-sm font-medium leading-relaxed text-[#1C1917] tracking-normal font-sans">
              {spec}
            </p>
          </div>
        );
      })}
    </div>
  );
}
