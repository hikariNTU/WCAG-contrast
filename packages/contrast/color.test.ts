import { describe, it, expect } from 'vitest'
import { fromHEX, purifyHEX } from './color'

describe('color', () => {
  it('purifyHex to 6-digit string', () => {
    expect(purifyHEX('#F367DD18')).toBe('F367DD')
    expect(purifyHEX('#CCC')).toBe('CCCCCC')
    expect(purifyHEX('#2222')).toBe('222222')
  })

  it('convert HEX color to weight number', () => {
    expect(fromHEX('#000')).toEqual([0, 0, 0])
    expect(fromHEX('#66666666')).toEqual([0.4, 0.4, 0.4])
    expect(fromHEX('f06')).toEqual([1, 0, 0.4])
  })

  it('will throw error', () => {
    expect(() => fromHEX('0')).toThrow()
    // @ts-expect-error testing
    expect(() => fromHEX()).toThrow()
  })
})
