self.addEventListener("install", event => {
  console.log('Service Worker installing...');
  self.skipWaiting(); // Activate immediately
});

self.addEventListener("activate", event => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim()); // Take control immediately
});

self.addEventListener("fetch", event => {
  const url = event.request.url;

  // Only intercept HLS and TS requests
  if (!url.includes(".ts") && !url.includes(".m3u8")) return;

  console.log('SW intercepting:', url);

  event.respondWith(
    fetch(event.request, { 
      mode: "cors",
      credentials: "omit"
    })
      .then(r => r.arrayBuffer())
      .then(b => new Response(b, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Accept-Ranges": "bytes",
          "Content-Length": b.byteLength,
          "Content-Type": url.includes(".m3u8") ? "application/vnd.apple.mpegurl" : "video/mp2t"
        }
      }))
      .catch(err => {
        console.error('SW fetch failed:', err);
        return new Response('', { status: 500 });
      })
  );
});

