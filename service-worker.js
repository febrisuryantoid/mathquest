
const CACHE_NAME = 'mathquest-v0.5-cache';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activate SW and clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Strategy: Stale-While-Revalidate for most resources
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests (like Supabase or CDN fonts if not CORS configured properly) for strict caching,
  // but generally try to fetch.
  
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response immediately if available
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Update the cache with the new response
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
           // Network failed, do nothing (cached response was already returned if exists)
        });

        // Return cached response if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
  );
});
