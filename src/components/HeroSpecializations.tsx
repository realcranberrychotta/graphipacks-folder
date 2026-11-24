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
            className="relative rounded-xl pl-4 pr-4 py-3.5 bg-background border border-ink/10 border-l-2 border-l-steel flex flex-col justify-between group transition-colors hover:border-steel"
          >
            {/* Spec Index Tag */}
            <div className="inline-flex items-center gap-2 self-start rounded-md bg-surface px-2.5 py-1 border border-powder">
              <span
                className="h-1.5 w-1.5 rounded-full bg-steel"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-ink uppercase">
                SPEC {meta.id} &bull; {meta.category}
              </span>
            </div>
            <p className="mt-2.5 text-sm font-medium leading-relaxed text-ink tracking-normal font-sans">
              {spec}
            </p>
          </div>
        );
      })}
    </div>
  );
}
