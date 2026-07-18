const CACHE = 'netapruva-v3';
const DOSYALAR = ['./','./index.html','./pdf.min.js','./pdf.worker.min.js',
                  './kitap.pdf','./manifest.webmanifest','./icon-192.png','./icon-512.png','./favicon.png'];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(DOSYALAR)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(
    k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(resp=>{
    const kopya = resp.clone();
    caches.open(CACHE).then(c=>c.put(e.request, kopya)).catch(()=>{});
    return resp;
  }).catch(()=>caches.match('./index.html'))));
});
