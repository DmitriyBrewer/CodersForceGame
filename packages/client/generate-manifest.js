import * as fs from 'fs'
import path, { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const customDirName = dirname(filename)

const buildDir = resolve(customDirName, 'dist')
const manifestFile = resolve(buildDir, 'manifest.json')

function generateManifest() {
  const files = []

  function walk(dir) {
    const items = fs.readdirSync(dir)
    items.forEach(item => {
      const fullPath = path.join(dir, item)
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath)
      } else {
        files.push(fullPath.replace(buildDir, ''))
      }
    })
  }

  walk(buildDir)

  const manifest = files.reduce((acc, file) => {
    acc[file] = { file }
    return acc
  }, {})

  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2))
}

generateManifest()
