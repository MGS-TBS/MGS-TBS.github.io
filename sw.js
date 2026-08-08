const CACHE="MG-1";

const FILES=[

"/",

"/index.html",

"/audio/Iron Heart 2026 Noor UpMusics.mp3",
"/data/playlist.json",
"/css/style.css",
"/css/audioPlayer.css",
"/css/animations.css",
"/css/heroShowcase.css",

"/js/app.js",
"/js/audioPlayer.js",
"/js/heroShowcase.js",
"/js/threeBackground.js",
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