self.addEventListener('install', event => (
  console.log('[Service Worker] Installing the service worker...', event)
));


self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating the service worker...', event);
  return self.clients.claim(); // not compulsory, allows an active service worker to set itself as the controller for all clients
});
