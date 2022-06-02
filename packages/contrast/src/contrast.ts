import { fromHEX } from './color'
import { toRelativeLuminance } from './luminance'
import { isLargeText, LargeTextProps } from './typography'

/** @category Contrast */
export interface TextNodeParam extends LargeTextProps {
  color: string
}
/** @category Contrast */
export type CheckerFunction = (
  text: TextNodeParam,
  background: string
) => boolean
/** @category Contrast */
export type CriterionThreshold = {
  /** Normal text threshold */
  t1: number
  /** Large Text threshold */
  t2: number
}

const SHIFT = 0.05
const AA_THRESHOLD = 4.5
const AA_LARGE_THRESHOLD = 3
const AAA_THRESHOLD = 7
const AAA_LARGE_THRESHOLD = 4.5

/**
 * Get luminance contrast ratio for given color set
 * @returns contrast value between `1` to `21` range
 * @category Contrast
 */
export const getContrastRatio = (c1: string, c2: string): number => {
  const l1 = toRelativeLuminance(...fromHEX(c1)) + SHIFT
  const l2 = toRelativeLuminance(...fromHEX(c2)) + SHIFT
  return l1 > l2 ? l1 / l2 : l2 / l1
}

/** @category Contrast */
export const isPassCriteria = (
  text: TextNodeParam,
  background: string,
  { t1, t2 }: CriterionThreshold = { t1: AA_THRESHOLD, t2: AA_LARGE_THRESHOLD }
): boolean => {
  const contrast = getContrastRatio(text.color, background)
  return contrast >= (isLargeText(text) ? t2 : t1)
}

/**
 * check given context pass AA-level
 * @param text text node given all information
 * @param background background color
 * @returns pass boolean
 * @category Contrast
 */
export const isAA: CheckerFunction = (text, background) =>
  isPassCriteria(text, background)

/**
 * check given context pass AAA-level
 * @param text text node given all information
 * @param background background color
 * @returns pass boolean
 * @category Contrast
 */
export const isAAA: CheckerFunction = (text, background) =>
  isPassCriteria(text, background, {
    t1: AAA_THRESHOLD,
    t2: AAA_LARGE_THRESHOLD,
  })
