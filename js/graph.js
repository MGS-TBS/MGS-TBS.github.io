"use strict";

class EvidenceGraph {

    constructor() {

        this.canvas = document.getElementById("graph");

        this.ctx = this.canvas.getContext("2d");

        this.nodes = [];

        this.edges = [];

        this.dragNode = null;

        this.offsetX = 0;

        this.offsetY = 0;

    }

    async init() {

        const response = await fetch("data/cases.json");

        const data = await response.json();

        this.createNodes(data);

        this.resize();

        this.events();

        this.animate();

    }

    createNodes(data) {

        data.forEach(item => {

            this.nodes.push({

                id:item.id,

                title:item.title,

                x:Math.random()*900+100,

                y:Math.random()*600+100,

                r:35,

                color:"#2D9CFF",

                parent:item.parent

            });

        });

        this.nodes.forEach(node=>{

            if(node.parent!=0){

                this.edges.push({

                    from:node.parent,

                    to:node.id

                });

            }

        });

    }

    resize(){

        this.canvas.width=window.innerWidth;

        this.canvas.height=700;

    }

    draw(){

        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

        this.edges.forEach(edge=>{

            const a=this.nodes.find(x=>x.id==edge.from);

            const b=this.nodes.find(x=>x.id==edge.to);

            this.ctx.beginPath();

            this.ctx.strokeStyle="#555";

            this.ctx.lineWidth=2;

            this.ctx.moveTo(a.x,a.y);

            this.ctx.lineTo(b.x,b.y);

            this.ctx.stroke();

        });

        this.nodes.forEach(node=>{

            this.ctx.beginPath();

            this.ctx.fillStyle=node.color;

            this.ctx.arc(

                node.x,

                node.y,

                node.r,

                0,

                Math.PI*2

            );

            this.ctx.fill();

            this.ctx.fillStyle="white";

            this.ctx.font="13px Poppins";

            this.ctx.textAlign="center";

            this.ctx.fillText(

                node.title,

                node.x,

                node.y+55

            );

        });

    }

    animate(){

        this.draw();

        requestAnimationFrame(

            ()=>this.animate()

        );

    }

    events(){

        this.canvas.addEventListener(

            "mousedown",

            e=>{

                const rect=

                this.canvas.getBoundingClientRect();

                const x=e.clientX-rect.left;

                const y=e.clientY-rect.top;

                this.nodes.forEach(node=>{

                    const d=Math.hypot(

                        x-node.x,

                        y-node.y

                    );

                    if(d<node.r){

                        this.dragNode=node;

                        this.offsetX=x-node.x;

                        this.offsetY=y-node.y;

                    }

                });

            }

        );

        window.addEventListener(

            "mousemove",

            e=>{

                if(!this.dragNode)return;

                const rect=

                this.canvas.getBoundingClientRect();

                this.dragNode.x=

                e.clientX-rect.left-this.offsetX;

                this.dragNode.y=

                e.clientY-rect.top-this.offsetY;

            }

        );

        window.addEventListener(

            "mouseup",

            ()=>{

                this.dragNode=null;

            }

        );

        window.addEventListener(

            "resize",

            ()=>this.resize()

        );

    }

}

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        const graph=document.getElementById("graph");

        if(graph){

            new EvidenceGraph().init();

        }

    }

);