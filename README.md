[![CI](https://github.com/hikariNTU/WCAG-contrast/actions/workflows/main.yml/badge.svg)](https://github.com/hikariNTU/WCAG-contrast/actions/workflows/main.yml)
[![npm](https://img.shields.io/npm/v/wcag-contrast-util)](https://www.npmjs.com/package/wcag-contrast-util)

# WCAG Contrast Util
Helper functions for WCAG contrast criteria.

According to [Web Content Accessibility Guidelines (WCAG) 2.1 - #1.4.3 contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum),
the intent of these Success Criteria are to provide enough contrast between text and its background so that it can be read by people with moderately low vision. Developer should take care of the colors used in website meet these criteria.

**WCAG Contrast Util** provides several utils function to calculate these standard.
Including [contrast ratio](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#dfn-contrast-ratio),
[relative luminance](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#dfn-relative-luminance),
[large scale text](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum#dfn-large-scale)
and also handy utils to transform HEX color, combining multiple translucent color, mapping typography weight keyword and so on.

[View full document](https://hikarintu.github.io/WCAG-contrast/) for more usages- created by **TypeDoc**

**Features**

- 🌈 color from `#HEX` with level-4 color support (3,4,6 and 8 digit)
- 🎨 flatten multiple translucent colors into one color
- 📏 Typography helper for large text
- 💡 Luminance contrast helper with different threshold
- 📅 More features are coming up...

**What we got**

- Written in TypeScript with docs 📃
- Fully tested ✅
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
