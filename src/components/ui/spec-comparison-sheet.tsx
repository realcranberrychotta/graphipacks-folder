"use client";

import { useMemo, useState } from "react";
import { Check, ArrowRight, ShieldCheck, SlidersHorizontal } from "lucide-react";
import type { ProductDetailData, ProductVariant } from "@/data/products";
import { cn } from "@/lib/utils";

export interface SpecComparisonSheetProps {
  product: ProductDetailData;
  activeVariantKey?: string;
  onSelectVariant?: (key: string) => void;
  onOpenQuoteModal?: (variantName?: string) => void;
  className?: string;
}

interface ComputedSpecRow {
  label: string;
  note?: string;
  values: Record<string, string>;
  differs: boolean;
}

export function SpecComparisonSheet({
  product,
  activeVariantKey,
  onSelectVariant,
  onOpenQuoteModal,
  className = "",
}: SpecComparisonSheetProps) {
  const variants = useMemo(() => product.variants || [], [product.variants]);

  // Active compared variant keys (up to 3)
  const [comparedKeys, setComparedKeys] = useState<string[]>(() => {
    return variants.slice(0, 3).map((v) => v.key);
  });

  const [differencesOnly, setDifferencesOnly] = useState<boolean>(false);

  // Filtered variants to compare
  const comparedVariants = useMemo(() => {
    const list = variants.filter((v) => comparedKeys.includes(v.key));
    // Fallback if none match
    return list.length >= 2 ? list : variants.slice(0, 3);
  }, [variants, comparedKeys]);

  // Handler to toggle variants when product has > 3 variants
  const toggleVariant = (key: string) => {
    if (comparedKeys.includes(key)) {
      if (comparedKeys.length > 2) {
        setComparedKeys(comparedKeys.filter((k) => k !== key));
      }
    } else {
      if (comparedKeys.length < 3) {
        setComparedKeys([...comparedKeys, key]);
      } else {
        // Keep active variant if possible, swap the other
        const nonActiveIndex = comparedKeys.findIndex((k) => k !== activeVariantKey);
        const newKeys = [...comparedKeys];
        if (nonActiveIndex !== -1) {
          newKeys[nonActiveIndex] = key;
        } else {
          newKeys[2] = key;
        }
        setComparedKeys(newKeys);
      }
    }
  };

  // Compute rows dynamically across compared variants
  const allRows = useMemo<ComputedSpecRow[]>(() => {
    if (comparedVariants.length < 2) return [];

    const rows: ComputedSpecRow[] = [];

    // Row 0: Target Formulation / Application Summary
    const summaryValues: Record<string, string> = {};
    comparedVariants.forEach((v) => {
      summaryValues[v.key] = v.summary;
    });
    const summaryDiffers = comparedVariants.some(
      (v) =>
        v.summary.trim().toLowerCase() !==
        comparedVariants[0].summary.trim().toLowerCase()
    );
    rows.push({
      label: "Target Formulation",
      note: "Engineered application purpose for designated machinery/field conditions",
      values: summaryValues,
      differs: summaryDiffers,
    });

    // Base spec rows from product data
    product.baseSpecs.forEach((spec) => {
      const rowValues: Record<string, string> = {};
      comparedVariants.forEach((v) => {
        rowValues[v.key] = v.overrides[spec.label] ?? spec.value;
      });

      const firstVal = (
        comparedVariants[0]
          ? (comparedVariants[0].overrides[spec.label] ?? spec.value)
          : ""
      )
        .trim()
        .toLowerCase();

      const differs = comparedVariants.some((v) => {
        const val = (v.overrides[spec.label] ?? spec.value).trim().toLowerCase();
        return val !== firstVal;
      });

      rows.push({
        label: spec.label,
        note: spec.note,
        values: rowValues,
        differs,
      });
    });

    return rows;
  }, [product.baseSpecs, comparedVariants]);

  // Count differing rows
  const diffCount = useMemo(() => {
    return allRows.filter((r) => r.differs).length;
  }, [allRows]);

  const totalCount = allRows.length;

  // Filter visible rows based on toggle
  const visibleRows = useMemo(() => {
    if (!differencesOnly) return allRows;
    return allRows.filter((r) => r.differs);
  }, [allRows, differencesOnly]);

  // Do not render if fewer than 2 variants exist
  if (variants.length < 2) {
    return null;
  }

  const activeVariantName =
    variants.find((v) => v.key === activeVariantKey)?.name ||
    comparedVariants[0]?.name;

  return (
    <section
      id="variant-comparison"
      className={cn("mb-24 scroll-mt-32", className)}
      aria-label="Variant Specification Comparison"
    >
      <div className="border-t border-powder/40 pt-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] font-medium text-steel">
                02B / VARIANT SPEC COMPARISON &bull; <span className="text-red">EST. 1984</span>
              </span>
              <span className="h-1 w-1 rounded-full bg-red" aria-hidden="true" />
              <span className="font-mono text-[11px] text-ink/75 uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-[-0.015em] text-ink">
              Compare Specifications Side-by-Side
            </h2>

            <p className="mt-3 max-w-[64ch] text-[15px] md:text-base leading-[1.7] text-ink/75 font-sans">
              Evaluate material tolerances, gauge variations, and packaging formulations across factory-calibrated variants. Use the toggle to isolate key differentiating parameters.
            </p>
          </div>

          {/* Controls: "Show only differences" Toggle & Diff Counter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 self-start lg:self-auto shrink-0">
            <div className="flex items-center gap-3 bg-surface border border-powder/60 px-4 py-2.5 rounded-xl shadow-xs">
              <span className="font-mono text-xs font-semibold text-navy select-none">
                Show only differences
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={differencesOnly}
                onClick={() => setDifferencesOnly(!differencesOnly)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus-visible:ring-2 focus-visible:ring-steel",
                  differencesOnly ? "bg-steel" : "bg-powder/60"
                )}
                aria-label="Filter to show only differing specifications"
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-xs ring-0 transition-transform duration-200 ease-in-out",
                    differencesOnly ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>

              <span className="font-mono text-[11px] font-semibold text-steel border-l border-powder/50 pl-3">
                {differencesOnly
                  ? `Showing ${diffCount} differing`
                  : `${diffCount} of ${totalCount} differ`}
              </span>
            </div>
          </div>
        </div>

        {/* Variant Selector Pills (when product has > 3 variants) */}
        {variants.length > 3 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 p-3 bg-surface rounded-xl border border-powder/40">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-steel mr-1">
              Comparing (Select 2–3):
            </span>
            {variants.map((v) => {
              const isCompared = comparedKeys.includes(v.key);
              return (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => toggleVariant(v.key)}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-mono text-xs font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-1.5",
                    isCompared
                      ? "bg-navy text-background border border-navy"
                      : "bg-background text-ink border border-powder/60 hover:border-steel"
                  )}
                >
                  {isCompared && (
                    <Check className="h-3 w-3 text-powder" aria-hidden="true" />
                  )}
                  <span>{v.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET VIEW (>= 768px): FULL SIDE-BY-SIDE SPECIFICATION SHEET   */}
        {/* ========================================================================= */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-powder/60 bg-background shadow-[0_1px_3px_rgba(29,53,87,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-separate border-spacing-0 text-left">
              <colgroup>
                <col className={comparedVariants.length === 2 ? "w-[32%]" : "w-[25%]"} />
                {comparedVariants.map((v) => (
                  <col
                    key={v.key}
                    className={comparedVariants.length === 2 ? "w-[34%]" : "w-[25%]"}
                  />
                ))}
              </colgroup>

              {/* Table Header Row */}
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="bg-navy px-5 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider text-powder border-b-2 border-steel"
                  >
                    <span>Technical Parameter</span>
                    <span className="block text-[10px] font-normal text-powder/75 mt-0.5 normal-case font-sans">
                      Factory Specification &amp; Tolerance
                    </span>
                  </th>

                  {comparedVariants.map((v) => {
                    const isActive = v.key === activeVariantKey;
                    return (
                      <th
                        key={v.key}
                        scope="col"
                        className={cn(
                          "px-5 py-4 text-left align-bottom border-b-2 border-steel transition-colors duration-200",
                          isActive
                            ? "bg-navy/95 border-t-4 border-t-steel"
                            : "bg-navy"
                        )}
                      >
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between gap-2">
                            {isActive ? (
                              <span className="inline-flex items-center gap-1.5 rounded-sm bg-steel px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-background">
                                <span
                                  className="h-1.5 w-1.5 rounded-full bg-red"
                                  aria-hidden="true"
                                />
                                ACTIVE SPEC
                              </span>
                            ) : v.badge ? (
                              <span className="inline-flex items-center rounded-sm bg-powder/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-powder">
                                {v.badge}
                              </span>
                            ) : (
                              <span className="font-mono text-[10px] text-powder/70 uppercase tracking-wider">
                                Configuration
                              </span>
                            )}
                          </div>

                          <span className="font-display text-base sm:text-lg font-bold text-background truncate block">
                            {v.name}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Table Body Rows */}
              <tbody>
                {visibleRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={comparedVariants.length + 1}
                      className="px-6 py-12 text-center bg-surface"
                    >
                      <Check className="mx-auto h-6 w-6 text-steel mb-2" aria-hidden="true" />
                      <span className="block font-display text-base font-bold text-navy">
                        All compared specs are identical
                      </span>
                      <span className="mt-1 block text-xs text-ink/75">
                        These configurations share the exact same substrate and tolerance parameters.
                      </span>
                      <button
                        type="button"
                        onClick={() => setDifferencesOnly(false)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-steel hover:text-navy underline cursor-pointer"
                      >
                        Show all specifications
                      </button>
                    </td>
                  </tr>
                ) : (
                  visibleRows.map((row, idx) => {
                    return (
                      <tr
                        key={row.label}
                        className={cn(
                          "border-b border-powder/40 transition-colors duration-150",
                          row.differs
                            ? "bg-powder/12 hover:bg-powder/20"
                            : idx % 2 === 1
                            ? "bg-surface/35 hover:bg-surface/60"
                            : "bg-background hover:bg-surface/35"
                        )}
                      >
                        {/* Parameter Label Column */}
                        <th
                          scope="row"
                          className="relative px-5 py-3.5 align-top font-normal text-left border-r border-powder/30 border-b border-powder/40"
                        >
                          {row.differs && (
                            <span
                              className="absolute left-0 top-1 bottom-1 w-1 bg-steel rounded-r"
                              aria-hidden="true"
                            />
                          )}

                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={cn(
                                "font-mono text-xs sm:text-sm font-bold",
                                row.differs ? "text-navy" : "text-ink"
                              )}
                            >
                              {row.label}
                            </span>
                            {row.differs && (
                              <span className="shrink-0 rounded-xs bg-powder/35 border border-powder/60 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-steel">
                                Differs
                              </span>
                            )}
                          </div>

                          {row.note && (
                            <span className="mt-0.5 block text-[11px] leading-relaxed text-ink/70 font-sans">
                              {row.note}
                            </span>
                          )}
                        </th>

                        {/* Variant Value Cells */}
                        {comparedVariants.map((v) => {
                          const val = row.values[v.key];
                          const isActive = v.key === activeVariantKey;
                          return (
                            <td
                              key={v.key}
                              className={cn(
                                "px-5 py-3.5 align-top font-mono font-normal text-xs sm:text-sm tabular-nums border-r border-powder/30 border-b border-powder/40 last:border-r-0",
                                isActive && "bg-surface/30",
                                row.differs && "font-medium text-navy"
                              )}
                            >
                              <span className="leading-relaxed text-ink break-words block">
                                {val}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>

              {/* Table Action Footer */}
              <tfoot>
                <tr className="bg-surface border-t-2 border-powder/60">
                  <td className="px-5 py-4 border-r border-powder/30 text-xs text-ink/75">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-steel block">
                      Procurement Action
                    </span>
                    <span className="text-[11px] text-ink/75 block mt-0.5">
                      Select a configuration to update active drawing &amp; PDF datasheet.
                    </span>
                  </td>

                  {comparedVariants.map((v) => {
                    const isActive = v.key === activeVariantKey;
                    return (
                      <td
                        key={v.key}
                        className={cn(
                          "px-5 py-4 align-middle border-r border-powder/30 last:border-r-0",
                          isActive && "bg-surface/50"
                        )}
                      >
                        {isActive ? (
                          <button
                            type="button"
                            onClick={() => {
                              if (onOpenQuoteModal) {
                                onOpenQuoteModal(v.name);
                              } else if (onSelectVariant) {
                                onSelectVariant(v.key);
                              }
                            }}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-red hover:bg-red/90 px-4 py-2.5 text-xs font-bold text-background transition-colors duration-200 cursor-pointer shadow-xs"
                          >
                            <span>Quote This Spec</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onSelectVariant?.(v.key)}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-steel bg-background hover:bg-steel hover:text-background px-4 py-2.5 text-xs font-semibold text-navy transition-colors duration-200 cursor-pointer"
                          >
                            <span>Select Variant</span>
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Table Informational Footnote */}
          <div className="bg-surface/60 border-t border-powder/40 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-ink/75">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-steel" aria-hidden="true" />
              <span className="font-mono text-[11px]">
                Rows with light Powder Blue shading indicate differing parameter values across configurations.
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-steel font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-steel" aria-hidden="true" />
              <span>Factory Tested &bull; Batch Traceable &bull; Ex-Madurai Dispatch</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW (< 768px): VERTICAL PARAMETER CARDS (ZERO OVERFLOW)           */}
        {/* ========================================================================= */}
        <div className="block md:hidden space-y-3">
          {/* Mobile Variant Quick-Switch Tabs */}
          <div className="p-3 bg-surface rounded-xl border border-powder/50 mb-4">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-steel mb-2">
              Tap to Select Active Variant:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {comparedVariants.map((v) => {
                const isActive = v.key === activeVariantKey;
                return (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => onSelectVariant?.(v.key)}
                    className={cn(
                      "py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors duration-200 text-left cursor-pointer border flex flex-col justify-between min-h-[44px]",
                      isActive
                        ? "bg-navy text-background border-steel shadow-xs"
                        : "bg-background text-ink border-powder/60 hover:border-steel"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display font-bold text-xs truncate">
                        {v.name}
                      </span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
                      )}
                    </div>
                    {isActive ? (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-powder font-bold">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] text-ink/75 uppercase tracking-wider">
                        {v.badge || "Standard"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Spec Rows as Cards */}
          {visibleRows.length === 0 ? (
            <div className="rounded-xl border border-powder/60 bg-surface p-6 text-center">
              <Check className="mx-auto h-6 w-6 text-steel mb-2" aria-hidden="true" />
              <span className="block font-display text-base font-bold text-navy">
                All compared specs are identical
              </span>
              <span className="mt-1 block text-xs text-ink/75">
                These configurations share the exact same substrate and tolerance parameters.
              </span>
              <button
                type="button"
                onClick={() => setDifferencesOnly(false)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-steel hover:text-navy underline cursor-pointer"
              >
                Show all specifications
              </button>
            </div>
          ) : (
            visibleRows.map((row) => (
              <div
                key={row.label}
                className={cn(
                  "rounded-xl border p-4 transition-colors",
                  row.differs
                    ? "border-powder/80 bg-powder/12 shadow-xs"
                    : "border-powder/40 bg-background"
                )}
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-powder/30">
                  <div className="flex items-center gap-2">
                    {row.differs && (
                      <span className="h-2 w-2 rounded-full bg-steel shrink-0" aria-hidden="true" />
                    )}
                    <span className="font-mono text-xs font-bold text-navy uppercase tracking-wider">
                      {row.label}
                    </span>
                  </div>

                  {row.differs && (
                    <span className="font-mono text-[9px] font-bold text-steel bg-powder/30 border border-powder/60 px-2 py-0.5 rounded-xs">
                      Differs
                    </span>
                  )}
                </div>

                {row.note && (
                  <p className="mt-1.5 text-[11px] text-ink/70 font-sans leading-relaxed">
                    {row.note}
                  </p>
                )}

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {comparedVariants.map((v) => {
                    const val = row.values[v.key];
                    const isActive = v.key === activeVariantKey;
                    return (
                      <div
                        key={v.key}
                        className={cn(
                          "p-2.5 rounded-lg border",
                          isActive
                            ? "border-steel bg-surface border-l-4"
                            : "border-powder/35 bg-background"
                        )}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-mono text-[10px] font-bold text-steel uppercase truncate">
                            {v.name}
                          </span>
                          {isActive && (
                            <span className="font-mono text-[9px] font-bold text-red uppercase">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="font-mono font-normal text-ink text-xs leading-relaxed break-words">
                          {val}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          {/* Mobile Bottom Action Grid */}
          <div className="mt-6 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                if (onOpenQuoteModal) {
                  onOpenQuoteModal(activeVariantName);
                } else if (onSelectVariant && activeVariantKey) {
                  onSelectVariant(activeVariantKey);
                }
              }}
              className="btn-press w-full py-3 px-4 rounded-md bg-red hover:bg-red/90 text-xs font-bold text-background transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
            >
              <span>Quote Active Spec ({activeVariantName})</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecComparisonSheet;
