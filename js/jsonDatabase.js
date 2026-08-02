"use strict";

class JsonDatabase{

constructor(name){

this.name=name;

}

async read(){

const r=await fetch(this.name);

return await r.json();

}

save(data){

localStorage.setItem(

this.name,

JSON.stringify(data)

);

}

load(){

const data=

localStorage.getItem(this.name);

if(!data)

return null;

return JSON.parse(data);

}

clear(){

localStorage.removeItem(this.name);

}

}