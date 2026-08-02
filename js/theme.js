"use strict";

const button=document.createElement("button");

button.innerHTML="🌙";

button.id="themeButton";

document.body.appendChild(button);

button.onclick=()=>{

document.body.classList.toggle("light");

localStorage.setItem(

"theme",

document.body.classList.contains("light")

);

};

if(localStorage.getItem("theme")=="true")

document.body.classList.add("light");