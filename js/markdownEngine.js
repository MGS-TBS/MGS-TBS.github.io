"use strict";

class MarkdownEngine{

constructor(){

this.container=document.getElementById("markdown");

}

async open(file){

const response=await fetch(file);

const text=await response.text();

this.container.innerHTML=this.parse(text);

Prism.highlightAll();

}

parse(md){

let html=md;

html=html.replace(/^### (.*$)/gim,"<h3>$1</h3>");

html=html.replace(/^## (.*$)/gim,"<h2>$1</h2>");

html=html.replace(/^# (.*$)/gim,"<h1>$1</h1>");

html=html.replace(/\*\*(.*?)\*\*/gim,"<strong>$1</strong>");

html=html.replace(/\*(.*?)\*/gim,"<em>$1</em>");

html=html.replace(/\`(.*?)\`/gim,"<code>$1</code>");

html=html.replace(/\n$/gim,"<br>");

return html;

}

}

const markdown=new MarkdownEngine();