// Minimal stateless Service Worker for PWA installability & in-memory share_target
let pendingSharedFiles = [];

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method === "POST" &&
    url.pathname === "/" &&
    url.searchParams.get("shared") === "1"
  ) {
    event.respondWith(
      (async () => {
        try {
          const formData = await event.request.formData();
          const files = formData.getAll("screenshots");
          pendingSharedFiles = files.filter((f) => f && f.size > 0).slice(0, 5);
        } catch {
          pendingSharedFiles = [];
        }
        return Response.redirect("/?shared=1", 303);
      })()
    );
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CLAIM_SHARED_IMAGES") {
    const filesToSend = pendingSharedFiles;
    pendingSharedFiles = [];
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ files: filesToSend });
    }
  }
});
