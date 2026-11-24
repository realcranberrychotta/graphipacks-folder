'use client';

import React from 'react';
import LogoLoop, { LogoItem } from './logo-loop';

export const CLIENT_ROW_1: LogoItem[] = [
  { title: "The Spice Club" },
  { title: "Elite Foods" },
  { title: "Maagrita Foods" },
  { title: "Pelemix" },
  { title: "Dutch Plantin" },
  { title: "Remmy" },
  { title: "Eco Green Coir" },
  { title: "Fibredust" },
];

export const CLIENT_ROW_2: LogoItem[] = [
  { title: "Flubbers" },
  { title: "Mahesh Value Group" },
  { title: "Surya" },
  { title: "Vasu" },
  { title: "Me Fresh" },
  { title: "Meet & Eat" },
  { title: "OrgFarm" },
  { title: "Modern" },
];

export const renderPartnerLogo = (item: LogoItem, key: React.Key) => (
  <div key={key} className="flex items-center gap-6 sm:gap-8 group/partner cursor-default select-none">
    <span className="font-sans text-lg sm:text-xl md:text-2xl font-semibold tracking-[-0.01em] text-[#1D3557]/75 group-hover/partner:text-[#1D3557] group-hover/partner:scale-[1.02] transition-[transform,color] duration-200 whitespace-nowrap">
      {item.title}
    </span>
    <span className="text-[#457B9D] text-[10px] sm:text-xs select-none" aria-hidden="true">
      ◆
    </span>
  </div>
);

export function EnterpriseClientMarquee() {
  return (
    <div className="relative z-10 w-full border-y border-[#A8DADC] bg-[#F1FAEE] py-6 md:py-8 space-y-6 md:space-y-8 overflow-hidden">
      {/* Row 1: Leftward */}
      <LogoLoop
        logos={CLIENT_ROW_1}
        speed={40}
        direction="left"
        layout="line"
        fadeOut={true}
        fadeOutWidth={0.12}
        pauseOnHover={true}
        gap={48}
        logoHeight={28}
        renderItem={renderPartnerLogo}
        ariaLabel="Verified Enterprise Partners Row 1"
      />

      {/* Row 2: Rightward */}
      <LogoLoop
        logos={CLIENT_ROW_2}
        speed={40}
        direction="right"
        layout="line"
        fadeOut={true}
        fadeOutWidth={0.12}
        pauseOnHover={true}
        gap={48}
        logoHeight={28}
        renderItem={renderPartnerLogo}
        ariaLabel="Verified Enterprise Partners Row 2"
      />
    </div>
  );
}

export default EnterpriseClientMarquee;
