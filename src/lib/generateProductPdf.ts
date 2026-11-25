import { jsPDF } from "jspdf";
import type { ProductDetailData, ProductVariant } from "@/data/products";
import { PALETTE_RGB } from "@/lib/palette";

export function generateProductPdf(
  product: ProductDetailData,
  activeVariant: ProductVariant
): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Coolors Brand Palette
  const navy = PALETTE_RGB.darkNavy; // [29, 53, 87] Dark Navy
  const steel = PALETTE_RGB.steelBlue; // [69, 123, 157] Steel Blue
  const powder = PALETTE_RGB.powderBlue; // [168, 218, 220] Powder Blue
  const honeydew = PALETTE_RGB.honeydew; // [241, 250, 238] Honeydew White
  const red = PALETTE_RGB.imperialRed; // [230, 57, 70] Imperial Red
  const surface: [number, number, number] = [237, 246, 249];
  const white: [number, number, number] = [255, 255, 255];
  const bodyText = navy;
  const mutedText = steel;

  // 1. Top Decorative Brand Bar
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageWidth, 8, "F");
  doc.setFillColor(...steel);
  doc.rect(0, 8, pageWidth, 1.2, "F");

  y = 16;

  // 2. Corporate Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...navy);
  doc.text("GRAPHIPACKSS PRIVATE LIMITED", margin, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...red);
  doc.text("EST. 1984  •  FLEXIBLE PACKAGING SOLUTION PROVIDERS", margin, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...mutedText);
  doc.text(
    "Factory & HQ: Industrial Area, Phase II, Madurai, Tamil Nadu, India",
    margin,
    y + 9
  );
  doc.text(
    "Tel: +91 422 234 5678  |  Email: info@graphipacks.com  |  Web: www.graphipacks.com",
    margin,
    y + 13
  );

  // Metadata block (Right aligned)
  const today = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...navy);
  doc.text("DATASHEET REF:", pageWidth - margin, y + 4.5, { align: "right" });
  doc.setFont("courier", "bold");
  doc.setTextColor(...bodyText);
  doc.text(
    `GP-${product.slug.substring(0, 4).toUpperCase()}-${activeVariant.key.toUpperCase()}`,
    pageWidth - margin,
    y + 9,
    { align: "right" }
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...mutedText);
  doc.text(`Issued: ${today}`, pageWidth - margin, y + 13, { align: "right" });

  y += 18;

  // Separator Rule
  doc.setDrawColor(...powder);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);

  y += 6;

  // 3. Document Title & Active Configuration Box
  doc.setFillColor(...surface);
  doc.roundedRect(margin, y, contentWidth, 23, 2, 2, "F");
  doc.setDrawColor(...powder);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 23, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...navy);
  doc.text(product.name.toUpperCase(), margin + 5, y + 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...steel);
  doc.text(
    `CATEGORY: ${product.category.toUpperCase()}   |   ACTIVE CONFIGURATION: ${activeVariant.name.toUpperCase()}`,
    margin + 5,
    y + 13
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...bodyText);
  doc.text(activeVariant.summary, margin + 5, y + 18, {
    maxWidth: contentWidth - 10,
  });

  y += 28;

  // 4. Section: Technical Specifications Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...navy);
  doc.text("01 / TECHNICAL SPECIFICATION MATRIX", margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(
    "All values reflect active variant tolerance standards. Tolerances per ASTM / IS 2508 standard.",
    margin,
    y + 4
  );

  y += 6;

  // Table Header
  const col1Width = 54;
  const rowHeight = 6.2;

  doc.setFillColor(...navy);
  doc.rect(margin, y, contentWidth, rowHeight + 1, "F");
  doc.setDrawColor(...powder);
  doc.setLineWidth(0.3);
  doc.line(margin, y + rowHeight + 1, pageWidth - margin, y + rowHeight + 1);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...honeydew);
  doc.text("ENGINEERING PARAMETER", margin + 4, y + 4.8);
  doc.text("FACTORY SPECIFICATION & TOLERANCE", margin + col1Width + 4, y + 4.8);

  y += rowHeight + 1;

  // Merge base specs with active variant overrides
  const effectiveSpecs = product.baseSpecs.map((spec) => {
    const isOverridden = Object.prototype.hasOwnProperty.call(
      activeVariant.overrides,
      spec.label
    );
    const value = isOverridden
      ? activeVariant.overrides[spec.label]
      : spec.value;
    return {
      label: spec.label,
      value,
      isOverridden,
    };
  });

  effectiveSpecs.forEach((spec, idx) => {
    const isAlt = idx % 2 === 1;
    if (isAlt) {
      doc.setFillColor(...white);
      doc.rect(margin, y, contentWidth, rowHeight, "F");
    } else {
      doc.setFillColor(...honeydew);
      doc.rect(margin, y, contentWidth, rowHeight, "F");
    }

    if (spec.isOverridden) {
      // Highlight row for active variant with subtle surface tint and steel left accent border
      doc.setFillColor(...surface);
      doc.rect(margin, y, contentWidth, rowHeight, "F");
      doc.setFillColor(...steel);
      doc.rect(margin, y, 1.8, rowHeight, "F");
    }

    doc.setDrawColor(...powder);
    doc.setLineWidth(0.15);
    doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.setTextColor(...bodyText);
    doc.text(spec.label, margin + 4, y + 4.4);

    doc.setFont("helvetica", spec.isOverridden ? "bold" : "normal");
    doc.setFontSize(7.8);
    if (spec.isOverridden) {
      doc.setTextColor(...navy);
    } else {
      doc.setTextColor(...bodyText);
    }
    const displayVal = spec.isOverridden ? `${spec.value} [Variant Defined]` : spec.value;
    doc.text(displayVal, margin + col1Width + 4, y + 4.4);

    y += rowHeight;
  });

  y += 4;

  // 5. Section: Commercial Terms & Packaging
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...navy);
  doc.text("02 / COMMERCIAL TERMS & LOGISTICS", margin, y);

  y += 4;

  const termsBoxHeight = 22;
  doc.setFillColor(...surface);
  doc.roundedRect(margin, y, contentWidth, termsBoxHeight, 2, 2, "F");
  doc.setDrawColor(...powder);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, y, contentWidth, termsBoxHeight, 2, 2, "S");

  const termsLeft = [
    { label: "Price Structure", val: product.commercialTerms.price },
    { label: "Minimum Order (MOQ)", val: product.moq },
    { label: "Production Lead Time", val: product.leadTime },
  ];

  const termsRight = [
    { label: "Sample Policy", val: product.commercialTerms.sample },
    { label: "Payment Terms", val: product.commercialTerms.payment },
    { label: "Delivery Basis", val: product.commercialTerms.delivery },
  ];

  termsLeft.forEach((t, i) => {
    const rowY = y + 5 + i * 5.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...navy);
    doc.text(`${t.label}:`, margin + 4, rowY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...bodyText);
    doc.text(t.val, margin + 36, rowY);
  });

  const midX = margin + contentWidth / 2;
  termsRight.forEach((t, i) => {
    const rowY = y + 5 + i * 5.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...navy);
    doc.text(`${t.label}:`, midX + 4, rowY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...bodyText);
    doc.text(t.val, midX + 30, rowY);
  });

  y += termsBoxHeight + 5;

  // 6. Section: Target Applications
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...navy);
  doc.text("03 / TARGET INDUSTRIAL APPLICATIONS", margin, y);

  y += 4;

  product.targetApplications.forEach((app) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...steel);
    doc.text(`• ${app.number} — ${app.title}:`, margin + 2, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...bodyText);
    doc.text(app.descriptor, margin + 8, y + 3.8, {
      maxWidth: contentWidth - 10,
    });
    y += 8.2;
  });

  // 7. Footer
  const footerY = pageHeight - 12;
  doc.setDrawColor(...powder);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...navy);
  doc.text(
    "GRAPHIPACKSS PRIVATE LIMITED — 4 DECADES OF INDUSTRIAL EXCELLENCE (EST. 1984)",
    margin,
    footerY + 2
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...mutedText);
  doc.text(
    "Confidential B2B Manufacturing Datasheet  •  Page 1 of 1",
    pageWidth - margin,
    footerY + 2,
    { align: "right" }
  );

  // Trigger download
  const filename = `Graphipackss-${product.slug}-${activeVariant.key}-specsheet.pdf`;
  doc.save(filename);
}
