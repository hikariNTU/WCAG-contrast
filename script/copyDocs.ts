import { cp } from 'fs/promises'
import { resolve } from 'path'

const root = resolve(__dirname, '../')
const from = resolve(root, 'packages/docs/dist')
const to = resolve(root, 'packages/demo/public/docs')

cp(from, to, { recursive: true })
