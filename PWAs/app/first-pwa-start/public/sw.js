const STATIC_CACHE_ID = 'static-files-v2';
const DYNAMIC_CACHE_ID = 'dynamic-v1'

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  // cache static files
  const preCache = async () => {
    console.log('[Service worker] Precaching app.js')
    const cache = await caches.open(STATIC_CACHE_ID);
    await cache.addAll([
      '/',
      '/index.html',
      '/src/js/app.js',
      '/src/js/feed.js',
      '/src/js/material.min.js',
      '/src/css/app.css',
      '/src/css/feed.css',
      '/src/images/main-image.jpg',
      'https://fonts.googleapis.com/css?family=Roboto:400,700',
      'https://fonts.googleapis.com/icon?family=Material+Icons',
      'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
    ]);
  }
  event.waitUntil(preCache());
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  const preCacheCleanUp = async () => {
    const cacheIds = await caches.keys();
    const removeCacheProms = cacheIds.map(id => {
      if (id !== STATIC_CACHE_ID && id !== DYNAMIC_CACHE_ID){
        console.log('[Service worker] delete cache', id);
        return caches.delete(id);
      }
    });
    return removeCacheProms;
  };
  event.waitUntil(preCacheCleanUp());
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  const getResponse = async () => {
    const { request } = event;
    const cachedResponse = await caches.match(request);
    let response = cachedResponse;
    if (!response) {
      response = await fetch(request);
      const cache = await caches.open(DYNAMIC_CACHE_ID);
      await cache.put(request.url, response);
    }
    return response;
  };
  event.respondWith(getResponse());
});
