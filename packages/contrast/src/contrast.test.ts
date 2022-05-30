import { describe, it, expect } from 'vitest'
import { getContrastRatio, isAA, isAAA } from './contrast'

describe('contrast', () => {
  it('getContrastRatio with given data', () => {
    expect(getContrastRatio('#000', '#FFF')).toBe(21)
    expect(getContrastRatio('#222', '#222')).toBe(1)

    // chrome: 3.51, chrome floor to 2 digit
    expect(Math.floor(getContrastRatio('#DCB487', '#135F96') * 100) / 100).toBe(
      3.51
    )
  })

  it('check AA and AAA', () => {
    // 6.38
    const A = { color: '#57606A', size: 14 }
    // 5.19
    const B = { color: '#0969DA', size: 14 }

    expect(isAA(A, '#FFF')).toBe(true)
    expect(isAA(B, '#FFF')).toBe(true)
    expect(isAAA(B, '#FFF')).toBe(false)
    expect(isAAA(A, '#FFF')).toBe(false)
    expect(isAAA({ ...A, size: 24 }, '#FFF')).toBe(true)
  })
})
