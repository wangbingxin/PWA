var cache_storage_key = 'minimal-pwa-1'

var cache_list = [
    '/',
    "index.html",
    "PWA.css",

]


self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cache_storage_key)
            .then(cache => cache.addAll(cache_list))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response != null) {
                return response
            }
            return fetch(e.request.url)
        })
    )
})

self.addEventListener('activate', function(e) {
    e.waitUntil(
        Promise.all(
            caches.keys().then(function(cacheNames){
                return cacheNames.map(name => {
                    if (name !== cache_storage_key) {
                        return caches.delete(name)
                    }
                })
            })
        ).then(() => {
            return self.clients.claim()
        })
    )
})