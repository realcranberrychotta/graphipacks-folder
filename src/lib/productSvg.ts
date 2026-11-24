/**
 * Generates custom, zero-CLS SVG placeholder data URLs for Graphipacks products.
 * Tailored with Coolors palette: Dark Navy (#1D3557), Steel Blue (#457B9D), Powder Blue (#A8DADC), Honeydew (#F1FAEE), Imperial Red (#E63946).
 */

import { PALETTE } from "@/lib/palette";

interface ThemeConfig {
  bg1: string;
  bg2: string;
  accent: string;
  pattern: string;
  badge: string;
}

export function getProductHeroSvg(slug: string, name: string, category: string): string {
  const themes: Record<string, ThemeConfig> = {
    "agriculture-mulch-film": {
      bg1: "#152740",
      bg2: PALETTE.darkNavy,
      accent: PALETTE.steelBlue,
      badge: "UV STABILIZED • 12-24 MO LIFESPAN",
      pattern: `
        <!-- Soil furrow perspective in steel blue -->
        <path d="M0 450 Q 200 380 400 450 T 800 450" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="3" opacity="0.6"/>
        <path d="M0 500 Q 200 430 400 500 T 800 500" fill="none" stroke="${PALETTE.honeydew}" stroke-width="2.5" opacity="0.4"/>
        <path d="M0 550 Q 200 480 400 550 T 800 550" fill="none" stroke="${PALETTE.powderBlue}" stroke-width="2" opacity="0.3"/>
        <!-- Sun / UV rays barrier icon -->
        <circle cx="620" cy="180" r="45" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="3" opacity="0.5"/>
        <circle cx="620" cy="180" r="28" fill="${PALETTE.steelBlue}" fill-opacity="0.2"/>
        <path d="M620 115 L620 128 M620 232 L620 245 M555 180 L568 180 M672 180 L685 180 M574 134 L584 144 M656 216 L666 226 M574 226 L584 216 M656 144 L666 134" stroke="${PALETTE.steelBlue}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <!-- Plant sprout silhouette -->
        <path d="M380 340 C380 300 400 280 420 270 C410 295 400 310 395 340" fill="${PALETTE.honeydew}" fill-opacity="0.7"/>
        <path d="M420 340 C420 300 400 280 380 270 C390 295 400 310 405 340" fill="${PALETTE.honeydew}" fill-opacity="0.5"/>
        <path d="M400 270 L400 380" stroke="${PALETTE.steelBlue}" stroke-width="3.5" stroke-linecap="round" opacity="0.85"/>
      `,
    },
    "grow-bags": {
      bg1: "#152740",
      bg2: PALETTE.darkNavy,
      accent: PALETTE.honeydew,
      badge: "COIR SUBSTRATE • DUAL-TONE EXTRUSION",
      pattern: `
        <!-- 3D Planter Grow Bag Outline in Steel & Honeydew -->
        <rect x="290" y="140" width="220" height="260" rx="16" fill="none" stroke="${PALETTE.honeydew}" stroke-width="3" opacity="0.65"/>
        <line x1="290" y1="190" x2="510" y2="190" stroke="${PALETTE.steelBlue}" stroke-width="2" stroke-dasharray="6 6" opacity="0.55"/>
        <circle cx="340" cy="360" r="6" fill="${PALETTE.steelBlue}" opacity="0.7"/>
        <circle cx="400" cy="360" r="6" fill="${PALETTE.steelBlue}" opacity="0.7"/>
        <circle cx="460" cy="360" r="6" fill="${PALETTE.steelBlue}" opacity="0.7"/>
        <circle cx="370" cy="320" r="5" fill="${PALETTE.honeydew}" opacity="0.5"/>
        <circle cx="430" cy="320" r="5" fill="${PALETTE.honeydew}" opacity="0.5"/>
        <path d="M400 140 C400 100 425 80 445 75 C435 95 425 110 415 140" fill="${PALETTE.steelBlue}" fill-opacity="0.8"/>
      `,
    },
    "coir-pith-bags": {
      bg1: "#152740",
      bg2: PALETTE.darkNavy,
      accent: PALETTE.steelBlue,
      badge: "HEAVY DUTY • EXPORT PACKAGING",
      pattern: `
        <!-- High-Capacity Cube / Bale Perspective Wireframe -->
        <polygon points="260,200 440,150 560,210 380,265" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="2.5" opacity="0.7"/>
        <polygon points="260,200 380,265 380,410 260,345" fill="${PALETTE.steelBlue}" fill-opacity="0.12" stroke="${PALETTE.honeydew}" stroke-width="2.5" opacity="0.8"/>
        <polygon points="380,265 560,210 560,355 380,410" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="2.5" opacity="0.5"/>
        <line x1="260" y1="345" x2="380" y2="410" stroke="${PALETTE.honeydew}" stroke-width="2" opacity="0.6"/>
        <text x="440" y="316" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="${PALETTE.honeydew}" opacity="0.95">50L / 5KG BLOCK</text>
      `,
    },
    "laminated-rolls-and-pouches": {
      bg1: "#152740",
      bg2: PALETTE.darkNavy,
      accent: PALETTE.honeydew,
      badge: "HIGH BARRIER • 8-COLOR ROTOGRAVURE",
      pattern: `
        <!-- Concentric Master Roll & Multi-Layer Barrier Schematic -->
        <circle cx="400" cy="250" r="140" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="3" opacity="0.6"/>
        <circle cx="400" cy="250" r="100" fill="none" stroke="${PALETTE.honeydew}" stroke-width="2.5" opacity="0.5"/>
        <circle cx="400" cy="250" r="60" fill="none" stroke="${PALETTE.powderBlue}" stroke-width="2" opacity="0.4"/>
        <circle cx="400" cy="250" r="25" fill="${PALETTE.steelBlue}" fill-opacity="0.3" stroke="${PALETTE.honeydew}" stroke-width="2"/>
        <line x1="230" y1="250" x2="570" y2="250" stroke="${PALETTE.powderBlue}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.5"/>
        <rect x="560" y="140" width="130" height="26" rx="6" fill="${PALETTE.darkNavy}" fill-opacity="0.6" stroke="${PALETTE.powderBlue}" stroke-width="1"/>
        <text x="625" y="157" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="${PALETTE.honeydew}">LAYER 1: PET</text>
        <rect x="560" y="175" width="130" height="26" rx="6" fill="${PALETTE.darkNavy}" fill-opacity="0.6" stroke="${PALETTE.powderBlue}" stroke-width="1"/>
        <text x="625" y="192" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="${PALETTE.honeydew}">LAYER 2: MET</text>
        <rect x="560" y="210" width="130" height="26" rx="6" fill="${PALETTE.darkNavy}" fill-opacity="0.6" stroke="${PALETTE.powderBlue}" stroke-width="1"/>
        <text x="625" y="227" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="${PALETTE.honeydew}">LAYER 3: LDPE</text>
      `,
    },
    "pp-and-lldpe-bags": {
      bg1: "#152740",
      bg2: PALETTE.darkNavy,
      accent: PALETTE.steelBlue,
      badge: "OPTICAL CLARITY • HIGH TENSILE",
      pattern: `
        <!-- High-Gloss Transparent Poly Bag Silhouette with Side Gussets -->
        <rect x="300" y="110" width="200" height="300" rx="10" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="3" opacity="0.6"/>
        <line x1="330" y1="110" x2="330" y2="410" stroke="${PALETTE.honeydew}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.5"/>
        <line x1="470" y1="110" x2="470" y2="410" stroke="${PALETTE.honeydew}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.5"/>
        <rect x="300" y="390" width="200" height="20" rx="3" fill="${PALETTE.steelBlue}" fill-opacity="0.25" stroke="${PALETTE.steelBlue}" stroke-width="1.5"/>
        <line x1="300" y1="400" x2="500" y2="400" stroke="${PALETTE.honeydew}" stroke-width="1" stroke-dasharray="3 3" opacity="0.7"/>
        <ellipse cx="400" cy="140" rx="35" ry="12" fill="none" stroke="${PALETTE.powderBlue}" stroke-width="2.5" opacity="0.7"/>
      `,
    },
    "wicked-poly-bags": {
      bg1: "#152740",
      bg2: PALETTE.darkNavy,
      accent: PALETTE.honeydew,
      badge: "AUTOMATED PACKING • PRECISION PERFORATED",
      pattern: `
        <!-- Wicket Wire Dispenser Spindle & Stacked Bag Array -->
        <rect x="290" y="160" width="220" height="260" rx="10" fill="none" stroke="${PALETTE.honeydew}" stroke-width="3" opacity="0.6"/>
        <line x1="310" y1="125" x2="490" y2="125" stroke="${PALETTE.steelBlue}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
        <circle cx="355" cy="125" r="10" fill="${PALETTE.darkNavy}" stroke="${PALETTE.powderBlue}" stroke-width="3" opacity="0.9"/>
        <circle cx="445" cy="125" r="10" fill="${PALETTE.darkNavy}" stroke="${PALETTE.powderBlue}" stroke-width="3" opacity="0.9"/>
        <path d="M305 175 L525 175 L525 435" fill="none" stroke="${PALETTE.honeydew}" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.45"/>
        <path d="M320 190 L540 190 L540 450" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.35"/>
      `,
    },
  };

  const current = themes[slug] || {
    bg1: "#152740",
    bg2: PALETTE.darkNavy,
    accent: PALETTE.steelBlue,
    badge: "CUSTOM CONVERSION",
    pattern: `
      <rect x="290" y="140" width="220" height="260" rx="12" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="2.5" opacity="0.5"/>
    `,
  };

  const rawSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${current.bg1}"/>
          <stop offset="100%" stop-color="${current.bg2}"/>
        </linearGradient>
        <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="${PALETTE.powderBlue}" opacity="0.2"/>
        </pattern>
        <pattern id="diagGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 40 L 40 0 M 0 0 L 40 40" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="0.5" opacity="0.1"/>
        </pattern>
        <radialGradient id="specular" cx="65%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15"/>
          <stop offset="50%" stop-color="${PALETTE.powderBlue}" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
        </radialGradient>
      </defs>

      <!-- Base Canvas Background -->
      <rect width="800" height="500" fill="url(#bgGrad)"/>
      <rect width="800" height="500" fill="url(#diagGrid)"/>
      <rect width="800" height="500" fill="url(#dotGrid)"/>

      <!-- Editorial Framing Hairlines -->
      <rect x="20" y="20" width="760" height="460" rx="8" fill="none" stroke="${PALETTE.steelBlue}" stroke-width="1" opacity="0.3"/>
      <rect x="28" y="28" width="744" height="444" rx="4" fill="none" stroke="${PALETTE.honeydew}" stroke-width="0.5" opacity="0.2"/>

      <!-- Central Product Geometric Wireframe Illustration -->
      <g>
        ${current.pattern}
      </g>

      <!-- Gloss & Specular Depth Layer -->
      <rect width="800" height="500" fill="url(#specular)" style="mix-blend-mode: screen;"/>

      <!-- Header Corner Callout: Category & Badge -->
      <g transform="translate(50, 60)">
        <text x="0" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="${PALETTE.powderBlue}" opacity="0.95">
          ${category.toUpperCase()} • INDUSTRIAL SPEC
        </text>
        <text x="0" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="${PALETTE.honeydew}">
          ${name}
        </text>
      </g>

      <!-- Circular Badge: Quality Standard Stamp -->
      <g transform="translate(710, 80)">
        <circle cx="0" cy="0" r="22" fill="${PALETTE.steelBlue}" fill-opacity="0.25" stroke="${PALETTE.powderBlue}" stroke-width="1.5"/>
        <text x="0" y="5" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" text-anchor="middle" fill="${PALETTE.imperialRed}">
          1984
        </text>
      </g>
    </svg>
  `.trim().replace(/\s+/g, " ");

  return `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
}
