import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 bg-light-atmosphere text-ink">
      <div aria-hidden="true" className="grain-layer pointer-events-none absolute inset-0 z-[1]" />
      <div className="relative z-10 rounded-3xl border border-ink/10 bg-background p-8 sm:p-14 max-w-xl text-ink">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-steel">
          404 — Specification Not Located
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.015em] text-ink sm:text-5xl font-display leading-[1.1]">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-base text-ink/75 font-sans">
          The requested flexible packaging resource or specification sheet could not be located in our manufacturing index.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-press inline-flex items-center justify-center rounded-md bg-red hover:bg-[#d62839] px-6 py-3 text-sm font-bold text-background transition-colors duration-200"
          >
            Return to Home &rarr;
          </Link>
          <Link
            href="/products"
            className="btn-press inline-flex items-center justify-center rounded-md border border-ink/20 bg-surface px-6 py-3 text-sm font-semibold text-ink hover:bg-background transition-colors duration-200"
          >
            Browse Product Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
