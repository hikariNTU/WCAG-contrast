export const purifyHEX = (hex: string) => {
  const str = hex.startsWith('#') ? hex.slice(1) : hex
  return str.length <= 4
    ? `${str[0].repeat(2)}${str[1].repeat(2)}${str[2].repeat(2)}`
    : str.slice(0, 6)
}

/**
 * Get each channel weight value from HEX code
 * @param hex HEX color string, can omit '#' and support all 3-digit 4-digit, 6-digit, 8-digit color LV4 version.
 * @returns Array of `[R, G, B]` value from 0 to 1
 */
export const fromHEX = (hex: string): [number, number, number] => {
  const hex6 = purifyHEX(hex)

  return [
    parseInt(hex6.slice(0, 2), 16) / 255,
    parseInt(hex6.slice(2, 4), 16) / 255,
    parseInt(hex6.slice(4, 6), 16) / 255,
  ]
}
