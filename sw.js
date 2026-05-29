// v1057-auto-update
const SW_VERSION = 'v1057';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => clients.forEach(c => {
        c.postMessage({ type: 'SW_UPDATED', version: SW_VERSION });
        c.navigate(c.url);
      }))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).catch(() => {
      return caches.match(e.request);
    })
  );
});
