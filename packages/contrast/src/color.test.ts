import { describe, it, expect } from 'vitest'
import { flattenColors, fromHEX, mergeColor, purifyHEX, RGBA } from './color'

const isCloseColor = (input: RGBA, expectColor: RGBA) => {
  expect(input?.length).toBe(4)
  expect(expectColor?.length).toBe(4)
  input.forEach((v, idx) => expect(v).toBeCloseTo(expectColor[idx]))
}

describe('color', () => {
  const solidWhite: RGBA = [1, 1, 1, 1]
  const solidBlack: RGBA = [0, 0, 0, 1]
  const blackTransparent: RGBA = [0, 0, 0, 0]

  it('purifyHex to 8-digit string', () => {
    expect(purifyHEX('#F367DD18')).toBe('F367DD18')
    expect(purifyHEX('#CCC')).toBe('CCCCCCff')
    expect(purifyHEX('#2222')).toBe('22222222')
    expect(purifyHEX('', 'fallback')).toBe('fallback')
  })

  it('convert HEX color to weight number', () => {
    expect(fromHEX('#000')).toEqual([0, 0, 0, 1])
    expect(fromHEX('#66666666')).toEqual([0.4, 0.4, 0.4, 0.4])
    expect(fromHEX('f06')).toEqual([1, 0, 0.4, 1])
  })

  it('mergeColor', () => {
    expect(mergeColor([1, 1, 1, 1], [0, 0.5, 1, 0.2])).toEqual([1, 1, 1, 1])
    expect(mergeColor([1, 0, 0.8, 0.5], [0, 0, 0, 1])).toEqual([0.5, 0, 0.4, 1])

    expect(mergeColor([1, 0, 0.8, 0.5], [0, 0, 0, 0.1])).toEqual([
      0.5, 0, 0.4, 0.55,
    ])

    isCloseColor(
      mergeColor([0, 0, 0, 0.1], [1, 0, 0.8, 0.5]),
      [0.45, 0, 0.36, 0.55]
    )
  })

  it('flattenColors', () => {
    expect(flattenColors(), 'no input should return transparent black').toEqual(
      blackTransparent
    )
    expect(
      flattenColors([0.2, 0.3, 0.4, 0.5]),
      'One color should merge to itself'
    ).toEqual([0.2, 0.3, 0.4, 0.5])

    expect(flattenColors([1, 1, 1, 1], [0, 0.5, 1, 0.2])).toEqual([1, 1, 1, 1])

    // Verified by Photoshop
    const RED_C22_30: RGBA = [
      0.8, 0.13333333333333333, 0.13333333333333333, 0.3,
    ]
    const GREEN_3B6_40: RGBA = [+0.2, +0.7333333333333333, 0.4, 0.4]
    const RED_ON_GREEN_WHITE_BG = '#B6A992'
    const GREEN_ON_RED_WHITE_BG = '#A4BC9A'
    const RED_GREEN_RED_BLACK_BG = '#66432B'

    isCloseColor(
      flattenColors(RED_C22_30, GREEN_3B6_40, solidWhite),
      fromHEX(RED_ON_GREEN_WHITE_BG)
    )

    isCloseColor(
      flattenColors(GREEN_3B6_40, RED_C22_30, solidWhite),
      fromHEX(GREEN_ON_RED_WHITE_BG)
    )

    isCloseColor(
      flattenColors(RED_C22_30, GREEN_3B6_40, RED_C22_30, solidBlack),
      fromHEX(RED_GREEN_RED_BLACK_BG)
    )
  })
})
