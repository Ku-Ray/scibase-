// SciBase Service Worker
// version bump で旧 cache を破棄して再 precache する
const VERSION = 'scibase-pwa-v1';
const PRECACHE = `${VERSION}-precache`;
const RUNTIME = `${VERSION}-runtime`;

const PRECACHE_URLS = [
  '/offline.html',
  '/logo/symbol-dark-192.png',
  '/logo/symbol-dark-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PRECACHE && key !== RUNTIME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/logo/') ||
    url.pathname.startsWith('/hero/') ||
    url.pathname === '/favicon.ico' ||
    /\.(?:png|jpg|jpeg|webp|avif|svg|gif|woff2?|ttf|css|js)$/.test(url.pathname)
  );
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // GA / analytics 等のサードパーティ計測は触らない（origin チェックで弾けるが念のため）
  if (url.pathname.startsWith('/api/')) return;

  // ナビゲーション（HTML）= network-first + offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          return fresh;
        } catch (err) {
          const cache = await caches.open(PRECACHE);
          const offline = await cache.match('/offline.html');
          return (
            offline ||
            new Response('Offline', { status: 503, statusText: 'Offline' })
          );
        }
      })()
    );
    return;
  }

  // 静的資産 = stale-while-revalidate
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.open(RUNTIME).then(async (cache) => {
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkPromise;
      })
    );
  }
});
