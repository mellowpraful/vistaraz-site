/*
 * MANNMITRA — Service Worker
 * Caches the app shell so the PWA works offline and installs on
 * mobile / tablet / laptop. Bump CACHE and re-run to invalidate.
 */
const CACHE = "mannmitra-v2";
const SHELL = [
  "./",
  "index.html",
  "checkin.html",
  "peer.html",
  "counselor.html",
  "dashboard.html",
  "journal.html",
  "breathing.html",
  "cbt.html",
  "community.html",
  "resources.html",
  "privacy.html",
  "admin.html",
  "crisis.html",
  "assets/css/style.css",
  "assets/js/i18n.js",
  "assets/js/state.js",
  "assets/js/triage.js",
  "assets/js/features.js",
  "assets/js/common.js",
  "assets/img/icon.svg",
  "assets/img/icon-192.png",
  "assets/img/icon-512.png",
  "assets/img/icon-maskable-512.png",
  "manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Notify open clients when a new service worker takes over (update available).
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // skip external

  // Navigations: network-first, fall back to cached shell (offline support).
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
    );
    return;
  }

  // Static assets: cache-first, then network (and cache the response).
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
