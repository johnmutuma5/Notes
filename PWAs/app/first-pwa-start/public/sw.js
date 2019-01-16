
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  // cache static files
  const preCache = async () => {
    console.log('[Service worker] Precaching app.js')
    const cache = await caches.open('static-files');
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
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  const getResponse = async () => {
    const { request } = event;
    const response = await caches.match(request);
    return (response && response) || fetch(request);
  };

  return event.respondWith(getResponse());
});
