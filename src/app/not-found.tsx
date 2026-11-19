import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 text-[#F8F4EC]">
      <div className="rounded-3xl border border-[#B08D57]/25 border-t-[#F8F4EC]/30 bg-[#0F2A44]/80 backdrop-blur-xl md:backdrop-blur-2xl p-8 sm:p-14 shadow-2xl max-w-xl">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B08D57]">
          404 — Specification Not Located
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8F4EC] sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-base text-[#EFE8DC]">
          The requested flexible packaging resource or specification sheet could not be located in our manufacturing index.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#B08D57] hover:bg-[#9A7843] px-6 py-3 text-sm font-bold text-[#091B2C] shadow-md shadow-[#B08D57]/20 hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Return to Home &rarr;
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-xl border border-[#B08D57]/40 bg-[#091B2C]/60 px-6 py-3 text-sm font-bold text-[#F8F4EC] hover:bg-[#1B3D5E]/60 transition shadow-xs"
          >
            Browse Product Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
