/**
 * Generates custom, zero-CLS SVG placeholder data URLs for Graphipacks products.
 * Tailored with Heritage Industrial palette: Deep Navy (#091B2C, #0F2A44), Navy Mid (#1B3D5E), Bronze (#B08D57), Warm Ivory (#F8F4EC).
 */

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
      bg1: "#091B2C",
      bg2: "#0F2A44",
      accent: "#B08D57",
      badge: "UV STABILIZED • 12-24 MO LIFESPAN",
      pattern: `
        <!-- Soil furrow perspective in bronze -->
        <path d="M0 450 Q 200 380 400 450 T 800 450" fill="none" stroke="#B08D57" stroke-width="3" opacity="0.6"/>
        <path d="M0 500 Q 200 430 400 500 T 800 500" fill="none" stroke="#F8F4EC" stroke-width="2.5" opacity="0.4"/>
        <path d="M0 550 Q 200 480 400 550 T 800 550" fill="none" stroke="#B08D57" stroke-width="2" opacity="0.3"/>
        <!-- Sun / UV rays barrier icon -->
        <circle cx="620" cy="180" r="45" fill="none" stroke="#B08D57" stroke-width="3" opacity="0.5"/>
        <circle cx="620" cy="180" r="28" fill="#B08D57" fill-opacity="0.2"/>
        <path d="M620 115 L620 128 M620 232 L620 245 M555 180 L568 180 M672 180 L685 180 M574 134 L584 144 M656 216 L666 226 M574 226 L584 216 M656 144 L666 134" stroke="#B08D57" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <!-- Plant sprout silhouette -->
        <path d="M380 340 C380 300 400 280 420 270 C410 295 400 310 395 340" fill="#F8F4EC" fill-opacity="0.7"/>
        <path d="M420 340 C420 300 400 280 380 270 C390 295 400 310 405 340" fill="#F8F4EC" fill-opacity="0.5"/>
        <path d="M400 270 L400 380" stroke="#B08D57" stroke-width="3.5" stroke-linecap="round" opacity="0.85"/>
      `,
    },
    "grow-bags": {
      bg1: "#091B2C",
      bg2: "#0F2A44",
      accent: "#F8F4EC",
      badge: "COIR SUBSTRATE • DUAL-TONE EXTRUSION",
      pattern: `
        <!-- 3D Planter Grow Bag Outline in Bronze & Ivory -->
        <rect x="290" y="140" width="220" height="260" rx="16" fill="none" stroke="#F8F4EC" stroke-width="3" opacity="0.65"/>
        <line x1="290" y1="190" x2="510" y2="190" stroke="#B08D57" stroke-width="2" stroke-dasharray="6 6" opacity="0.55"/>
        <circle cx="340" cy="360" r="6" fill="#B08D57" opacity="0.7"/>
        <circle cx="400" cy="360" r="6" fill="#B08D57" opacity="0.7"/>
        <circle cx="460" cy="360" r="6" fill="#B08D57" opacity="0.7"/>
        <circle cx="370" cy="320" r="5" fill="#F8F4EC" opacity="0.5"/>
        <circle cx="430" cy="320" r="5" fill="#F8F4EC" opacity="0.5"/>
        <path d="M400 140 C400 100 425 80 445 75 C435 95 425 110 415 140" fill="#B08D57" fill-opacity="0.8"/>
        <path d="M400 140 C400 100 375 80 355 75 C365 95 375 110 385 140" fill="#F8F4EC" fill-opacity="0.6"/>
        <line x1="400" y1="80" x2="400" y2="150" stroke="#B08D57" stroke-width="3" opacity="0.9"/>
      `,
    },
    "coir-pith-bags": {
      bg1: "#091B2C",
      bg2: "#0F2A44",
      accent: "#B08D57",
      badge: "HEAVY DUTY • EXPORT BULK PACKAGING",
      pattern: `
        <!-- Isometric 50L / 5kg Block Bale in Bronze Lines -->
        <polygon points="260,180 540,180 600,250 320,250" fill="none" stroke="#B08D57" stroke-width="3" opacity="0.65"/>
        <polygon points="260,180 320,250 320,380 260,310" fill="none" stroke="#B08D57" stroke-width="2.5" opacity="0.5"/>
        <polygon points="320,250 600,250 600,380 320,380" fill="none" stroke="#B08D57" stroke-width="3" opacity="0.7"/>
        <line x1="320" y1="250" x2="320" y2="380" stroke="#F8F4EC" stroke-width="3" opacity="0.75"/>
        <line x1="460" y1="250" x2="460" y2="380" stroke="#B08D57" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.5"/>
        <rect x="360" y="280" width="160" height="60" rx="8" fill="#B08D57" fill-opacity="0.2" stroke="#B08D57" stroke-width="1.5"/>
        <text x="440" y="316" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#F8F4EC" opacity="0.95">50L / 5KG BLOCK</text>
      `,
    },
    "laminated-rolls-and-pouches": {
      bg1: "#091B2C",
      bg2: "#0F2A44",
      accent: "#F8F4EC",
      badge: "MULTI-LAYER HIGH BARRIER • ROTOGRAVURE",
      pattern: `
        <!-- Concentric precision film roll cylinders in bronze/ivory -->
        <circle cx="400" cy="250" r="140" fill="none" stroke="#B08D57" stroke-width="3" opacity="0.6"/>
        <circle cx="400" cy="250" r="100" fill="none" stroke="#F8F4EC" stroke-width="2.5" opacity="0.5"/>
        <circle cx="400" cy="250" r="60" fill="none" stroke="#B08D57" stroke-width="2" opacity="0.4"/>
        <circle cx="400" cy="250" r="25" fill="#B08D57" fill-opacity="0.3" stroke="#F8F4EC" stroke-width="2"/>
        <line x1="230" y1="250" x2="570" y2="250" stroke="#B08D57" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.5"/>
        <rect x="560" y="140" width="130" height="26" rx="6" fill="#1B3D5E" fill-opacity="0.6" stroke="#B08D57" stroke-width="1"/>
        <text x="625" y="157" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="#F8F4EC">LAYER 1: PET</text>
        <rect x="560" y="175" width="130" height="26" rx="6" fill="#1B3D5E" fill-opacity="0.6" stroke="#B08D57" stroke-width="1"/>
        <text x="625" y="192" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="#F8F4EC">LAYER 2: MET</text>
        <rect x="560" y="210" width="130" height="26" rx="6" fill="#1B3D5E" fill-opacity="0.6" stroke="#B08D57" stroke-width="1"/>
        <text x="625" y="227" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="#F8F4EC">LAYER 3: LDPE</text>
      `,
    },
    "pp-and-lldpe-bags": {
      bg1: "#091B2C",
      bg2: "#0F2A44",
      accent: "#B08D57",
      badge: "HIGH-TENSILE POLYMER • CUSTOM GUSSET",
      pattern: `
        <!-- Heavy-duty Poly Bag outline in bronze -->
        <rect x="300" y="110" width="200" height="300" rx="10" fill="none" stroke="#B08D57" stroke-width="3" opacity="0.6"/>
        <line x1="330" y1="110" x2="330" y2="410" stroke="#F8F4EC" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.5"/>
        <line x1="470" y1="110" x2="470" y2="410" stroke="#F8F4EC" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.5"/>
        <rect x="300" y="390" width="200" height="20" rx="3" fill="#B08D57" fill-opacity="0.25" stroke="#B08D57" stroke-width="1.5"/>
        <line x1="300" y1="400" x2="500" y2="400" stroke="#F8F4EC" stroke-width="1" stroke-dasharray="3 3" opacity="0.7"/>
        <ellipse cx="400" cy="140" rx="35" ry="12" fill="none" stroke="#B08D57" stroke-width="2.5" opacity="0.7"/>
      `,
    },
    "wicketted-poly-bags": {
      bg1: "#091B2C",
      bg2: "#0F2A44",
      accent: "#F8F4EC",
      badge: "HIGH-SPEED AUTOMATION • PRECISION WICKET",
      pattern: `
        <!-- Wicket bar and bag stack in Bronze & Ivory -->
        <rect x="290" y="160" width="220" height="260" rx="10" fill="none" stroke="#F8F4EC" stroke-width="3" opacity="0.6"/>
        <line x1="310" y1="125" x2="490" y2="125" stroke="#B08D57" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
        <circle cx="355" cy="125" r="10" fill="#091B2C" stroke="#B08D57" stroke-width="3" opacity="0.9"/>
        <circle cx="445" cy="125" r="10" fill="#091B2C" stroke="#B08D57" stroke-width="3" opacity="0.9"/>
        <path d="M305 175 L525 175 L525 435" fill="none" stroke="#F8F4EC" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.45"/>
        <path d="M320 190 L540 190 L540 450" fill="none" stroke="#B08D57" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.35"/>
      `,
    },
  };

  const theme = themes[slug] || {
    bg1: "#091B2C",
    bg2: "#0F2A44",
    accent: "#B08D57",
    badge: "PRECISION FLEXIBLE PACKAGING",
    pattern: `
      <rect x="290" y="140" width="220" height="260" rx="12" fill="none" stroke="#B08D57" stroke-width="2.5" opacity="0.5"/>
    `,
  };

  const escapedName = name.replace(/&/g, "&amp;");
  const escapedCat = category.replace(/&/g, "&amp;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="hero-bg-${slug}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bg1}"/>
        <stop offset="100%" stop-color="${theme.bg2}"/>
      </linearGradient>
      <pattern id="hero-grid-${slug}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(176,141,87,0.12)" stroke-width="1"/>
        <circle cx="40" cy="40" r="1.5" fill="rgba(248,244,236,0.15)"/>
      </pattern>
      <linearGradient id="hero-card-edge-${slug}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0.15"/>
      </linearGradient>
    </defs>
    <!-- Background layers -->
    <rect width="100%" height="100%" fill="url(#hero-bg-${slug})"/>
    <rect width="100%" height="100%" fill="url(#hero-grid-${slug})"/>

    <!-- Decorative Top Edge Accent -->
    <rect x="0" y="0" width="800" height="4" fill="url(#hero-card-edge-${slug})"/>

    <!-- Geometric & Thematic vector artwork -->
    ${theme.pattern}

    <!-- Watermark / Technical Stamp in Top Right -->
    <g transform="translate(740, 50)" text-anchor="end">
      <rect x="-250" y="-18" width="250" height="28" rx="6" fill="rgba(9,27,44,0.7)" stroke="rgba(176,141,87,0.35)" stroke-width="1"/>
      <text x="-12" y="1" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" letter-spacing="1.2" fill="${theme.accent}">
        ${theme.badge}
      </text>
    </g>

    <!-- Bottom Metadata Panel with High Legibility & Translucent Border -->
    <rect x="40" y="460" width="720" height="100" rx="16" fill="rgba(9, 27, 44, 0.85)" stroke="rgba(176, 141, 87, 0.35)" stroke-width="1.5"/>
    <g transform="translate(70, 500)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="${theme.accent}">
        ${escapedCat.toUpperCase()}
      </text>
      <text x="0" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#F8F4EC">
        ${escapedName}
      </text>
    </g>
    <!-- Graphipacks Brand Monogram Badge inside SVG -->
    <g transform="translate(690, 510)">
      <circle cx="0" cy="0" r="22" fill="#B08D57" fill-opacity="0.25" stroke="#B08D57" stroke-width="1.5"/>
      <text x="0" y="5" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" text-anchor="middle" fill="#F8F4EC">
        GP
      </text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
