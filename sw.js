// v1001-auto-update
const SW_VERSION = 'v1001';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => clients.forEach(c => c.navigate(c.url)))
  );
});

self.addEventListener('fetch', e => {
  // 常に最新を取得（キャッシュなし）
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).catch(() => {
      return caches.match(e.request);
    })
  );
});
