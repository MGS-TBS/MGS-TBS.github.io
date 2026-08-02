/*==========================================
 MG Portfolio SPA Router
 HTML + JavaScript
==========================================*/

"use strict";

class Router {

constructor() {

this.routes = {};

this.cache = {};

this.container = null;

}

init(containerId = "app") {

this.container = document.getElementById(containerId);

window.addEventListener(

"popstate",

() => this.load(location.pathname, false)

);

document.addEventListener(

"click",

e => {

const link = e.target.closest("[data-link]");

if (!link) return;

e.preventDefault();

this.navigate(link.getAttribute("href"));

}

);

this.load(location.pathname, false);

}

register(path, file) {

this.routes[path] = file;

}

async navigate(path) {

history.pushState({}, "", path);

await this.load(path, true);

}

async load(path, animate = true) {

let page = this.routes[path];

if (!page)

page = this.routes["/"];

if (!page) return;

let html;

if (this.cache[page]) {

html = this.cache[page];

}

else {

const response = await fetch(page);

html = await response.text();

this.cache[page] = html;

}

if (animate)

await this.fadeOut();

this.container.innerHTML = html;

window.scrollTo({

top: 0,

behavior: "instant"

});

if (animate)

await this.fadeIn();

this.afterLoad();

}

/*==========================
Fade
==========================*/

fadeOut() {

return new Promise(resolve => {

gsap.to(

this.container,

{

opacity:0,

y:40,

duration:.35,

onComplete:resolve

}

);

});

}

fadeIn() {

return new Promise(resolve => {

gsap.fromTo(

this.container,

{

opacity:0,

y:40

},

{

opacity:1,

y:0,

duration:.5,

ease:"power2.out",

onComplete:resolve

}

);

});

}

/*==========================
After Load
==========================*/

afterLoad() {

document.title =

document.querySelector("h1")

? document.querySelector("h1").innerText

: "MG Portfolio";

this.lazyImages();

this.highlight();

this.pageAnimation();

}

/*==========================
Lazy Images
==========================*/

lazyImages() {

const images = document.querySelectorAll(

"img[data-src]"

);

const observer = new IntersectionObserver(

entries => {

entries.forEach(entry => {

if (!entry.isIntersecting)

return;

const img = entry.target;

img.src = img.dataset.src;

observer.unobserve(img);

});

}

);

images.forEach(i => observer.observe(i));

}

/*==========================
Highlight Menu
==========================*/

highlight() {

document

.querySelectorAll("nav a")

.forEach(link => {

link.classList.remove("active");

if (

link.getAttribute("href")

==

location.pathname

)

link.classList.add("active");

});

}

/*==========================
Page Animation
==========================*/

pageAnimation() {

gsap.utils

.toArray(

".card"

)

.forEach((card,index)=>{

gsap.from(

card,

{

opacity:0,

y:60,

delay:index*.08,

duration:.7,

ease:"back.out(1.5)"

}

);

});

}

}

/*==========================================
Router Create
==========================================*/

const router = new Router();

router.register("/","pages/home.html");

router.register("/software","pages/software.html");

router.register("/engineering","pages/engineering.html");

router.register("/cases","pages/cases.html");

router.register("/blog","pages/blog.html");

router.register("/downloads","pages/downloads.html");

router.register("/about","pages/about.html");

window.addEventListener(

"DOMContentLoaded",

()=>{

if(document.getElementById("app"))

router.init("app");

}

);

/*==========================================
Preload Pages
==========================================*/

window.addEventListener(

"load",

()=>{

Object.values(router.routes)

.forEach(file=>{

fetch(file)

.then(r=>r.text())

.then(html=>{

router.cache[file]=html;

});

});

});

/*==========================================
Keyboard Navigation
==========================================*/

document.addEventListener(

"keydown",

e=>{

if(e.altKey && e.key==="1")

router.navigate("/");

if(e.altKey && e.key==="2")

router.navigate("/software");

if(e.altKey && e.key==="3")

router.navigate("/engineering");

if(e.altKey && e.key==="4")

router.navigate("/cases");

});

/*==========================================
End
==========================================*/