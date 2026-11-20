"use client";

import { usePathname } from "next/navigation";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isInfrastructure =
    pathname === "/infrastructure" || pathname?.startsWith("/infrastructure/");

  return (
    <main
      className={`flex-1 relative z-10 bg-transparent ${
        isInfrastructure ? "pt-0" : "pt-[56px] md:pt-[72px]"
      }`}
    >
      {children}
    </main>
  );
}
