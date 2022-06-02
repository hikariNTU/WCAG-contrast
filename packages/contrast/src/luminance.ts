const R_WEIGHT = 0.2126
const G_WEIGHT = 0.7152
const B_WEIGHT = 0.0722

const L_THRESHOLD = 0.04045
const L_LINEAR_SLOPE = 12.92
const GAMMA = 2.4

/**
 * Channel weight in RGB system, 0 ~ 1 float value.
 * @category Luminance
 */
export type ColorWeight = number

/**
 * Standardize color value with gamma correlation
 * @param c
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * @category Luminance
 */
export const standardizeWeight = (c: ColorWeight): ColorWeight =>
  c <= L_THRESHOLD ? c / L_LINEAR_SLOPE : ((c + 0.055) / 1.055) ** GAMMA

/**
 * Calculate sRGB color into perceptual luminance
 * @param r sRGB red value in 0~1
 * @param g sRGB green value in 0~1
 * @param b sRGB blue value in 0~1
 * @param _a alpha chanel value, will be ignored
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * @example
 * ```js
 * toRelativeLuminance(1, 1 ,1) // 1.0, white color
 * toRelativeLuminance(0, 1, 1) // 0.7152 + 0.0722, green + blue
 * toRelativeLuminance(0.1, 0.1, 0.1, 0.75) // 0.1, alpha channel is ignored
 * ```
 *
 * @category Luminance
 */
export const toRelativeLuminance = (
  r: ColorWeight,
  g: ColorWeight,
  b: ColorWeight,
  _a?: ColorWeight
): number =>
  R_WEIGHT * standardizeWeight(r) +
  G_WEIGHT * standardizeWeight(g) +
  B_WEIGHT * standardizeWeight(b)
