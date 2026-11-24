export interface MachineStationConfig {
  id: "extrusion" | "rotogravure" | "packing" | "inspection";
  numeral: "01" | "02" | "03" | "04";
  shortLabel: string;
  title: string;
  spec: string;
  /** 3D world-space anchor above the module for the HTML hotspot pin */
  anchor: [number, number, number];
  /** Camera look-at target when focused on this station */
  cameraTarget: [number, number, number];
  /** Camera world position when focused on this station */
  cameraPosition: [number, number, number];
  /** Approximate pin position (%) when rendered over the static fallback image */
  fallbackPin: { left: string; top: string };
}

export const MACHINE_STATIONS: MachineStationConfig[] = [
  {
    id: "extrusion",
    numeral: "01",
    shortLabel: "Extrusion",
    title: "Blown Film Extrusion",
    spec: "Multi-layer virgin LDPE/LLDPE blown film extrusion with uniform gauge control.",
    anchor: [-4.5, 3.25, -0.85],
    cameraTarget: [-4.25, 1.55, -0.75],
    cameraPosition: [-0.2, 4.7, 4.8],
    fallbackPin: { left: "29.1%", top: "38.8%" },
  },
  {
    id: "rotogravure",
    numeral: "02",
    shortLabel: "Rotogravure",
    title: "8-Colour Rotogravure",
    spec: "Precision electronic cylinder engraving with up to 8-colour registration & solventless inks.",
    anchor: [-1.75, 2.05, -2.05],
    cameraTarget: [-1.75, 1.05, -2.05],
    cameraPosition: [0.65, 4.4, 2.5],
    fallbackPin: { left: "42.8%", top: "45.7%" },
  },
  {
    id: "packing",
    numeral: "03",
    shortLabel: "Packing",
    title: "Packing & Conveying",
    spec: "Automated high-speed pouch sealing, wicketting, and batch counting.",
    anchor: [2.35, 2.75, 1.8],
    cameraTarget: [2.5, 1.25, 1.95],
    cameraPosition: [5.6, 4.1, 6.8],
    fallbackPin: { left: "50.3%", top: "56.2%" },
  },
  {
    id: "inspection",
    numeral: "04",
    shortLabel: "QA",
    title: "Automated QA Inspection",
    spec: "Inline seal-strength, print-registration, and batch traceability checks.",
    anchor: [4.15, 2.95, -0.45],
    cameraTarget: [4.15, 1.45, -0.45],
    cameraPosition: [7.6, 4.1, 4.6],
    fallbackPin: { left: "64.3%", top: "52.3%" },
  },
];
