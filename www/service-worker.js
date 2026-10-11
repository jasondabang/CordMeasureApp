
const CACHE_NAME = "cord-calculator-v14";
const APP_SHELL = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    await Promise.all(
      APP_SHELL.map(async path => {
        try {
          const response = await fetch(path, { cache: "reload" });
          if (response.ok) {
            await cache.put(path, response);
          }
        } catch (error) {
          // Allow installation to continue if a resource is unavailable.
        }
      })
    );

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key =>
          key.startsWith("cord-calculator-") &&
          key !== CACHE_NAME
        )
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  const isHtml =
    request.mode === "navigate" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/");

  if (isHtml) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const response = await fetch(request, {
          cache: "no-store"
        });

        if (response.ok) {
          await cache.put(request, response.clone());
          await cache.put("./index.html", response.clone());
        }

        return response;
      } catch (error) {
        return (
          await cache.match(request) ||
          await cache.match("./index.html") ||
          await cache.match("./") ||
          Response.error()
        );
      }
    })());

    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) return cached;

    try {
      const response = await fetch(request);

      if (response.ok) {
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});
