"use client";

import { openQuoteModal } from "@/components/QuoteModal";

interface QuoteTriggerButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function QuoteTriggerButton({
  className,
  children,
}: QuoteTriggerButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openQuoteModal()}
      className={`btn-press btn-tactile group ${className || ""}`.trim()}
    >
      {children || (
        <>
          <span>Get a Quote</span>
          <span className="tactile-arrow ml-1" aria-hidden="true">&rarr;</span>
        </>
      )}
    </button>
  );
}
