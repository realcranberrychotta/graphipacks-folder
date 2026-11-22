import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 bg-light-atmosphere text-[#1C1917]">
      <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
      <div className="relative z-10 rounded-3xl border border-[#1C1917]/10 bg-[#FCF9F4] p-8 sm:p-14 max-w-xl text-[#1C1917]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A6864C]">
          404 — Specification Not Located
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1C1917] sm:text-5xl font-serif">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-base text-[#57524E] font-sans">
          The requested flexible packaging resource or specification sheet could not be located in our manufacturing index.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#3D0E18] hover:bg-[#27080F] px-6 py-3 text-sm font-bold text-[#F6F2EB] transition-colors duration-200"
          >
            Return to Home &rarr;
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-xl border border-[#1C1917]/20 bg-[#EDE6DA] px-6 py-3 text-sm font-semibold text-[#1C1917] hover:bg-[#FBF9F5] transition-colors duration-200"
          >
            Browse Product Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
