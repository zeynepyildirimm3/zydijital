// ZY Restoran - Service Worker (Offline First + Network First for HTML & menu.json)
const CACHE_NAME = 'zy-restoran-v37';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=33',
  './app.js?v=33',
  './menu.json?v=27',
  './manifest.json',
  './icon.svg',
  './images/corbalar.webp?v=10',
  './images/kebaplar.webp?v=10',
  './images/tavuk.webp?v=10',
  './images/tas-firin.webp?v=10',
  './images/fast-food.webp?v=10',
  './images/tatlilar.webp?v=10',
  './images/sutlu-tatlilar.webp?v=10',
  './images/sicak-icecekler.webp?v=10',
  './images/soguk-icecekler.webp?v=10'
];

// Install: Cache all fresh assets bypassing HTTP cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First for navigations & menu.json (fresh updates when online), Cache-First within current CACHE_NAME for static assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isNetworkFirst =
    event.request.mode === 'navigate' ||
    url.pathname.endsWith('menu.json') ||
    url.pathname.endsWith('index.html');

  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cached) => {
              if (cached) return cached;
              return cache.match(event.request, { ignoreSearch: true }).then((looseMatch) => {
                if (looseMatch) return looseMatch;
                if (event.request.mode === 'navigate') {
                  return cache.match('./index.html');
                }
              });
            });
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse || cache.match(event.request, { ignoreSearch: true }));

        return cachedResponse || fetchPromise;
      });
    })
  );
});
