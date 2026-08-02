"use strict";

class Notify{

static show(message,type="success"){

const box=document.createElement("div");

box.className="notify";

box.innerHTML=message;

if(type=="error")

box.classList.add("error");

document.body.appendChild(box);

setTimeout(()=>{

box.classList.add("show");

},50);

setTimeout(()=>{

box.classList.remove("show");

setTimeout(()=>{

box.remove();

},400);

},3500);

}

}