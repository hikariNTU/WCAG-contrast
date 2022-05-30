const PT_TO_PX = 4 / 3
const PT_THRESHOLD = 18
const PT_BOLD_THRESHOLD = 14
const BOLD_THRESHOLD = 700

export type RelativeFontWeight = 'bolder' | 'lighter'
export type FontWeight = number | string | undefined
export type FontSizeUnit = 'px' | 'pt'
export interface LargeTextProps {
  size: number
  weight?: FontWeight
  inheritWeight?: FontWeight
  unit?: FontSizeUnit
}

/**
 * Map given text weight variants to number weight
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
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
 */
export const fontRelativeWeights = [100, 400, 700, 900] as const

/**
 * Convert relative weight "lighter" or "bolder" to matching weight with given inherit weight
 * @param weight "lighter" or "bolder" in CSS font-weight
 * @param inherited inherited weight number
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
 * @see isLargeText for reading weight instead
 */
export const isLarge = (
  size: number,
  bold = false,
  unit: FontSizeUnit = 'px'
) =>
  size >=
  (bold ? PT_BOLD_THRESHOLD : PT_THRESHOLD) * (unit === 'px' ? PT_TO_PX : 1)

/**
 * query the large text flag with given size, weight, unit
 */
export const isLargeText = ({
  size,
  weight,
  inheritWeight,
  unit,
}: LargeTextProps) => {
  return isLarge(size, isBold(getFontWeight(weight, inheritWeight)), unit)
}
