"use strict";

class EvidenceBoard{

constructor(){

this.items=[];

this.board=document.getElementById("evidenceBoard");

}

async init(){

const r=await fetch("data/cases.json");

this.items=await r.json();

this.render();

}

render(){

this.board.innerHTML="";

this.items.forEach(item=>{

const card=document.createElement("div");

card.className="card evidence";

card.innerHTML=`

<h3>

${item.title}

</h3>

<p>

${item.description}

</p>

<small>

${item.date}

</small>

<button

data-id="${item.id}"

class="openEvidence">

Open

</button>

`;

this.board.appendChild(card);

});

}

}

document.addEventListener(

"DOMContentLoaded",

()=>{

new EvidenceBoard().init();

});