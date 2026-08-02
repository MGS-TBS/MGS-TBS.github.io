/*==========================================
MG Portfolio
Custom Cursor
==========================================*/

"use strict";

const cursor = document.getElementById("cursor");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

/*==========================
Mouse Position
==========================*/

window.addEventListener("mousemove", e => {

mouseX = e.clientX;
mouseY = e.clientY;

});

/*==========================
Smooth Cursor
==========================*/

function animateCursor(){

currentX += (mouseX-currentX)*0.18;
currentY += (mouseY-currentY)*0.18;

cursor.style.left=currentX+"px";
cursor.style.top=currentY+"px";

requestAnimationFrame(animateCursor);

}

animateCursor();

/*==========================
Hover Effect
==========================*/

const hoverElements=document.querySelectorAll(

"a,button,.card,.magnetic"

);

hoverElements.forEach(item=>{

item.addEventListener("mouseenter",()=>{

cursor.style.width="55px";
cursor.style.height="55px";

cursor.style.background="rgba(45,156,255,.15)";

cursor.style.borderColor="#F7B733";

cursor.style.boxShadow=
`
0 0 20px #2D9CFF,
0 0 60px #2D9CFF,
0 0 100px #2D9CFF
`;

});

item.addEventListener("mouseleave",()=>{

cursor.style.width="20px";
cursor.style.height="20px";

cursor.style.background="transparent";

cursor.style.borderColor="#2D9CFF";

cursor.style.boxShadow=
`
0 0 15px #2D9CFF,
0 0 40px #2D9CFF
`;

});

});

/*==========================
Click Explosion
==========================*/

window.addEventListener("click",e=>{

const ring=document.createElement("div");

ring.className="clickRing";

ring.style.left=e.clientX+"px";
ring.style.top=e.clientY+"px";

document.body.appendChild(ring);

setTimeout(()=>{

ring.remove();

},700);

});

/*==========================
Magnetic Buttons
==========================*/

document.querySelectorAll(".magnetic")

.forEach(button=>{

button.addEventListener("mousemove",e=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const moveX=(x-rect.width/2)/4;

const moveY=(y-rect.height/2)/4;

button.style.transform=

`translate(${moveX}px,${moveY}px)`;

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translate(0,0)";

});

});

/*==========================
Trail
==========================*/

const trail=[];

for(let i=0;i<18;i++){

const dot=document.createElement("div");

dot.className="trail";

document.body.appendChild(dot);

trail.push({

x:0,

y:0,

node:dot

});

}

function animateTrail(){

let x=mouseX;

let y=mouseY;

trail.forEach((item,index)=>{

item.x+=(x-item.x)*0.35;

item.y+=(y-item.y)*0.35;

item.node.style.left=item.x+"px";

item.node.style.top=item.y+"px";

item.node.style.opacity=(1-index/18);

item.node.style.transform=

`scale(${1-index/22})`;

x=item.x;

y=item.y;

});

requestAnimationFrame(animateTrail);

}

animateTrail();

/*==========================
Glow Follow
==========================*/

window.addEventListener("mousemove",()=>{

cursor.style.filter=

`drop-shadow(0 0 12px #2D9CFF)`;

});

/*==========================
Cursor Hide
==========================*/

document.addEventListener("mouseleave",()=>{

cursor.style.opacity="0";

});

document.addEventListener("mouseenter",()=>{

cursor.style.opacity="1";

});

/*==========================
Idle Animation
==========================*/

let idle;

window.addEventListener("mousemove",()=>{

clearTimeout(idle);

cursor.classList.remove("idle");

idle=setTimeout(()=>{

cursor.classList.add("idle");

},2500);

});