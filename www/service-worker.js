
const CACHE_NAME = "cord-calculator-v13-autosave-fix";
const APP_SHELL = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    await Promise.all(APP_SHELL.map(async path => {
      try {
        const response = await fetch(path, {
          cache: "reload"
        });

        if (response.ok) {
          await cache.put(path, response);
        }
      } catch (_) {}
    }));

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);

  if (url.origin !== self.location.origin) return;

  const isAppHtml =
    req.mode === "navigate" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/");

  if (isAppHtml) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, {
          cache: "no-store"
        });

        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("./index.html", fresh.clone());
        }

        return fresh;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);

        return (
          await cache.match(req) ||
          await cache.match("./index.html") ||
          Response.error()
        );
      }
    })());

    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);

    if (cached) return cached;

    try {
      const response = await fetch(req);

      if (response && response.ok) {
        await cache.put(req, response.clone());
      }

      return response;
    } catch (_) {
      return Response.error();
    }
  })());
});
