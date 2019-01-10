if('serviceWorker' in navigator) {
  // register
  navigator.serviceWorker
   .register('/serviceWorker.js')
   .then(() => console.log('Service worker registered'));
}
