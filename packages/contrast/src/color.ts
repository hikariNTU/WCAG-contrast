export type R_V = number
export type G_V = number
export type B_V = number
export type A_V = number
export type SolidRGB = [R_V, G_V, B_V]
export type RGBA = [R_V, G_V, B_V, A_V]

/** Hex String, can be 3,4,6,8 format with or without '#' */
export type HEX = string

/** Hex code for 3,4,6,8 format with or without '#' */
export const HEXReg =
  /^#?[0-9a-fA-F]{3,4}$|^#?[0-9a-fA-F]{6}$|^#?[0-9a-fA-F]{8}$/

/**
 * Purify given hex color to 8-digit hex color for further processing
 * @param hex Hex String, can be 3,4,6,8 format with or without '#'
 * @param fallback = 'ffffffff', fallback string if fail to process string. Not guarantee against illegal character
 * @returns 8 digit hex color pad with alpha ff if not provide.
 * letter case not guarantee. '#' is not included. If the length is not 3,4,6,8 `fallback` will be returned
 * @example
 * ```
 * purifyHEX("#c29") // cc2299ff
 * purifyHEX("2222") // 22222222
 * purifyHEX("#FC39C5") // FC39C5ff
 * purifyHEX("12") // ffffffff
 * ```
 */
export const purifyHEX = (hex: HEX, fallback = 'ffffffff') => {
  if (!hex?.length) {
    return fallback
  }

  hex = hex.startsWith('#') ? hex.slice(1) : hex
  switch (hex.length) {
    case 3:
      return `${hex[0].repeat(2)}${hex[1].repeat(2)}${hex[2].repeat(2)}ff`
    case 4:
      return `${hex[0].repeat(2)}${hex[1].repeat(2)}${hex[2].repeat(
        2
      )}${hex[3].repeat(2)}`
    case 6:
      return `${hex}ff`
    case 8:
      return hex
    default:
      return fallback
  }
}

/**
 * Get each channel weight value from HEX code
 * @param hex HEX color string, can omit '#' and support all 3-digit 4-digit, 6-digit, 8-digit color LV4 version.
 * @returns Array of `[R, G, B, A]` value from 0 to 1
 */
export const fromHEX = (hex: HEX): RGBA => {
  const h = purifyHEX(hex)

  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
    parseInt(h.slice(6, 8), 16) / 255,
  ]
}

/**
 * Merge color on top of other color
 * @param c1 Top layer RGBA
 * @param c2 Bottom layer RGBA
 * @returns RGBA merge with alpha channel precomputed. AKA fake transparent.
 */
export const mergeColor = (c1: RGBA | SolidRGB, c2: RGBA | SolidRGB): RGBA => {
  if (c1.length === 3) return [...c1, 1]
  if (c1[3] === 1) return c1

  const w2 = 1 - c1[3]
  const c2a: RGBA =
    c2.length === 3
      ? [...c2, 1]
      : [c2[0] * c2[3], c2[1] * c2[3], c2[2] * c2[3], c2[3]]
  return [
    c1[0] * c1[3] + c2a[0] * w2,
    c1[1] * c1[3] + c2a[1] * w2,
    c1[2] * c1[3] + c2a[2] * w2,
    c1[3] + c2a[3] * w2,
  ] as RGBA
}

/**
 * Merge multiple colors into one color
 * @param args list of RGBA color, in layer descending order, last element is treated as background
 * @returns merged RGBA color, if no input, will return `[0,0,0,0]`
 * @example
 * ```
 * const RED_C22_30 = [0.8, 0.133, 0.13, 0.3]
 * const GREEN_3B6_40 = [0.2, 0.733, 0.4, 0.4]
 *
 * flattenColors(
 *   RED_C22_30,
 *   GREEN_3B6_40,
 *   RED_C22_30,
 *   fromHEX('#000') // black background
 * ) // [ 0.3968, 0.262, 0.1688, 1 ]
 * ```
 */
export const flattenColors = (...args: (RGBA | SolidRGB)[]): RGBA => {
  const init: RGBA = [0, 0, 0, 0]
  if (!args?.length) return init
  if (args.length === 1) {
    if (args[0].length === 3) return [...args[0], 1]
    return args[0]
  }

  const firstSolid = args.findIndex((v) => v.length === 3 || v[3] === 1)

  const merged = (firstSolid !== -1 ? args.slice(0, firstSolid + 1) : args)
    .reverse()
    .reduce((prev, current) => mergeColor(current, prev))

  return merged as RGBA
}
