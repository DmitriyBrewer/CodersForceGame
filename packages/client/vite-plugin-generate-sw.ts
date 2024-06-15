import { Plugin } from 'vite'

import { paths } from './src/shared/config/routing'

import { resolve } from 'path'
import { promises as fs } from 'fs'

async function getFiles(dir: string, fileList: string[], baseDir: string) {
  const files = await fs.readdir(dir)

  const stats = await Promise.all(
    files.map(async file => {
      const filePath = resolve(dir, file)
      const fileStat = await fs.stat(filePath)
      return { filePath, fileStat }
    })
  )

  await Promise.all(
    stats.map(async ({ filePath, fileStat }) => {
      if (fileStat.isDirectory()) {
        await getFiles(filePath, fileList, baseDir)
      } else {
        fileList.push(filePath.replace(baseDir, ''))
      }
    })
  )

  return fileList
}

function generateSWContent(files: string[]) {
  const urlsToCache = files.map(file => `${file}`)
  return `
    const CACHE_NAME = 'my-cache-v1';
    const urlsToCache = ${JSON.stringify(urlsToCache)};
    
    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          }).catch(err => { 
          console.error(err);
          throw err;
        })
      );
    });
    
    self.addEventListener('fetch', (event) => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            const fetchRequest = event.request.clone();
            return fetch(fetchRequest)
          })
      );
    });
    
    self.addEventListener('activate', (event) => {
      const cacheWhitelist = [CACHE_NAME];
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });
  `
}

function generateSWPlugin(): Plugin {
  const fileList = Object.values(paths).filter(el => el.startsWith('/'))
  return {
    name: 'generate-sw-plugin',
    apply: 'build',
    closeBundle: async () => {
      const outDir = resolve(__dirname, 'dist')
      const files = await getFiles(outDir, fileList, outDir)

      const swContent = generateSWContent(files)
      await fs.writeFile(resolve(outDir, 'service-worker1.js'), swContent)
    }
  }
}

export default generateSWPlugin
