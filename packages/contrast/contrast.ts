import { fromHEX } from './color'
import { toRelativeLuminance } from './luminance'

const SHIFT = 0.05

export const getContrastRatio = (c1: string, c2: string): number => {
  const l1 = toRelativeLuminance(...fromHEX(c1)) + SHIFT
  const l2 = toRelativeLuminance(...fromHEX(c2)) + SHIFT
  return l1 > l2 ? l1 / l2 : l2 / l1
}
