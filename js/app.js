/*==========================================
MG Portfolio
Main Application
==========================================*/

"use strict";

const App = {

init() {

this.loader();

this.progressBar();

this.reveal();

this.ripple();

this.counter();

this.cardHover();

this.navHighlight();

this.parallax();

this.smoothAnchor();

this.timeline();

this.lazyImage();

},

/*========================
Loader
========================*/

loader() {

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if (!loader) return;

setTimeout(() => {

loader.style.opacity = "0";

loader.style.pointerEvents = "none";

setTimeout(() => {

loader.remove();

}, 1000);

}, 900);

});

},

/*========================
Scroll Progress
========================*/

progressBar() {

const progress = document.getElementById("progress");

window.addEventListener("scroll", () => {

const h = document.documentElement;

const total = h.scrollHeight - h.clientHeight;

const p = (h.scrollTop / total) * 100;

progress.style.width = p + "%";

});

},

/*========================
Reveal Animation
========================*/

reveal() {

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.classList.add("show");

}

});

}, {

threshold: .15

});

document.querySelectorAll(

".fade-in,.zoom,.left,.right,.blur,.rotate"

).forEach(el => {

observer.observe(el);

});

},

/*========================
Ripple
========================*/

ripple() {

document.querySelectorAll(".ripple").forEach(button => {

button.addEventListener("click", function (e) {

const circle = document.createElement("span");

const size = Math.max(

this.clientWidth,

this.clientHeight

);

circle.style.width = size + "px";

circle.style.height = size + "px";

const rect = this.getBoundingClientRect();

circle.style.left =

e.clientX - rect.left - size / 2 + "px";

circle.style.top =

e.clientY - rect.top - size / 2 + "px";

this.appendChild(circle);

setTimeout(() => {

circle.remove();

}, 800);

});

});

},

/*========================
Counter
========================*/

counter() {

const numbers = document.querySelectorAll("[data-count]");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if (!entry.isIntersecting) return;

const el = entry.target;

const max = parseInt(el.dataset.count);

let value = 0;

const speed = Math.max(5, Math.floor(max / 120));

const timer = setInterval(() => {

value += speed;

if (value >= max) {

value = max;

clearInterval(timer);

}

el.innerText = value;

}, 15);

observer.unobserve(el);

});

});

numbers.forEach(n => observer.observe(n));

},

/*========================
Cards
========================*/

cardHover() {

document.querySelectorAll(".card").forEach(card => {

card.addEventListener("mousemove", e => {

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

const rx = -(y - rect.height / 2) / 20;

const ry = (x - rect.width / 2) / 20;

card.style.transform =

`perspective(900px)
 rotateX(${rx}deg)
 rotateY(${ry}deg)
 translateY(-10px)`;

});

card.addEventListener("mouseleave", () => {

card.style.transform = "";

});

});

},

/*========================
Navigation Active
========================*/

navHighlight() {

const sections = document.querySelectorAll("section");

const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(sec => {

const top = window.scrollY;

if (top >= sec.offsetTop - 150) {

current = sec.id;

}

});

links.forEach(link => {

link.classList.remove("active");

if (

link.getAttribute("href") == "#" + current

)

link.classList.add("active");

});

});

},

/*========================
Parallax
========================*/

parallax() {

window.addEventListener("scroll", () => {

const y = window.scrollY;

document.querySelectorAll(".parallax")

.forEach(el => {

el.style.transform =

`translateY(${y * .2}px)`;

});

});

},

/*========================
Smooth Anchor
========================*/

smoothAnchor() {

document.querySelectorAll("a[href^='#']")

.forEach(link => {

link.addEventListener("click", e => {

e.preventDefault();

const target =

document.querySelector(

link.getAttribute("href")

);

if (!target) return;

target.scrollIntoView({

behavior: "smooth"

});

});

});

},

/*========================
Timeline
========================*/

timeline() {

const box = document.getElementById("timeline");

if (!box) return;

const years = [

2023,

2024,

2025,

2026

];

years.forEach(y => {

const div = document.createElement("div");

div.className = "timelineItem fade-in";

div.innerHTML =

`

<h3>${y}</h3>

<p>

Timeline Placeholder

</p>

`;

box.appendChild(div);

});

},

/*========================
Lazy Image
========================*/

lazyImage() {

const images = document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if (!entry.isIntersecting) return;

const img = entry.target;

img.src = img.dataset.src;

observer.unobserve(img);

});

});

images.forEach(i => observer.observe(i));

}

};

document.addEventListener(

"DOMContentLoaded",

() => {

App.init();

}

);