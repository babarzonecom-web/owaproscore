// v82 - 強制キャッシュクリア版
const CACHE_VERSION = 'v82';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => {
        console.log('[SW] deleting cache:', k);
        return caches.delete(k);
      })))
      .then(() => {
        console.log('[SW] all caches cleared, claiming clients');
        return self.clients.claim();
      })
      .then(() => {
        // 全クライアントにリロードを要求
        return self.clients.matchAll({ type: 'window' });
      })
      .then(clients => {
        clients.forEach(client => client.navigate(client.url));
      })
  );
});

self.addEventListener('fetch', e => {
  // キャッシュせず常にネットワークから取得
  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .catch(() => caches.match(e.request))
  );
});
