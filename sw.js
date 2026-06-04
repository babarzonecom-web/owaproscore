const SW_VERSION='v471.6';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(c=>caches.delete(c)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll({type:'window'})).then(cs=>cs.forEach(c=>{c.postMessage({type:'SW_UPDATED',version:SW_VERSION});c.navigate(c.url);})));});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));});
