import { describe, it, expect } from 'vitest'
import { standardizeWeight, toRelativeLuminance } from './luminance'

describe('luminance', () => {
  it('standardizeColor with given weight', () => {
    expect(standardizeWeight(0), 'black to black').toBe(0)
    expect(standardizeWeight(1), 'white to white').toBe(1)
  })

  it('convert given color to relative luminance', () => {
    expect(toRelativeLuminance(0, 0, 0)).toBe(0)
    expect(toRelativeLuminance(1, 1, 1)).toBe(1)

    expect(
      toRelativeLuminance(65 / 255, 90 / 255, 110 / 255),
      '#415A6E = 0.095619'
    ).toBeCloseTo(0.095619, 5)

    expect(
      toRelativeLuminance(220 / 255, 180 / 255, 135 / 255),
      '#DCB487 = 0.49607'
    ).toBeCloseTo(0.49607, 5)
  })
})
