const PT_TO_PX = 4 / 3
const PT_THRESHOLD = 18
const PT_BOLD_THRESHOLD = 14
const BOLD_THRESHOLD = 700

/** @category Typography */
export type RelativeFontWeight = 'bolder' | 'lighter'
/** @category Typography */
export type FontWeight = number | string | undefined
/** @category Typography */
export type FontSizeUnit = 'px' | 'pt'
/** @category Typography */
export interface LargeTextProps {
  size: number
  weight?: FontWeight
  inheritWeight?: FontWeight
  unit?: FontSizeUnit
}
/**
 * Map given text weight variants to number weight
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
 * @category Typography
 */
export const fontWeightLUT: Record<string, number> = {
  hairline: 50,
  'ultra-thin': 50,
  thin: 100,
  'extra-light': 200,
  'ultra-light': 200,
  light: 300,
  normal: 400,
  regular: 400,
  // might fallback to 400, but decide to let style inherit weight
  // undefined: 400,
  medium: 500,
  'semi-bold': 600,
  'demi-bold': 600,
  bold: 700,
  'extra-bold': 800,
  'ultra-bold': 800,
  black: 900,
  heavy: 900,
}

/**
 * Relative weight considered from "lighter" or "bolder" value in CSS
 * @category Typography
 */
export const fontRelativeWeights = [100, 400, 700, 900] as const

/**
 * Convert relative weight "lighter" or "bolder" to matching weight with given inherit weight
 * @param weight "lighter" or "bolder" in CSS font-weight
 * @param inherited inherited weight number
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
 * @category Typography
 */
export const getRelativeWeight = (
  weight: RelativeFontWeight,
  inherited: number
) => {
  if (weight === 'bolder') {
    if (inherited < 400) return 400
    if (inherited < 700) return 700
    return 900
  } else {
    if (inherited > 700) return 700
    if (inherited > 400) return 400
    return 100
  }
}

/**
 * Get font weight from text defined in css standard.
 *
 * @example
 * ```
 * getFontWeight('bold') // 700
 * getFontWeight('normal') // 400
 * getFontWeight('thin') // 100
 * getFontWeight('hairline') // 50
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
 * @category Typography
 */
export const getFontWeight = (
  weight: FontWeight,
  inherit: FontWeight = undefined
): number | undefined => {
  if (weight === undefined) return
  if (typeof weight === 'number') return weight
  if (weight === 'lighter' || weight === 'bolder') {
    const inherited = getFontWeight(inherit)
    if (!inherited) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return getRelativeWeight(weight, getFontWeight(inherited)!)
  }
  return fontWeightLUT[weight]
}

export const isBold = (weight = 400) => weight >= BOLD_THRESHOLD

/**
 * query the large flag with given size, bold, unit
 * @param size number of the font size
 * @param bold indicate the font is bold (over 700)
 * @param unit unit of the font size, 'pt' or 'px', default to 'px'
 * @see isLargeText for reading weight instead
 *
 * @example
 * ```
 * isLarge(14) // false, 14px font is not considered as large text
 * isLarge(14, true, 'pt') // true, 14pt with bold text is one of the criteria
 * ```
 * @category Typography
 */
export const isLarge = (
  size: number,
  bold = false,
  unit: FontSizeUnit = 'px'
) =>
  size >=
  (bold ? PT_BOLD_THRESHOLD : PT_THRESHOLD) * (unit === 'px' ? PT_TO_PX : 1)

/**
 * Query the large text flag with given size, weight(text), unit and inherit weight.
 * This is higher-order function for `isLarge`.
 * @category Typography
 * @note Will be refactor ASAP
 */
export const isLargeText = ({
  size,
  weight,
  inheritWeight,
  unit,
}: LargeTextProps) => {
  return isLarge(size, isBold(getFontWeight(weight, inheritWeight)), unit)
}
