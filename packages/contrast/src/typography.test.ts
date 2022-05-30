import { describe, it, expect } from 'vitest'
import { fontWeightLUT, getFontWeight, isLargeText } from './typography'

describe('typography', () => {
  it('fontWeightLUT map variants to number', () => {
    expect(fontWeightLUT['regular']).toBe(400)
    expect(fontWeightLUT['normal']).toBe(400)
    expect(fontWeightLUT['medium']).toBe(500)
    expect(fontWeightLUT['black']).toBe(900)
    expect(fontWeightLUT['extra-light']).toBe(200)
  })

  it('getFontWeight', () => {
    expect(getFontWeight('bold')).toBe(700)
    expect(getFontWeight('bolder', 500)).toBe(700)
    expect(getFontWeight('lighter', 500)).toBe(400)
    expect(getFontWeight(undefined)).toBeUndefined()
    expect(getFontWeight('lighter', undefined)).toBeUndefined()
    expect(getFontWeight('lighter', 'bolder')).toBeUndefined()
  })

  it('determine large text', () => {
    expect(
      isLargeText({
        size: 24,
      })
    ).toBe(true)

    expect(
      isLargeText({
        size: 23.5,
      })
    ).toBe(false)

    expect(
      isLargeText({
        size: 19,
        weight: 'bold',
      })
    ).toBe(true)

    expect(
      isLargeText({
        size: 18,
        weight: 'black',
      })
    ).toBe(false)
  })
})
