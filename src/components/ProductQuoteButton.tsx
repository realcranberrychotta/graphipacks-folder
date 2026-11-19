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
      className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#B08D57] hover:bg-[#9A7843] px-8 py-4 text-base font-bold text-[#091B2C] shadow-lg shadow-[#B08D57]/25 transition cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 w-full sm:w-auto text-center"
    >
      <span>Request Quote for {productName}</span>
      <span aria-hidden="true">&rarr;</span>
    </motion.button>
  );
}
