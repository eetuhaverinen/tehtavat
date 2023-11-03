// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA

let cacheData = "appV2";


this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/api/tasks',
                '/index.html',
                '/'
            ]);
        })
    )
})

this.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.open(cacheData).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    })
                    .catch(() => caches.match(event.request));
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                return resp || fetch(event.request);
            })
        );
    }
});