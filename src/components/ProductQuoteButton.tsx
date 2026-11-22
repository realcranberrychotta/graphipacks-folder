"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={() => router.push(`/contact?product=${encodeURIComponent(slug)}`)}
      className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#3D0E18] hover:bg-[#27080F] px-8 py-4 text-base font-bold text-[#F6F2EB] transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#3D0E18] focus:ring-offset-2 w-full sm:w-auto text-center"
    >
      <span>Request Quote for {productName}</span>
      <span aria-hidden="true">&rarr;</span>
    </motion.button>
  );
}
