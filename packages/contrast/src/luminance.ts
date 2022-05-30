const R_WEIGHT = 0.2126
const G_WEIGHT = 0.7152
const B_WEIGHT = 0.0722

const L_THRESHOLD = 0.04045
const L_LINEAR_SLOPE = 12.92
const GAMMA = 2.4

/**
 * channel weight in RGB system, 0~1 value.
 */
export type ColorWeight = number

/**
 * Standardize color weight into perceptual weight
 * @param c
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export const standardizeWeight = (c: ColorWeight): ColorWeight =>
  c <= L_THRESHOLD ? c / L_LINEAR_SLOPE : ((c + 0.055) / 1.055) ** GAMMA

/**
 * Standardize color weight into perceptual weight
 * @param r sRGB red value in 0~1
 * @param g sRGB green value in 0~1
 * @param b sRGB blue value in 0~1
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export const toRelativeLuminance = (
  r: ColorWeight,
  g: ColorWeight,
  b: ColorWeight
): number =>
  R_WEIGHT * standardizeWeight(r) +
  G_WEIGHT * standardizeWeight(g) +
  B_WEIGHT * standardizeWeight(b)
