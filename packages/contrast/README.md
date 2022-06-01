[![CI](https://github.com/hikariNTU/WCAG-contrast/actions/workflows/main.yml/badge.svg)](https://github.com/hikariNTU/WCAG-contrast/actions/workflows/main.yml)
[![npm](https://img.shields.io/npm/v/wcag-contrast-util)](https://www.npmjs.com/package/wcag-contrast-util)

# WCAG Contrast Util
Helper function for WCAG contrast criteria

[View full typescript document](https://hikarintu.github.io/WCAG-contrast/) - created by **TypeDoc**

**Features**

- 🌈 color from `#HEX` with level-4 color support (3,4,6,8 digit)
- 🎨 flatten multiple translucent colors into one color
- 📏 Typography helper for large text
- 💡 Luminance contrast helper with different threshold
- 📅 More features are coming up...

**What we got**

- Written in TypeScript with docs 📃
- Fully Tested ✅
- Ship with tree shakable ES module 📦
- function based api 🤝

## Install
```
npm install wcag-contrast-util
```

## Usage

**All-in-one Contrast Function**
```js
import { isAA } from 'wcag-contrast-util'

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
```
