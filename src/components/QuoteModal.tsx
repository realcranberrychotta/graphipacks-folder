"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export function openQuoteModal(productName?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-quote-modal", { detail: { product: productName } })
    );
  }
}

export function closeQuoteModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("close-quote-modal"));
  }
}

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialProduct, setInitialProduct] = useState("");

  const handleOpen = useCallback((e: Event) => {
    const customEvent = e as CustomEvent<{ product?: string }>;
    if (customEvent.detail?.product) {
      setInitialProduct(customEvent.detail.product);
    }
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("open-quote-modal", handleOpen);
    window.addEventListener("close-quote-modal", handleClose);

    const checkHash = () => {
      if (
        window.location.hash === "#quote" ||
        window.location.hash === "#quote-modal"
      ) {
        setIsOpen(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("open-quote-modal", handleOpen);
      window.removeEventListener("close-quote-modal", handleClose);
      window.removeEventListener("hashchange", checkHash);
    };
  }, [handleOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="quote-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#071524]/85 backdrop-blur-md"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Request a Production Quote"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fluted-glass-card relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#B08D57]/30 bg-[#091B2C]/80 text-[#F8F4EC] hover:bg-[#B08D57] hover:text-[#091B2C] transition-colors duration-200 cursor-pointer"
              aria-label="Close quote dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <ContactForm initialProduct={initialProduct} isModal />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
