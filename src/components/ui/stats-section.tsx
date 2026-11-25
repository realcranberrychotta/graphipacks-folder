"use client";

import { Factory, Layers, PackageCheck, ShieldCheck } from "lucide-react";
import MaskedHeading from "./masked-heading";
import CountUp from "./count-up";

interface StatItem {
  to: number;
  suffix: string;
  unit: string;
  label: string;
  description: string;
  icon: typeof Factory;
}

const STATS_DATA: StatItem[] = [
  {
    to: 40,
    suffix: "+",
    unit: "Years",
    label: "Manufacturing Heritage",
    description: "Manufacturing heritage in Madurai since 1984",
    icon: Factory,
  },
  {
    to: 8,
    suffix: "-Colour",
    unit: "Rotogravure",
    label: "Print Precision",
    description: "High-precision rotogravure & flexo printing lines",
    icon: Layers,
  },
  {
    to: 6,
    suffix: "",
    unit: "Product Lines",
    label: "Converting Versatility",
    description: "Mulch films, grow bags, coir pith & laminated pouches",
    icon: PackageCheck,
  },
  {
    to: 16,
    suffix: "",
    unit: "Verified Partners",
    label: "Enterprise Trust",
    description: "Active corporate & agricultural export clients",
    icon: ShieldCheck,
  },
];

interface StatsProps {
  className?: string;
}

export function Stats({ className = "" }: StatsProps) {
  return (
    <section
      id="manufacturing-scale"
      className={`relative overflow-hidden bg-light-atmosphere-alt border-y border-powder py-12 lg:py-16 text-ink ${className}`}
    >
      {/* Tactile Archival Grain Layer */}
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 z-[1]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Eyebrow + Heading + Paragraph */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-powder/50 bg-powder/15 px-3.5 py-1 text-[11px] font-mono font-medium tracking-wider text-steel uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full bg-red"
                aria-hidden="true"
              />
              <span>MANUFACTURING SCALE • EST. 1984</span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel">
                05 / MANUFACTURING SCALE
              </span>
              <MaskedHeading
                as="h2"
                className="text-3xl sm:text-4xl lg:text-[2.65rem] font-display font-bold leading-[1.16] tracking-[-0.015em] text-navy text-left"
              >
                Four decades of consistent, high-volume converting.
              </MaskedHeading>
              <p className="mt-2 text-base leading-[1.7] text-ink/80 text-left max-w-xl font-sans">
                From blown film extrusion to 8-colour rotogravure printing and automated bag conversion, our Madurai plant delivers verified specs and dependable dispatch schedules for domestic and export buyers.
              </p>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Stat Cards */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
              {STATS_DATA.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.to + stat.unit}
                    className="flex flex-col justify-between rounded-md border border-powder/60 bg-background p-6 transition-colors duration-200 hover:border-steel shadow-[0_1px_3px_rgba(29,53,87,0.04)]"
                  >
                    <IconComponent
                      className="w-5 h-5 mb-6 text-steel"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-baseline gap-2.5">
                        <CountUp
                          to={stat.to}
                          suffix={stat.suffix}
                          duration={0.9}
                          easing="easeOut"
                          trigger="view"
                          className="text-3xl sm:text-4xl font-display font-bold text-navy tracking-tight tabular-nums"
                        />
                        <span className="font-mono text-xs font-medium text-steel">
                          {stat.unit}
                        </span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-ink/80 leading-relaxed font-sans">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
