// Minimal stateless Service Worker for PWA installability (zero caching of user evidence)
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Intentionally pass-through so sensitive evidence data is never cached in SW storage
});
