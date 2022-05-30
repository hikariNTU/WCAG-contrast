import { ModuleFormat } from 'rollup'

/**
 * Get heuristic convention module extension from format.
 * @param format format provide by rollup
 * @returns string extension, may contain extra `.` in middle
 */
function getConventionModuleExtension(format: ModuleFormat = 'cjs'): string {
  switch (format) {
    case 'cjs':
    case 'commonjs':
      return 'js'
    case 'es':
    case 'esm':
    case 'module':
      return 'mjs'
    default:
      return `${format}.js`
  }
}

export { getConventionModuleExtension }
