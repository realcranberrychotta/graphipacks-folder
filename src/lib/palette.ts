/**
 * Graphipacks Coolors Palette — Single Source of Truth
 *
 * 60% Canvas: Honeydew White (#F1FAEE)
 * 30% Institutional Anchor: Dark Navy (#1D3557)
 * 10% Accents:
 *   - Steel Blue (#457B9D) - Secondary, kickers, active states, badges
 *   - Powder Blue (#A8DADC) - Dividers, card borders, surface tint
 *   - Imperial Red (#E63946) - 2-3% max: "Get a Quote", "EST. 1984", status dot
 */

export const PALETTE = {
  imperialRed: '#E63946',
  honeydew: '#F1FAEE',
  powderBlue: '#A8DADC',
  steelBlue: '#457B9D',
  darkNavy: '#1D3557',
} as const;

export const PALETTE_HEX = {
  imperialRed: 0xE63946,
  honeydew: 0xF1FAEE,
  powderBlue: 0xA8DADC,
  steelBlue: 0x457B9D,
  darkNavy: 0x1D3557,
} as const;

/** RGB [r, g, b] 0-255 format for Canvas2D / jsPDF / SVG */
export const PALETTE_RGB = {
  imperialRed: [230, 57, 70] as [number, number, number],
  honeydew: [241, 250, 238] as [number, number, number],
  powderBlue: [168, 218, 220] as [number, number, number],
  steelBlue: [69, 123, 157] as [number, number, number],
  darkNavy: [29, 53, 87] as [number, number, number],
} as const;

/** Normalized float [r, g, b] 0.0-1.0 for WebGL shaders */
export const PALETTE_GL = {
  imperialRed: [230 / 255, 57 / 255, 70 / 255] as [number, number, number],
  honeydew: [241 / 255, 250 / 255, 238 / 255] as [number, number, number],
  powderBlue: [168 / 255, 218 / 255, 220 / 255] as [number, number, number],
  steelBlue: [69 / 255, 123 / 255, 157 / 255] as [number, number, number],
  darkNavy: [29 / 255, 53 / 255, 87 / 255] as [number, number, number],
} as const;
