/* Service worker ResepKu: menyimpan berkas aplikasi agar bisa dibuka tanpa internet.
   Hanya berkas dari situs sendiri yang disimpan. Login dan localStorage tidak disentuh. */
const V = 'resepku-v2';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'app-config.js', 'apple-touch-icon.png',
  'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
// Jaringan dulu (agar pembaruan kode langsung terbaca), cadangan dari cache saat offline
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || u.pathname.endsWith('.apk')) return;
  e.respondWith(fetch(r).then(res => {
    if (res.ok) { const salin = res.clone(); caches.open(V).then(c => c.put(r, salin)); }
    return res;
  }).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
});
