// KeyMatrix OS Service Worker - Offline Civilization Runtime v0.6.1 PRE-ZIP HARDENED
const CACHE_NAME = 'keymatrix-os-v0.6.1-prezip';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/docs-for-agents/AGENT_BOOTSTRAP.md',
  '/docs-for-agents/ADAPTER_AUTONOMY_SPEC.md',
  '/docs-for-agents/OFFLINE_MANIFEST.json',
  '/docs-for-agents/KEYMATRIX_MASTER_SYSTEM_MODEL_002.json',
  '/docs-for-agents/KEYMATRIX_NUR_DIGITAL_CASH_EXECUTION_MODEL_001.json',
  '/docs-for-agents/KM_DR_CROSS_SYSTEM_CONSISTENCY.json',
  '/docs-for-agents/KM_AUTHORITY_DR_REMEDIATION.json',
  '/docs-for-agents/KM_NEXT_STRONG_MOVES_DECISION_PACK.json',
  '/docs-for-agents/KM-OS-CONCEPTUAL-RUNTIME-ENGINEERING-INSTRUCTION.json',
  '/docs-for-agents/keymatrix_master_architecture.html',
];

// Offline fallback static tables (Quran, Prayer, Qibla, 7-Language Translations, NUR Ledger Snapshots)
const OFFLINE_DATA_STORES = {
  quran: 'KEYMATRIX_QURAN_TANZIL_TEXT_V1',
  prayer: 'KEYMATRIX_PRAYER_MWL_TABLES_V1',
  qibla: 'KEYMATRIX_QIBLA_TRIGONOMETRY_CACHE',
  translations: ['en', 'ru', 'az', 'ar', 'tr', 'fa', 'ur'],
  ledgerSnapshots: 'KEYMATRIX_NUR_LEDGER_RECONCILED_SNAPSHOTS',
};

// Install Event - Pre-cache shell & offline agent documentation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate with offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For navigation requests, return cached shell
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html') || caches.match('/');
      })
    );
    return;
  }

  // Network first for Quran / AlAdhan APIs with offline cache fallback
  if (
    url.hostname.includes('quran.com') ||
    url.hostname.includes('aladhan.com') ||
    url.hostname.includes('googleapis.com')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const respClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache First for static assets and documentation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const respClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.destination === 'image') {
            return caches.match('/icon.svg');
          }
        });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
