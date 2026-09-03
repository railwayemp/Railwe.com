// Minimal service worker — required by Chrome for "Install app" to offer
// a real standalone install instead of a plain bookmark shortcut.
// This does not cache anything; it just needs to exist and handle fetch.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass-through — no offline caching, just satisfies the PWA installability
  // criteria that requires a fetch handler to be registered.
  event.respondWith(fetch(event.request));
});
