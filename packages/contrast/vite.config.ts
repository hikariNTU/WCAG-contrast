import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { getConventionModuleExtension } from '../../script/getConventionExt'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'Contrast',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: (format) => `index.${getConventionModuleExtension(format)}`,
    },
  },
  plugins: [dts()],
})
