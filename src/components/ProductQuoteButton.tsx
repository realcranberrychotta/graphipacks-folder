"use client";

import { useRouter } from "next/navigation";

interface ProductQuoteButtonProps {
  slug: string;
  productName: string;
}

export default function ProductQuoteButton({
  slug,
  productName,
}: ProductQuoteButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/contact?product=${encodeURIComponent(slug)}`)}
      className="btn-press inline-flex items-center justify-center gap-2.5 rounded-xl bg-red hover:bg-[#d62839] px-8 py-4 text-base font-bold text-background border border-red transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-red focus:ring-offset-2 w-full sm:w-auto text-center"
    >
      <span>Request Quote for {productName}</span>
      <span aria-hidden="true">&rarr;</span>
    </button>
  );
}
