/*==================================================
    MGS Hero Showcase
    Version : 1.0
==================================================*/

"use strict";

const Showcase={

container:null,

flow:null,

items:[],

slides:[],

current:0,

autoPlay:true,

interval:6000,

timer:null,

dragging:false,

startX:0,

deltaX:0,

mouseX:0,

mouseY:0,

fullscreen:null

};



document.addEventListener(

"DOMContentLoaded",

initShowcase

);



async function initShowcase(){

Showcase.container=

document.querySelector(".coverFlow");

if(!Showcase.container) return;



Showcase.fullscreen=

document.querySelector(".fullscreenViewer");



await loadShowcase();



buildSlides();



createButtons();



createDots();



updateFlow();



startAutoPlay();



bindEvents();

}
async function loadShowcase(){

try{

const res=

await fetch("data/showcase.json");

Showcase.items=

await res.json();

}

catch(e){

console.error(e);

}

}
function buildSlides(){

Showcase.items.forEach(

(item,index)=>{

const card=

document.createElement("div");

card.className="coverItem";



card.dataset.index=index;



if(item.type==="image"){

const img=

document.createElement("img");



img.loading="lazy";

img.dataset.src=item.src;
lazyLoad();

card.appendChild(img);

}



else if(item.type==="video"){



const video=

document.createElement("video");



video.src=item.src;

video.loop=true;

video.muted=true;

video.playsInline=true;

video.preload="metadata";



card.appendChild(video);



const play=

document.createElement("div");

play.className="videoIcon";

play.innerHTML="▶";



card.appendChild(play);

}



else if(item.type==="gallery"){



const grid=

document.createElement("div");

grid.className="galleryGrid";



item.images.forEach(src=>{

const img=

document.createElement("img");



img.loading="lazy";

img.src=src;

grid.appendChild(img);

});



card.appendChild(grid);

}



const caption=

document.createElement("div");

caption.className="coverCaption";



caption.innerHTML=

"<h2>"+item.title+"</h2>"+

"<p>"+item.text+"</p>";



card.appendChild(caption);



const shadow=

document.createElement("div");

shadow.className="coverShadow";



card.appendChild(shadow);



Showcase.container.appendChild(card);



Showcase.slides.push(card);

}

);

}
function createButtons(){

const wrap=

document.createElement("div");

wrap.className="sliderButtons";



const prev=

document.createElement("button");

prev.innerHTML="❮";



const next=

document.createElement("button");

next.innerHTML="❯";



prev.onclick=()=>{

previousSlide();

};



next.onclick=()=>{

nextSlide();

};



wrap.appendChild(prev);

wrap.appendChild(next);



document

.querySelector(".heroSlider")

.appendChild(wrap);

}
function createDots(){

const dots=

document.createElement("div");

dots.className="sliderDots";



Showcase.items.forEach(

(item,index)=>{

const dot=

document.createElement("span");



dot.onclick=()=>{

goTo(index);

};



dots.appendChild(dot);

}

);



document

.querySelector(".heroSlider")

.appendChild(dots);

}
/*==================================================
    COVER FLOW ENGINE
==================================================*/

function updateFlow(){

const total=Showcase.slides.length;

if(total===0) return;



Showcase.slides.forEach(slide=>{

slide.className="coverItem";

});



for(let i=0;i<total;i++){

const slide=Showcase.slides[i];



let diff=i-Showcase.current;



if(diff<-total/2) diff+=total;

if(diff> total/2) diff-=total;



if(diff===0){

slide.classList.add("active");

}

else if(diff===-1){

slide.classList.add("left1");

}

else if(diff===1){

slide.classList.add("right1");

}

else if(diff===-2){

slide.classList.add("left2");

}

else if(diff===2){

slide.classList.add("right2");

}

else{

slide.classList.add("hidden");

}

}



updateDots();

playVisibleVideo();

}
function nextSlide(){

Showcase.current++;

if(Showcase.current>=Showcase.slides.length)

Showcase.current=0;



updateFlow();

}
function previousSlide(){

Showcase.current--;

if(Showcase.current<0)

Showcase.current=

Showcase.slides.length-1;



updateFlow();

}
function goTo(index){

Showcase.current=index;

updateFlow();

restartAutoPlay();

}
function updateDots(){

const dots=

document.querySelectorAll(

".sliderDots span"

);



dots.forEach(

(dot,index)=>{

dot.classList.toggle(

"active",

index===Showcase.current

);

}

);

}
function startAutoPlay(){

if(!Showcase.autoPlay)

return;



Showcase.timer=

setInterval(

nextSlide,

Showcase.interval

);

}



