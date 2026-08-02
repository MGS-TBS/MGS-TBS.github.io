"use strict";

class FileViewer{

constructor(){

this.viewer=document.getElementById("viewer");

}

async open(file){

const ext=file.split(".").pop().toLowerCase();

switch(ext){

case "pdf":

this.pdf(file);

break;

case "jpg":

case "jpeg":

case "png":

case "webp":

this.image(file);

break;

case "mp4":

this.video(file);

break;

case "txt":

case "json":

case "md":

case "xml":

case "html":

case "css":

case "js":

this.text(file);

break;

default:

this.download(file);

}

}

pdf(file){

this.viewer.innerHTML=

`

<iframe

src="${file}"

style="

width:100%;

height:900px;

border:none;

">

</iframe>

`;

}

image(file){

this.viewer.innerHTML=

`

<img

src="${file}"

class="viewerImage"

>

`;

}

video(file){

this.viewer.innerHTML=

`

<video

controls

autoplay

style="width:100%"

>

<source src="${file}">

</video>

`;

}

async text(file){

const r=await fetch(file);

const t=await r.text();

this.viewer.innerHTML=

`

<pre>

${this.escape(t)}

</pre>

`;

}

download(file){

window.open(file);

}

escape(text){

return text

.replace(/</g,"&lt;")

.replace(/>/g,"&gt;");

}

}

const fileViewer=new FileViewer();