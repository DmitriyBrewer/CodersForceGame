const CACHE_NAME = 'my-cache-v1'

globalThis.addEventListener('install', event => {
  event.waitUntil(
    fetch('/manifest.json')
      .then(response => response.json())
      .then(manifest => {
        const urlsToCache = Object.values(manifest).map(entry => entry.file)

        return caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(urlsToCache)
        })
      })
  )
})

globalThis.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})

globalThis.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName)
            }
            return null
          })
          .filter(Boolean)
      )
    })
  )
})
