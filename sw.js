// v999-nocache
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => clients.forEach(c => c.navigate(c.url)))
  );
});
// キャッシュ一切使わない - 常にネットワークから取得
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request, { cache: 'no-store' }));
});
