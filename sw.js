const CACHE="MG-1";

const FILES=[

"/",

"/index.html",

"/css/style.css",
"/css/audioPlayer.css",

"/css/animations.css",

"/js/app.js",
"/js/audioPlayer.js",

"/js/router.js"


];

self.addEventListener(

"install",

event=>{

event.waitUntil(

caches.open(CACHE)

.then(cache=>

cache.addAll(FILES))

);

});

self.addEventListener(

"fetch",

event=>{

event.respondWith(

caches.match(event.request)

.then(r=>

r || fetch(event.request)

)

);

});