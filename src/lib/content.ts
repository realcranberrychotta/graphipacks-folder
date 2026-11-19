export interface CompanyProfile {
  name: string;
  tagline: string;
  executiveDirector: string;
  specializations: string[];
  commitments: string[];
  about: string;
}

export interface Product {
  slug: string;
  name: string;
  types: string[];
  whyGraphipacks: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  applications: string[];
  image: string;
}

export interface PackagingForm {
  form: string;
  examples: string[];
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface ClientCategory {
  category: string;
  clients: string[];
}

// Backward-compatibility aliases for existing scaffolding
export type CompanyInfo = CompanyProfile;
export type ProductItem = Product;
export type TimelineItem = TimelineEvent;
export type ClientGroup = ClientCategory;

export const company: CompanyProfile = {
  name: "Graphipacks Private Limited",
  tagline: "Flexible Packaging Solution Providers",
  executiveDirector: "C.S. Arjun",
  specializations: [
    "Multicolor Flexo & Gravure Photo Printed Bags",
    "PP, LLDPE Poly Bags, Polyesterpoly pouches",
  ],
  commitments: [
    "Timely delivery of consistent quality products",
    "Mutually beneficial partnerships with clients and suppliers",
    "Attract, develop and retain the best people",
    "Invest in effective processes and innovative technologies",
  ],
  about:
    "Flexible Packaging Solution Providers specializing in Multicolor Flexo & Gravure Photo Printed Bags, PP, LLDPE Poly Bags, and Polyesterpoly pouches.",
};

export const products: Product[] = [
  {
    slug: "agriculture-mulch-film",
    name: "Agriculture Mulch Film",
    types: ["Watermelon (30μ)", "Tomatoes (25μ)", "Brinjal (20μ)"],
    whyGraphipacks:
      "Directly manufactured with multi-layer extrusion and UV stabilization for extended field lifespans.",
    category: "Agricultural Solutions",
    shortDescription:
      "Virgin LLDPE with Advanced UV Stabilization for Multi-Season Crop Protection.",
    description:
      "High capacity to manufacture agricultural film with guaranteed field life until the end of cultivation.",
    features: ["Weed suppression", "Moisture retention", "Soil temperature control"],
    applications: ["Watermelon", "Tomato", "Brinjal", "Chilli"],
    image: "/images/products/mulch-film.jpg",
  },
  {
    slug: "grow-bags",
    name: "Grow Bags",
    types: ["Open Top (100 GSM)", "Closed Top (120 GSM)", "Sleeve Type (90 GSM)"],
    whyGraphipacks:
      "Custom tailored UV resistance and barrier properties designed specifically for varying global climates.",
    category: "Agricultural Solutions",
    shortDescription:
      "UV-Stabilised PP Woven Planters for High-Yield Commercial Horticulture.",
    description:
      "Manufactured by Senior Operators with 25 years of experience, built to match exact customer lifespan specs.",
    features: ["Pre-punched drainage holes", "UV-stabilized PP woven", "Air-pruning structure"],
    applications: ["Nurseries", "Polyhouse cultivation", "Coir export", "Home gardening", "Hydroponics"],
    image: "/images/products/grow-bags.jpg",
  },
  {
    slug: "coir-pith-bags",
    name: "Coir Pith 50L & 5kg Block Bags",
    types: ["5kg Block Bag (75 GSM)", "50L Bag (90 GSM)"],
    whyGraphipacks:
      "High-strength export-grade lamination ensures substrate integrity during long-haul shipping.",
    category: "Substrate & Export Packaging",
    shortDescription:
      "Heavy-Duty HDPE Woven Laminated Bags for Bulk Substrate Export Logistics.",
    description:
      "Vast experience in printing using LLDPE materials in Rotogravure and Flexo Technology.",
    features: ["Inside PE lamination", "Moisture-proof", "Stitched & D-cut handles"],
    applications: ["Coir pith export to Europe & Middle East", "Commercial horticulture", "Hydroponic growers"],
    image: "/images/products/coir-pith-bags.jpg",
  },
  {
    slug: "laminated-rolls-and-pouches",
    name: "Laminated Rolls & Pouches",
    types: [
      "PET 12 / PE 60",
      "BOPP 20 / CPP 40",
      "PET 12 / ALU 7 / PE 60",
    ],
    whyGraphipacks:
      "Exceptional barrier properties engineered to lock in freshness and prevent moisture/oxygen ingress.",
    category: "Flexible Barrier Packaging",
    shortDescription:
      "Multi-Layer High-Barrier Substrates with Up to 8-Colour Precision Rotogravure Printing.",
    description:
      "25 years of experience manufacturing laminated rolls and pouches, offering marketable design advice and technical packing support.",
    features: ["Oxygen & moisture proof barrier", "Up to 8-colour Rotogravure", "Custom pouch formats"],
    applications: ["Spices", "Tea & Coffee", "Snacks", "Rice", "Fertiliser", "Pharma"],
    image: "/images/products/laminated-rolls-and-pouches.jpg",
  },
  {
    slug: "pp-and-lldpe-bags",
    name: "PP & LLDPE Bags",
    types: ["PP Woven Bag (50-80 GSM)", "LLDPE Liner Bag (50-100μ)"],
    whyGraphipacks:
      "High-clarity polymers combined with micro-dot print precision for maximum retail shelf presence.",
    category: "Industrial & Retail Packaging",
    shortDescription:
      "High-Tensile Woven Bags and Flexible Extruded Polyethylene Liners.",
    description:
      "Providing both heavy-duty external PP woven containment bags and high-clarity internal LLDPE liners.",
    features: ["BOPP laminated up to 4-colour print", "Moisture barrier liner", "High puncture resistance"],
    applications: ["Rice & Grain", "Sugar", "Cement", "Fertiliser", "Animal feed", "Chemicals"],
    image: "/images/products/pp-and-lldpe-bags.jpg",
  },
  {
    slug: "wicketted-poly-bags",
    name: "Wicketted Poly Bags",
    types: ["35 Microns", "50 Microns", "75 Microns"],
    whyGraphipacks:
      "Precision-cut wicket holes and tear-lines designed for flawless performance on high-speed automated packing lines.",
    category: "Automated Packaging Solutions",
    shortDescription:
      "Precision Metal-Wicketed Poly Bags for Automated High-Speed Packing Lines.",
    description:
      "Engineered for high-throughput automatic bagging machinery with precision pin holes and clean tear-lines.",
    features: ["Metal wicket bar mounted", "Anti-static resin blend", "Precision micro-lip perforations"],
    applications: ["Bakery & bread", "Garments", "Auto parts", "Retail counter packing", "Automated lines"],
    image: "/images/products/wicked-poly-bags.jpg",
  },
];

export const packagingForms: PackagingForm[] = [
  {
    form: "Powder Form Products",
    examples: ["Flour", "Spicy Powder", "Jaggery"],
  },
  {
    form: "Solid Shape Products",
    examples: ["Bread", "Cake", "Jelly"],
  },
  {
    form: "Solid Irregular Shape Products",
    examples: ["Snacks", "Chicken Bags", "Grated Coconut"],
  },
  {
    form: "Liquid Products",
    examples: ["Milk", "Sip up"],
  },
];

export const printingTechnology: string[] = [
  "Roto Gravure Printing",
  "Normal Flexo Printing",
  "Hi-Speed Flexo Printing",
];

export const timeline: TimelineEvent[] = [
  {
    year: 1984,
    title: "Partnership Concern (Polygraphs)",
    description:
      "Started a Partnership Concern (Polygraphs) with 1 Flexo Printing Machine.",
  },
  {
    year: 1989,
    title: "New Factory & Capacity Expansion",
    description:
      "Constructed new factory, started another firm (Rotographs), enhanced capacity with Extruders/Bag Making.",
  },
  {
    year: 1998,
    title: "Graphipacks Private Limited Incorporated",
    description:
      "Started Private Limited Company (Graphipacks Private Limited), installed Roto gravure.",
  },
  {
    year: 2011,
    title: "Wicketted Poly Bags Installation",
    description:
      "Installed new technology (Wicketted Poly Bags), new Wicketting machine, imported printing machine.",
  },
  {
    year: 2016,
    title: "Product Range Expansion & Modern Extruders",
    description:
      "Introduced New Products (Grow Bags, 50L/5KG Block Bags, Mulch Film), installed 3 layer & ABA Extruders with Twist Gusset.",
  },
];

export const clients: ClientCategory[] = [
  {
    category: "Corporate",
    clients: ["The Spice Club", "Elite foods", "Maagrita Foods"],
  },
  {
    category: "Grow Bags",
    clients: [
      "Pelemix",
      "Dutch Plantin",
      "REMMY",
      "ECO GREEN COIR",
      "Fibredust",
    ],
  },
  {
    category: "Laminated Rolls & Pouches",
    clients: [
      "FLUBBERS",
      "MAHESH VALUE GROUP",
      "Surya",
      "Vasu",
      "Me fresh",
      "meat and eat",
      "OrgFarm",
    ],
  },
  {
    category: "Wicketted Poly Bags",
    clients: ["modern", "Elite"],
  },
];

export interface FilmLayer {
  id: string;
  label: string;
  name: string;
  spec: string;
  description: string;
}

export const filmLayers: FilmLayer[] = [
  {
    id: "bopet",
    label: "LAYER 1",
    name: "BOPET",
    spec: "12µm",
    description: "Outer layer — carries the print and gives strength.",
  },
  {
    id: "met-pet",
    label: "BARRIER",
    name: "MET-PET",
    spec: "7µm",
    description: "Barrier layer — keeps moisture and air out.",
  },
  {
    id: "lldpe",
    label: "SEALANT",
    name: "LLDPE",
    spec: "50µm",
    description: "Sealant layer — heat-seals the pouch shut.",
  },
];
