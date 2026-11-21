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
      className={className}
    >
      {children || (
        <>
          <span>Get a Quote</span>
          <span aria-hidden="true">&rarr;</span>
        </>
      )}
    </button>
  );
}
