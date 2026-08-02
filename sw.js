const CACHE="MG-1";

const FILES=[

"/",

"/index.html",

"/css/style.css",

"/css/animations.css",

"/js/app.js",

"/js/router.js"

];

self.addEventListener(

"install",

e=>{

e.waitUntil(

caches.open(CACHE)

.then(cache=>{

cache.addAll(FILES);

})

);

});

self.addEventListener(

"fetch",

e=>{

e.respondWith(

caches.match(e.request)

.then(r=>{

return r || fetch(e.request);

})

);

});