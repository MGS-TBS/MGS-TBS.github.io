class NeuralNetwork {


constructor(scene,particles){

this.scene=scene;
this.particles=particles;

this.lines=[];

this.geometry =
new THREE.BufferGeometry();


this.material =
new THREE.LineBasicMaterial({

color:0x2d9cff,

transparent:true,

opacity:0.15

});


this.create();

}




create(){


const positions =
this.particles.geometry
.attributes.position.array;



let points=[];


for(let i=0;i<positions.length;i+=3){


for(let j=i+3;j<positions.length;j+=3){


let dx=
positions[i]-positions[j];


let dy=
positions[i+1]-positions[j+1];


let dz=
positions[i+2]-positions[j+2];


let dist =
Math.sqrt(
dx*dx+
dy*dy+
dz*dz
);



if(dist<180){


points.push(

positions[i],
positions[i+1],
positions[i+2],


positions[j],
positions[j+1],
positions[j+2]

);


}


}


}



this.geometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(
points,
3
)

);



this.lines =
new THREE.LineSegments(

this.geometry,

this.material

);


this.scene.add(this.lines);


}





update(){


this.lines.rotation.y+=0.0008;


}



}