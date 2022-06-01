[![CI](https://github.com/hikariNTU/WCAG-contrast/actions/workflows/main.yml/badge.svg)](https://github.com/hikariNTU/WCAG-contrast/actions/workflows/main.yml)
![npm](https://img.shields.io/npm/v/wcag-contrast-util)

# WCAG-Contrast
helper function for WCAG contrast criterion

- Fully Typed ✅
- ES module 📦
- function based api ⚒

[View full typescript document](https://hikarintu.github.io/WCAG-contrast/) - created by **TypeDoc**

## Install
WIP:
```
npm install wcag-contrast-util
```

## Usage

```js
import {isAA} from 'wcag-contrast-util'

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

## Develop

> Recommend IDE: Visual Studio Code

**Install Node.js**

Requirement: version >= 14.0
both 14LTS, 16LTS is recommended.

**Install pnpm**
Make sure `pnpm` pkg manager is install.
[Installation Guide](https://pnpm.io/installation)

```
npm i -g pnpm
```

**Install dependencies**

```
pnpm i
```