function stopAutoPlay(){

clearInterval(

Showcase.timer

);

}



function restartAutoPlay(){

stopAutoPlay();

startAutoPlay();

}
function playVisibleVideo(){

document

.querySelectorAll(

".coverItem video"

)

.forEach(

v=>{

v.pause();

}

);



const active=

document.querySelector(

".coverItem.active video"

);



if(active){

active.play().catch(()=>{});

}

}
function bindHover(){

const slider=

document.querySelector(

".heroSlider"

);



slider.addEventListener(

"mouseenter",

stopAutoPlay

);



slider.addEventListener(

"mouseleave",

startAutoPlay

);

}
function bindKeyboard(){

document.addEventListener(

"keydown",

e=>{

if(e.key==="ArrowRight")

nextSlide();



if(e.key==="ArrowLeft")

previousSlide();

}

);

}
function bindDrag(){

const slider=

document.querySelector(

".heroSlider"

);



slider.addEventListener(

"mousedown",

e=>{

Showcase.dragging=true;

Showcase.startX=e.clientX;

}

);



window.addEventListener(

"mouseup",

()=>{

if(!Showcase.dragging)

return;



Showcase.dragging=false;



if(Showcase.deltaX>80)

previousSlide();



if(Showcase.deltaX<-80)

nextSlide();



Showcase.deltaX=0;

}

);



window.addEventListener(

"mousemove",

e=>{

if(!Showcase.dragging)

return;



Showcase.deltaX=

e.clientX-

Showcase.startX;

}

);

}
/*==================================================
    EVENTS
==================================================*/

function bindEvents(){

bindHover();

bindKeyboard();

bindDrag();

bindTouch();

bindMouseParallax();

bindFullscreen();

}
/*==================================================
    TOUCH
==================================================*/

function bindTouch(){

const slider=document.querySelector(".heroSlider");

let startX=0;
let endX=0;

slider.addEventListener(

"touchstart",

e=>{

startX=e.touches[0].clientX;

},

{passive:true}

);


slider.addEventListener(

"touchmove",

e=>{

endX=e.touches[0].clientX;

},

{passive:true}

);


slider.addEventListener(

"touchend",

()=>{

const distance=endX-startX;

if(Math.abs(distance)<50) return;

if(distance>0){

previousSlide();

}
else{

nextSlide();

}

restartAutoPlay();

}

);

}
/*==================================================
    PARALLAX
==================================================*/

function bindMouseParallax(){

const slider=document.querySelector(".heroSlider");

slider.addEventListener(

"mousemove",

e=>{

const rect=slider.getBoundingClientRect();

const x=(e.clientX-rect.left)/rect.width-.5;

const y=(e.clientY-rect.top)/rect.height-.5;

const active=

document.querySelector(".coverItem.active");

if(!active) return;

active.style.transform=

`
translate3d(0,0,220px)
rotateY(${x*8}deg)
rotateX(${-y*6}deg)
`;

}

);


slider.addEventListener(

"mouseleave",

()=>{

updateFlow();

}

);

}
/*==================================================
    FULLSCREEN
==================================================*/

function bindFullscreen(){

Showcase.slides.forEach(

slide=>{

slide.addEventListener(

"dblclick",

()=>{

openFullscreen(slide);

}

);

}

);

}



function openFullscreen(slide){

if(!Showcase.fullscreen)

return;

Showcase.fullscreen.innerHTML="";



const media=

slide.querySelector("img,video");



if(!media)

return;



const clone=

media.cloneNode(true);



if(clone.tagName==="VIDEO"){

clone.controls=true;

clone.autoplay=true;

}



Showcase.fullscreen.appendChild(clone);

Showcase.fullscreen.classList.add("show");

}
window.addEventListener(

"click",

e=>{

if(

e.target.classList.contains(

"fullscreenViewer"

)

){

Showcase.fullscreen.classList.remove("show");

Showcase.fullscreen.innerHTML="";

}

}
);
/*==================================================
    LAZY LOAD
==================================================*/

function lazyLoad(){

const observer=

new IntersectionObserver(

entries=>{

entries.forEach(

entry=>{

if(!entry.isIntersecting)

return;

const img=entry.target;

if(img.dataset.src){

img.src=img.dataset.src;

img.removeAttribute("data-src");

}

}

);

}

);



document

.querySelectorAll("img[data-src]")

.forEach(

img=>observer.observe(img)

);

}
