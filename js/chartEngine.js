"use strict";

class ChartEngine{

constructor(id){

this.canvas=document.getElementById(id);

}

bar(data){

new Chart(

this.canvas,

{

type:"bar",

data:data,

options:{

responsive:true,

plugins:{

legend:{

display:false

}

}

}

}

);

}

line(data){

new Chart(

this.canvas,

{

type:"line",

data:data

}

);

}

}