/*==========================================
 MG Portfolio
 Scroll Engine
 Lenis + Reveal + Navbar
==========================================*/

"use strict";

/*==========================================
 Lenis Smooth Scroll
==========================================*/

const lenis = new Lenis({

duration:1.2,

smoothWheel:true,

smoothTouch:false,

wheelMultiplier:1,

touchMultiplier:1.2,

infinite:false

});

function raf(time){

lenis.raf(time);

requestAnimationFrame(raf);

}

requestAnimationFrame(raf);


/*==========================================
 Navbar Hide On Scroll
==========================================*/

const navbar=document.querySelector("nav");

let lastScroll=0;

window.addEventListener("scroll",()=>{

const current=window.pageYOffset;

if(current>lastScroll && current>150){

navbar.style.transform="translateY(-100%)";

}
else{

navbar.style.transform="translateY(0)";

}

lastScroll=current;

});


/*==========================================
 Scroll Progress Shadow
==========================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>20){

navbar.style.boxShadow=
"0 15px 40px rgba(0,0,0,.35)";

}
else{

navbar.style.boxShadow="none";

}

});


/*==========================================
 Scroll To Top Button
==========================================*/

const topButton=document.createElement("button");

topButton.id="topButton";

topButton.innerHTML="↑";

document.body.appendChild(topButton);

Object.assign(topButton.style,{

position:"fixed",

right:"30px",

bottom:"30px",

width:"55px",

height:"55px",

borderRadius:"50%",

border:"none",

background:"#2D9CFF",

color:"#fff",

fontSize:"22px",

cursor:"pointer",

opacity:"0",

pointerEvents:"none",

transition:".35s",

zIndex:"9999",

boxShadow:"0 0 25px rgba(45,156,255,.4)"

});

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topButton.style.opacity="1";

topButton.style.pointerEvents="auto";

}
else{

topButton.style.opacity="0";

topButton.style.pointerEvents="none";

}

});

topButton.onclick=()=>{

lenis.scrollTo(0);

};


/*==========================================
 Reveal Elements
==========================================*/

const revealObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

document.querySelectorAll(

".fade-in,.zoom,.left,.right,.blur,.rotate"

)

.forEach(el=>{

revealObserver.observe(el);

});


/*==========================================
 Section Fade
==========================================*/

const sections=document.querySelectorAll("section");

const sectionObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

gsap.to(entry.target,{

opacity:1,

duration:1,

y:0

});

}

});

},

{

threshold:.2

}

);

sections.forEach(sec=>{

gsap.set(sec,{

opacity:.15,

y:70

});

sectionObserver.observe(sec);

});


/*==========================================
 Parallax Background
==========================================*/

window.addEventListener("mousemove",e=>{

const x=(e.clientX/window.innerWidth-.5)*40;

const y=(e.clientY/window.innerHeight-.5)*40;

gsap.to("#bgCanvas",{

x:x,

y:y,

duration:1.5,

ease:"power2.out"

});

});


/*==========================================
 Hero Parallax
==========================================*/

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero");

if(!hero) return;

const offset=window.scrollY*.35;

hero.style.transform=
`translateY(${offset}px)`;

});


/*==========================================
 Cards Animation
==========================================*/

document.querySelectorAll(".card")

.forEach((card,index)=>{

gsap.from(card,{

scrollTrigger:{

trigger:card,

start:"top 90%"

},

opacity:0,

y:80,

duration:1,

delay:index*.08,

ease:"power3.out"

});

});


/*==========================================
 Timeline Animation
==========================================*/

const timelineItems=document.querySelectorAll(".timelineItem");

timelineItems.forEach(item=>{

gsap.from(item,{

scrollTrigger:{

trigger:item,

start:"top 80%"

},

opacity:0,

x:-120,

duration:1

});

});


/*==========================================
 Floating Background
==========================================*/

setInterval(()=>{

gsap.to("#bgCanvas",{

rotation:Math.random()*3-1.5,

duration:10,

ease:"none"

});

},10000);


/*==========================================
 Active Navigation
==========================================*/

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-200;

if(window.scrollY>=top){

current=section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/*==========================================
 Mouse Glow
==========================================*/

window.addEventListener("mousemove",e=>{

document.documentElement.style.setProperty(

"--mouseX",

e.clientX+"px"

);

document.documentElement.style.setProperty(

"--mouseY",

e.clientY+"px"

);

});


/*==========================================
 Auto Animate Numbers
==========================================*/

const counters=document.querySelectorAll("[data-count]");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const el=entry.target;

const max=parseInt(el.dataset.count);

let value=0;

const timer=setInterval(()=>{

value+=Math.ceil(max/100);

if(value>=max){

value=max;

clearInterval(timer);

}

el.innerHTML=value;

},20);

counterObserver.unobserve(el);

});

});

counters.forEach(c=>counterObserver.observe(c));


/*==========================================
 End
==========================================*/