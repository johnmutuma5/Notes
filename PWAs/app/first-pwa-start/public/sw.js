
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  // cache static files
  const preCache = async () => {
    console.log('[Service worker] Precaching app.js')
    const cache = await caches.open('static-files');
    await cache.add('/src/js/app.js');
  }
  event.waitUntil(preCache());
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  self.addEventListener('fetch', event => {
    const getResponse = async () => {
      const { request } = event;
      const response = await caches.match(request);
      return (response && response) || fetch(request);
    };

    return event.respondWith(getResponse());
});
