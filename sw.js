// ET Shorts Service Worker v1.0
const CACHE = 'et-shorts-v1';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  // Network first for API calls, cache first for assets
  if (e.request.url.includes('anthropic.com') || e.request.url.includes('dailyepaper.in') || e.request.url.includes('drive.google.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response('Offline', { status: 503 })));
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
  }
});

// Handle push notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'ET Shorts', body: "Today's newspaper is ready!" };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icon-192.png',
      badge: './icon-192.png',
      tag: 'et-daily',
      renotify: true,
      data: { url: './index.html' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url || './index.html'));
});

// Daily alarm check (via periodic sync if supported)
self.addEventListener('periodicsync', e => {
  if (e.tag === 'daily-news-check') {
    e.waitUntil(checkDailyNews());
  }
});

async function checkDailyNews() {
  const now = new Date();
  const hour = now.getHours();
  // Notify between 8-9 AM
  if (hour >= 8 && hour < 9) {
    self.registration.showNotification('📰 ET Shorts', {
      body: "Good morning! Today's Economic Times is ready to read.",
      icon: './icon-192.png',
      tag: 'et-daily',
      data: { url: './index.html' }
    });
  }
}
