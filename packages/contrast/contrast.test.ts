import { describe, it, expect } from 'vitest'
import { getContrastRatio } from './contrast'

describe('contrast', () => {
  it('getContrastRatio with given data', () => {
    expect(getContrastRatio('#000', '#FFF')).toBe(21)
    expect(getContrastRatio('#222', '#222')).toBe(1)

    // chrome: 3.51, chrome floor to 2 digit
    expect(Math.floor(getContrastRatio('#DCB487', '#135F96') * 100) / 100).toBe(
      3.51
    )
  })
})
