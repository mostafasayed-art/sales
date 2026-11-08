const C='inv-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||!(u.origin===location.origin||u.host==='www.gstatic.com'||u.host==='fonts.gstatic.com'||u.host==='fonts.googleapis.com'))return;
 e.respondWith(caches.open(C).then(async c=>{
  const m=await c.match(e.request);
  const f=fetch(e.request).then(r=>{if(r.ok||r.type==='opaque')c.put(e.request,r.clone());return r}).catch(()=>m);
  return m||f;
 }));
});
