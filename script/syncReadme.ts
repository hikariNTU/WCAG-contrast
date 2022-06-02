import { argv } from 'process'
import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

const root = resolve(__dirname, '../')
const rootReadmePath = resolve(root, 'README.md')
const targetReadmePath = resolve(root, 'packages/contrast/README.md')

const getArgv = (key: string): string | boolean | undefined => {
  // Return true if the key exists and a value is defined
  if (argv.includes(`--${key}`)) return true

  const value = argv.find((element) => element.startsWith(`--${key}=`))

  // Return null if the key does not exist and a value is not defined
  if (!value) return undefined

  const arg = value.replace(`--${key}=`, '')
  if (arg === 'false') {
    return false
  }

  return arg
}

const checkReadmeSync = async () => {
  console.log('Checking README.md files is sync:')
  console.log('source: ', rootReadmePath, '\ntargets: ', targetReadmePath)
  const rootReadme = await readFile(rootReadmePath, 'utf-8')
  const targetReadme = await readFile(targetReadmePath, 'utf-8')
  return rootReadme === targetReadme
}

const copyReadme = async () => {
  const rootReadme = await readFile(rootReadmePath, 'utf-8')
  await writeFile(targetReadmePath, rootReadme, 'utf-8')
  console.log('Sync Done!')
}

async function main() {
  const isSync = await checkReadmeSync()

  if (isSync) {
    console.log('Readme file up-to-date.')
    return
  }

  if (getArgv('check')) {
    if (!isSync) {
      throw Error('README.md is not sync with packages!')
    }
    return
  }

  await copyReadme()
}

main()
