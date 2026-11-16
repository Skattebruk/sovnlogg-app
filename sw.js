const CACHE="sovnlogg-v1";
const FILER=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILER)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(fetch(e.request).then(r=>{ if(r.ok&&(new URL(e.request.url).origin===location.origin||e.request.url.includes("fonts.")||e.request.url.includes("jsdelivr"))){ const k=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,k)); } return r; }).catch(()=>caches.match(e.request).then(m=>m||(e.request.mode==="navigate"?caches.match("index.html"):Response.error()))));
});
