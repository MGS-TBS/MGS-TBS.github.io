"use strict";

const search=document.getElementById(

"softwareSearch"

);

if(search){

search.addEventListener(

"keyup",

()=>{

const value=

search.value.toLowerCase();

document

.querySelectorAll(".software")

.forEach(card=>{

const name=

card.dataset.name.toLowerCase();

if(name.includes(value))

card.style.display="block";

else

card.style.display="none";

});

});

}