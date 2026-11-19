export interface ProductVariant {
  key: string;
  name: string;
  badge?: string;
  summary: string;
  overrides: Record<string, string>;
}

export interface ProductSpecRow {
  label: string;
  value: string;
  note?: string;
  isVariantDriven?: boolean;
}

export interface TargetApplication {
  number: string;
  title: string;
  descriptor: string;
}

export interface ProductImage {
  src: string;
  label: string;
  alt: string;
}

export interface ProductDetailData {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  metaDescription: string;
  moq: string;
  leadTime: string;
  packing: string;
  images: ProductImage[];
  variants: ProductVariant[];
  baseSpecs: ProductSpecRow[];
  targetApplications: TargetApplication[];
  commercialTerms: {
    price: string;
    sample: string;
    payment: string;
    delivery: string;
  };
}

export const COMMON_COMMERCIAL_TERMS = {
  price: "Price on Request",
  sample: "Free sample on request — courier extra",
  payment: "50% advance, balance before dispatch",
  delivery: "Ex-Coimbatore, PAN India",
};

export const PRODUCTS_DATA: ProductDetailData[] = [
  {
    slug: "agriculture-mulch-film",
    name: "Agriculture Mulch Film",
    category: "Agricultural Solutions",
    tagline: "Virgin LLDPE with Advanced UV Stabilization for Multi-Season Crop Protection",
    summary:
      "Engineered for commercial horticulture and fruit farming, our agriculture mulch film provides exceptional moisture conservation, active weed suppression, and root zone temperature modulation.",
    metaDescription:
      "UV-stabilized virgin LLDPE agriculture mulch film (20–30 microns) for weed control, moisture conservation, and commercial crop yields. MOQ 500 kg, factory-direct from Coimbatore.",
    moq: "500 kg",
    leadTime: "10-12 days",
    packing: "1 roll = 18-22 kg, palletised",
    images: [
      {
        src: "/images/products/mulch-film.jpg",
        label: "Field Deployment View",
        alt: "Agricultural plastic mulch film laid across commercial crop rows",
      },
      {
        src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
        label: "Extrusion Gauge & Texture",
        alt: "Silver-black dual-tone extruded polyethylene film surface close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
        label: "Commercial Farm Operation",
        alt: "Commercial farmland drip irrigation with mulch film rows",
      },
    ],
    variants: [
      {
        key: "watermelon",
        name: "Watermelon",
        badge: "Heavy Gauge",
        summary:
          "Configured for watermelon cultivation: 30 microns heavy-duty thickness, 1.2 m width in reflective silver-black.",
        overrides: {
          "Thickness / GSM": "30 microns",
          Sizes: "Width: 1.2 m (Length: 400 m / roll)",
          Colour: "Silver-Black",
        },
      },
      {
        key: "tomatoes",
        name: "Tomatoes",
        badge: "Standard Field",
        summary:
          "Configured for tomato crop rows: 25 microns standard gauge, 0.9 m width in light-blocking solid black.",
        overrides: {
          "Thickness / GSM": "25 microns",
          Sizes: "Width: 0.9 m (Length: 400 m / roll)",
          Colour: "Black",
        },
      },
      {
        key: "brinjal",
        name: "Brinjal",
        badge: "Economical Field",
        summary:
          "Configured for brinjal / eggplants: 20 microns gauge, 0.9 m width in thermal absorption black.",
        overrides: {
          "Thickness / GSM": "20 microns",
          Sizes: "Width: 0.9 m (Length: 400 m / roll)",
          Colour: "Black",
        },
      },
    ],
    baseSpecs: [
      { label: "Material", value: "Virgin LLDPE + UV Masterbatch" },
      {
        label: "Thickness / GSM",
        value: "20, 25, 30 microns — Standard: 25 microns",
        isVariantDriven: true,
      },
      {
        label: "Sizes",
        value: "0.9 m, 1.2 m, 1.5 m (Length: 400 m / roll)",
        isVariantDriven: true,
      },
      {
        label: "Colour",
        value: "Black, Silver-Black, Black-White",
        isVariantDriven: true,
      },
      { label: "Print", value: "Custom on request (unprinted standard)" },
      {
        label: "UV Life",
        value: "2% UV, field life 6-8 months",
      },
      {
        label: "Tensile Strength",
        value: "22 MPa (MD) / 20 MPa (TD)",
      },
      {
        label: "Puncture Resistance",
        value: "High — for stony soil",
      },
      { label: "Lead Time", value: "10-12 days" },
      { label: "Packing", value: "1 roll = 18-22 kg, palletised" },
      { label: "MOQ", value: "500 kg" },
    ],
    targetApplications: [
      {
        number: "01",
        title: "Weed Suppression",
        descriptor:
          "Blocks photosynthetically active radiation to prevent weed germination beneath the film, eliminating reliance on chemical herbicides.",
      },
      {
        number: "02",
        title: "Moisture Retention",
        descriptor:
          "Reduces surface soil evaporation and preserves uniform subterranean moisture around root zones, reducing drip irrigation frequency.",
      },
      {
        number: "03",
        title: "Soil Temperature Control",
        descriptor:
          "Regulates root-bed thermal equilibrium across day and night temperature swings to accelerate early vegetative development.",
      },
      {
        number: "04",
        title: "Target Crop Cultivation",
        descriptor:
          "Specific film formulations and gauge profiles engineered for commercial watermelon, tomato, brinjal, and chilli farming.",
      },
    ],
    commercialTerms: COMMON_COMMERCIAL_TERMS,
  },
  {
    slug: "grow-bags",
    name: "Grow Bags",
    category: "Agricultural Solutions",
    tagline: "UV-Stabilised PP Woven Planters for High-Yield Commercial Horticulture",
    summary:
      "Engineered for commercial polyhouses, soilless nurseries, and hydroponic setups, our laminated PP woven grow bags deliver optimal root aeration, thermal protection, and pre-punched drainage.",
    metaDescription:
      "Heavy-duty UV-stabilized dual-tone laminated PP woven grow bags with pre-punched drainage holes for polyhouses, nurseries, and hydroponics. MOQ 5,000 pcs, custom sizes.",
    moq: "5,000 pcs",
    leadTime: "12-15 days",
    packing: "Standard B2B bale packing",
    images: [
      {
        src: "/images/products/grow-bags.jpg",
        label: "Polyhouse Nursery Array",
        alt: "Commercial polyhouse nursery plant containers and grow bags array",
      },
      {
        src: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1200&q=80",
        label: "Woven Structure & Drainage Detail",
        alt: "PP woven laminated fabric structure with pre-punched base drainage holes",
      },
      {
        src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80",
        label: "Commercial Polyhouse Operation",
        alt: "Commercial greenhouse hydroponic and coir substrate cultivation",
      },
    ],
    variants: [
      {
        key: "open-top-100",
        name: "Open Top (100 GSM Standard)",
        badge: "Standard Line",
        summary:
          "Universal open-top planter format in 100 GSM fabric, built for rapid filling on commercial nursery benches.",
        overrides: {
          Type: "Open Top",
          "Thickness / GSM": "100 GSM (also available in 90, 120 GSM)",
        },
      },
      {
        key: "closed-top-120",
        name: "Closed Top (120 GSM Heavy)",
        badge: "Heavy Duty",
        summary:
          "Reinforced closed-top bag in 120 GSM woven fabric, built for coir slab compression and automated drip spike insertion.",
        overrides: {
          Type: "Closed Top",
          "Thickness / GSM": "120 GSM (also available in 90, 100 GSM)",
        },
      },
      {
        key: "sleeve-type-90",
        name: "Sleeve Type (90 GSM)",
        badge: "Continuous Sleeve",
        summary:
          "Economical continuous sleeve format in 90 GSM, designed for automated bench run cut-to-length layouts.",
        overrides: {
          Type: "Sleeve Type",
          "Thickness / GSM": "90 GSM (also available in 100, 120 GSM)",
        },
      },
    ],
    baseSpecs: [
      { label: "Material", value: "PP Woven Laminated, UV Stabilised" },
      {
        label: "Thickness / GSM",
        value: "90, 100, 120 GSM — Standard: 100 GSM",
        isVariantDriven: true,
      },
      {
        label: "Sizes",
        value: '12" x 12", 14" x 14", 16" x 16", 18" x 12", 24" x 24"',
      },
      {
        label: "Capacity",
        value: "5L, 8L, 12L, 20L, 40L",
      },
      {
        label: "Type",
        value: "Open Top, Closed Top, Sleeve Type",
        isVariantDriven: true,
      },
      { label: "Colour", value: "Standard / Custom on request" },
      { label: "Print", value: "Up to 3 colours, flexo" },
      { label: "UV Life", value: "12-18 months outdoor" },
      { label: "Drainage", value: "4 pre-punched holes at base" },
      { label: "Lead Time", value: "12-15 days" },
      { label: "Packing", value: "Standard B2B bale packing" },
      { label: "MOQ", value: "5,000 pcs" },
    ],
    targetApplications: [
      {
        number: "01",
        title: "Commercial Nurseries",
        descriptor:
          "Standardized plant staging in controlled environments providing calibrated root volume and natural air pruning.",
      },
      {
        number: "02",
        title: "Polyhouse Cultivation",
        descriptor:
          "Intensive greenhouse production of capsicum, cucumbers, and tomatoes utilizing precision drip-fertigation delivery.",
      },
      {
        number: "03",
        title: "Coir Substrate Export",
        descriptor:
          "Factory pre-packaging of compressed coir slabs and peat bricks for containerized overseas export and instant hydration.",
      },
      {
        number: "04",
        title: "Home Gardening & Urban Agriculture",
        descriptor:
          "Terrace gardens and vertical farming installations requiring lightweight, puncture-proof, modular plant containers.",
      },
      {
        number: "05",
        title: "Hydroponic Bench Systems",
        descriptor:
          "Closed-circuit recirculating irrigation lines demanding zero substrate leaching, root rot prevention, and floor hygiene.",
      },
    ],
    commercialTerms: COMMON_COMMERCIAL_TERMS,
  },
  {
    slug: "coir-pith-bags",
    name: "Coir Pith 50L & 5kg Block Bags",
    category: "Substrate & Export Packaging",
    tagline: "Heavy-Duty HDPE Woven Laminated Bags for Bulk Substrate Export Logistics",
    summary:
      "Engineered for high-volume coir pith exporters, our bags combine moisture-proof internal PE lamination with tear-resistant HDPE woven exteriors to withstand oceanic container transit.",
    metaDescription:
      "High-tensile HDPE woven export bags with internal PE moisture barrier for 50L loose coir pith and 5kg compressed blocks. Ocean container freight ready, MOQ 10,000 pcs.",
    moq: "10,000 pcs",
    leadTime: "10-14 days",
    packing: "Standard export bale packing",
    images: [
      {
        src: "/images/products/coir-pith-bags.jpg",
        label: "Warehouse Pallet Staging",
        alt: "Palletised woven export bags in industrial logistics warehouse",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        label: "Lamination & Weave Detail",
        alt: "Heavy-duty HDPE woven weave with internal PE lamination layer close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
        label: "Container Freight Dispatch",
        alt: "Overseas freight container loading and maritime export pallets",
      },
    ],
    variants: [
      {
        key: "5kg-block-bag",
        name: "5kg Block Bag",
        badge: "Export Standard",
        summary:
          "Form-fitted for 5 kg compressed coir pith bricks (32x45 cm, 75 GSM) with reinforced perimeter hermetic sealing.",
        overrides: {
          Sizes: "32 cm x 45 cm",
          "Thickness / GSM": "75 GSM",
        },
      },
      {
        key: "50l-bag",
        name: "50L Bag",
        badge: "High Volume",
        summary:
          "Heavy-duty 50-litre bulk uncompressed / expanded substrate bag (55x90 cm, 90 GSM) with reinforced bottom stitching.",
        overrides: {
          Sizes: "55 cm x 90 cm",
          "Thickness / GSM": "90 GSM",
        },
      },
    ],
    baseSpecs: [
      { label: "Material", value: "HDPE Woven Laminated" },
      {
        label: "Thickness / GSM",
        value: "75 GSM (5kg) / 90 GSM (50L)",
        isVariantDriven: true,
      },
      {
        label: "Sizes",
        value: "32 cm x 45 cm (5kg) / 55 cm x 90 cm (50L)",
        isVariantDriven: true,
      },
      {
        label: "Lamination",
        value: "Inside PE lamination, moisture-proof",
      },
      {
        label: "Handle",
        value: "Stitched handle / D-cut handle",
      },
      { label: "Colour", value: "Custom on request" },
      { label: "Print", value: "Up to 4 colours, rotogravure / flexo" },
      { label: "UV Life", value: "Custom on request" },
      { label: "Lead Time", value: "10-14 days" },
      { label: "Packing", value: "Standard export bale packing" },
      { label: "MOQ", value: "10,000 pcs" },
    ],
    targetApplications: [
      {
        number: "01",
        title: "Coir Pith Export (Europe & Middle East)",
        descriptor:
          "Engineered to satisfy stringent maritime moisture barrier and pallet stack stability standards for transatlantic container freight.",
      },
      {
        number: "02",
        title: "Commercial Horticulture",
        descriptor:
          "Protects dried peat moss and substrate blocks from ambient relative humidity, fungal spores, and bag puncture prior to retail blending.",
      },
      {
        number: "03",
        title: "Hydroponic Substrate Distribution",
        descriptor:
          "Cleanroom-grade containment for pre-washed, low-EC buffered coconut coir media delivered directly to commercial soft-fruit farms.",
      },
    ],
    commercialTerms: COMMON_COMMERCIAL_TERMS,
  },
  {
    slug: "laminated-rolls-and-pouches",
    name: "Laminated Rolls & Pouches",
    category: "Flexible Barrier Packaging",
    tagline: "Multi-Layer High-Barrier Substrates with Up to 8-Colour Precision Rotogravure Printing",
    summary:
      "Engineered for automated form-fill-seal (FFS) lines and retail barrier pouches, preserving volatile aromas, moisture barriers, and shelf-life across foods, chemicals, and pharmaceuticals.",
    metaDescription:
      "Multi-layer high-barrier laminated film rolls and preformed pouches with up to 8-colour precision rotogravure printing for food, tea, coffee, and FMCG. MOQ 500 kg / 10k pouches.",
    moq: "500 kg film / 10,000 pouches",
    leadTime: "15-18 days",
    packing: "Roll / Carton export packing",
    images: [
      {
        src: "/images/products/laminated-rolls-and-pouches.jpg",
        label: "Form-Fill-Seal Roll Stock",
        alt: "Multi-layer printed flexible packaging barrier rolls and pouches",
      },
      {
        src: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
        label: "Rotogravure Print Registration",
        alt: "High-speed 8-color rotogravure press printing cylinder and foil substrate",
      },
      {
        src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
        label: "Automated Converting Line",
        alt: "High-throughput industrial pouch converting and hermetic sealing lines",
      },
    ],
    variants: [
      {
        key: "pet-12-pe-60",
        name: "PET 12 / PE 60",
        badge: "Duplex Standard",
        summary:
          "Duplex barrier laminate with high optical gloss and strong heat-sealability, optimized for dry spices and savoury snacks.",
        overrides: {
          Material: "PET 12 / PE 60 (Recommended for: snacks, spices)",
          "Thickness / GSM": "72 microns (approx.)",
        },
      },
      {
        key: "bopp-20-cpp-40",
        name: "BOPP 20 / CPP 40",
        badge: "FMCG Standard",
        summary:
          "Transparent or metallised duplex laminate with low seal initiation temperature, ideal for high-speed biscuit and confectionery lines.",
        overrides: {
          Material: "BOPP 20 / CPP 40 (Recommended for: food, FMCG)",
          "Thickness / GSM": "60 microns (approx.)",
        },
      },
      {
        key: "pet-12-alu-7-pe-60",
        name: "PET 12 / ALU 7 / PE 60",
        badge: "Triplex Ultra-Barrier",
        summary:
          "Triplex aluminum foil laminate providing near-zero oxygen transmission rate (OTR) and water vapor transmission rate (WVTR).",
        overrides: {
          Material: "PET 12 / ALU 7 / PE 60 (Recommended for: high barrier)",
          "Thickness / GSM": "79 microns (approx.)",
        },
      },
    ],
    baseSpecs: [
      {
        label: "Material",
        value: "Multi-layer laminate (PET/PE, BOPP/CPP, PET/ALU/PE)",
        isVariantDriven: true,
      },
      {
        label: "Thickness / GSM",
        value: "70 to 120 microns",
        isVariantDriven: true,
      },
      {
        label: "Sizes",
        value: "100g to 5kg packs — Width 100mm to 450mm",
      },
      {
        label: "Pouch Types",
        value: "3-Side Seal, Centre Seal, Stand-Up with Zipper, Spout Pouch",
      },
      { label: "Colour", value: "Custom on request" },
      { label: "Print", value: "Up to 8-colour Rotogravure" },
      {
        label: "UV Life",
        value: "Oxygen & moisture proof barrier",
      },
      { label: "Lead Time", value: "15-18 days" },
      { label: "Packing", value: "Roll / Carton export packing" },
      { label: "MOQ", value: "500 kg film / 10,000 pouches" },
    ],
    targetApplications: [
      {
        number: "01",
        title: "Spices & Seasonings",
        descriptor:
          "Preserves volatile essential oils, complex aroma notes, and pungent flavor compounds from atmospheric oxidation.",
      },
      {
        number: "02",
        title: "Tea & Specialty Coffee",
        descriptor:
          "Hermetic foil barriers block ambient oxygen and ultraviolet light to preserve roasted bean freshness and aroma.",
      },
      {
        number: "03",
        title: "Packaged Snacks & Confectionery",
        descriptor:
          "High puncture resistance and crisp optical clarity designed for automated vertical form-fill-seal (VFFS) bagging.",
      },
      {
        number: "04",
        title: "Grains, Rice & Pulses",
        descriptor:
          "Heavy-duty laminated barrier liners preventing weevil infestation and moisture clumping in retail shelf packaging.",
      },
      {
        number: "05",
        title: "Agrochemicals & Fertiliser",
        descriptor:
          "Chemical-resistant co-extruded inner PE layers preventing active solvent permeation and pouch delamination.",
      },
      {
        number: "06",
        title: "Pharmaceuticals",
        descriptor:
          "Cleanroom-manufactured foil laminates providing absolute microbiological barrier protection and light defense.",
      },
    ],
    commercialTerms: COMMON_COMMERCIAL_TERMS,
  },
  {
    slug: "pp-and-lldpe-bags",
    name: "PP & LLDPE Bags",
    category: "Industrial & Retail Packaging",
    tagline: "High-Tensile Woven Bags and Flexible Extruded Polyethylene Liners",
    summary:
      "Providing both heavy-duty external PP woven containment bags and high-clarity internal LLDPE liners for bulk commodities, agricultural produce, and construction materials.",
    metaDescription:
      "Industrial woven PP sacks and heavy-duty extruded LLDPE liner bags for bulk fertilizer, chemicals, flour, and grains. High puncture resistance, custom flexo print, MOQ 5,000 pcs.",
    moq: "10,000 pcs",
    leadTime: "10-12 days",
    packing: "Standard B2B bale packing",
    images: [
      {
        src: "/images/products/pp-and-lldpe-bags.jpg",
        label: "Industrial Warehouse Staging",
        alt: "Stacked industrial PP woven sacks and bags in bulk storage warehouse",
      },
      {
        src: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1200&q=80",
        label: "Polymer Testing & Seam Inspection",
        alt: "Tensile strength and polymer micron gauge verification in laboratory",
      },
      {
        src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
        label: "Automated Industrial Bagging",
        alt: "High-throughput industrial bagging and palletizing machinery line",
      },
    ],
    variants: [
      {
        key: "pp-woven-bag",
        name: "PP Woven Bag",
        badge: "Outer Woven Sack",
        summary:
          "Heavy-duty woven polypropylene sack with optional BOPP photographic lamination for 25 kg and 50 kg bulk commodity packaging.",
        overrides: {
          Material: "PP Woven",
          "Thickness / GSM": "50-80 GSM",
          Sizes: "40x60 cm to 60x90 cm (Capacity: 25 kg, 50 kg)",
          Print: "BOPP laminated, up to 4-colour print",
        },
      },
      {
        key: "lldpe-liner-bag",
        name: "LLDPE Liner Bag",
        badge: "Moisture Liner",
        summary:
          "Co-extruded virgin polyethylene tube and gusseted liner, inserted into outer woven sacks to guarantee complete moisture-proof containment.",
        overrides: {
          Material: "LLDPE",
          "Thickness / GSM": "50, 75, 100 microns",
          Sizes: "Custom, up to 1200mm width (Use: Liner bag inside PP bag)",
          Print: "Unprinted / Custom on request",
        },
      },
    ],
    baseSpecs: [
      {
        label: "Material",
        value: "PP Woven / Virgin LLDPE",
        isVariantDriven: true,
      },
      {
        label: "Thickness / GSM",
        value: "50-80 GSM (PP) / 50-100 microns (LLDPE)",
        isVariantDriven: true,
      },
      {
        label: "Sizes",
        value: "40x60 cm to 60x90 cm (PP) / Up to 1200mm width (LLDPE)",
        isVariantDriven: true,
      },
      { label: "Colour", value: "Custom on request" },
      {
        label: "Print",
        value: "BOPP laminated up to 4-colour print / Unprinted standard",
        isVariantDriven: true,
      },
      { label: "UV Life", value: "Custom on request" },
      { label: "Lead Time", value: "10-12 days" },
      { label: "Packing", value: "Standard B2B bale packing" },
      { label: "MOQ", value: "10,000 pcs" },
    ],
    targetApplications: [
      {
        number: "01",
        title: "Rice & Grain Milling",
        descriptor:
          "Standardized 25 kg & 50 kg export grain packaging with micro-perforations for breathability or sealed liners for long-term storage.",
      },
      {
        number: "02",
        title: "Refined Sugar Packaging",
        descriptor:
          "Food-grade inner polyethylene liners preventing ambient moisture caking and preserving free-flowing crystalline purity.",
      },
      {
        number: "03",
        title: "Cement & Construction Materials",
        descriptor:
          "High drop-test impact resistance and burst strength engineered for rough transport handling and palletized stacking.",
      },
      {
        number: "04",
        title: "Fertiliser & Soil Nutrients",
        descriptor:
          "Corrosion-resistant polymer barriers preventing chemical degradation and salt migration during monsoon transport.",
      },
      {
        number: "05",
        title: "Animal Feed & Cattle Mash",
        descriptor:
          "Abrasion-resistant multi-ply woven bags that withstand rough rural transit and agricultural warehouse environments.",
      },
      {
        number: "06",
        title: "Industrial Chemicals",
        descriptor:
          "Heavy-micron virgin LLDPE barrier liners preventing active chemical dust leakage and environmental contamination.",
      },
    ],
    commercialTerms: COMMON_COMMERCIAL_TERMS,
  },
  {
    slug: "wicketted-poly-bags",
    name: "Wicked Poly Bags",
    category: "Automated Packaging Solutions",
    tagline: "Precision Metal-Wicketed Poly Bags for Automated High-Speed Packing Lines",
    summary:
      "Engineered for high-throughput automatic bagging machinery, our wicketed poly bags feature precision pin holes, clean perforation tear-lines, and anti-static additives for flawless machine feeding.",
    metaDescription:
      "Precision wicketed poly bags with anti-static formulation and high optical clarity for automated high-speed bakery packaging, poultry, and textile bagging. MOQ 25,000 pcs.",
    moq: "25,000 pcs",
    leadTime: "7-10 days",
    packing: "500 pcs / bundle, 10 bundles / carton",
    images: [
      {
        src: "/images/products/wicked-poly-bags.jpg",
        label: "High-Speed Bakery Packing",
        alt: "Commercial bakery bread packaging and automated bagging machinery",
      },
      {
        src: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&q=80",
        label: "Wicket Header & Perforation Detail",
        alt: "Precision metal wicket bar, pin registration, and micro-lip tear line close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        label: "Automated Production Line",
        alt: "Continuous automated high-speed wicket bagging production line in operation",
      },
    ],
    variants: [
      {
        key: "35-microns",
        name: "35 Microns",
        badge: "Bakery Standard",
        summary:
          "Optimal high-clarity thin gauge for commercial sliced bread, buns, and high-speed bakery blow-open loaders.",
        overrides: {
          "Thickness / GSM": "35 microns",
        },
      },
      {
        key: "50-microns",
        name: "50 Microns",
        badge: "Garment & Retail",
        summary:
          "Medium gauge offering enhanced puncture resistance for apparel, hosiery, sanitary products, and retail merchandise.",
        overrides: {
          "Thickness / GSM": "50 microns",
        },
      },
      {
        key: "75-microns",
        name: "75 Microns",
        badge: "Heavy-Duty Parts",
        summary:
          "Heavy gauge engineered for hardware items, automotive fasteners, frozen poultry, and sharp-edged retail components.",
        overrides: {
          "Thickness / GSM": "75 microns",
        },
      },
    ],
    baseSpecs: [
      { label: "Material", value: "LDPE / HDPE" },
      {
        label: "Thickness / GSM",
        value: "35, 50, 75 microns",
        isVariantDriven: true,
      },
      {
        label: "Sizes",
        value: '6" x 9" to 16" x 20" — custom on request',
      },
      {
        label: "Type",
        value: "Wicketed (stacked on metal wicket), bottom seal, side gusset optional",
      },
      { label: "Colour", value: "Clear / Custom on request" },
      { label: "Print", value: "Up to 2 colours flexo" },
      {
        label: "UV Life",
        value: "Not applicable (indoor / retail / line packing)",
      },
      { label: "Lead Time", value: "7-10 days" },
      {
        label: "Packing",
        value: "500 pcs / bundle, 10 bundles / carton",
      },
      { label: "MOQ", value: "25,000 pcs" },
    ],
    targetApplications: [
      {
        number: "01",
        title: "Bakery & Bread Packaging",
        descriptor:
          "Compatible with automated bread-bagging air-blast openers and wicket tension pins for continuous shift operations.",
      },
      {
        number: "02",
        title: "Garments & Textiles",
        descriptor:
          "High optical clarity poly bags for shirts, hosiery, and apparel with clean ventilation punch holes.",
      },
      {
        number: "03",
        title: "Automotive Parts & Hardware",
        descriptor:
          "Puncture-resistant bags for screws, injection-molded fittings, and hardware kits with tamper-evident heat seals.",
      },
      {
        number: "04",
        title: "Retail Counter Packing",
        descriptor:
          "Convenient wicket hung dispensers for rapid manual retail bagging in commercial supermarkets and produce stalls.",
      },
      {
        number: "05",
        title: "High-Speed Automated Packing Lines",
        descriptor:
          "Static-neutralized resin blend guaranteeing zero bag-to-bag clinging on robotic suction and mechanical fingers.",
      },
    ],
    commercialTerms: COMMON_COMMERCIAL_TERMS,
  },
];

export function getProductBySlug(slug: string): ProductDetailData | undefined {
  return PRODUCTS_DATA.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, count: number = 3): ProductDetailData[] {
  return PRODUCTS_DATA.filter((p) => p.slug !== currentSlug).slice(0, count);
}
