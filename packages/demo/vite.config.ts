import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pkg from 'wcag-contrast-util/package.json'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/WCAG-contrast/' : '/',
  define: {
    PKG_VERSION: `"v${pkg.version}"`,
  },
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
  plugins: [vue()],
}))
