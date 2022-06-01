import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

import rootPkg from '../package.json'

const pkgs = [resolve(__dirname, '../packages/contrast/package.json')]
const newVersion = `"version": "${rootPkg.version}"`

pkgs.forEach(async (pkg) => {
  const pkgData = await readFile(pkg, 'utf-8')

  await writeFile(pkg, pkgData.replace(/"version": ".*"/, newVersion))
})
