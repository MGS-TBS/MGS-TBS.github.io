/*==========================================
 MG Portfolio
 Galaxy Background
==========================================*/


"use strict";


let scene;
let camera;
let renderer;
let stars;


let galaxyMouseX=0;
let galaxyMouseY=0;


const COUNT =
window.innerWidth < 700 ? 1500 : 3500;



initGalaxy();


function initGalaxy(){


const container =
document.getElementById("bgCanvas");


if(!container){

console.error(
"bgCanvas not found"
);

return;

}



scene =
new THREE.Scene();



scene.fog =
new THREE.FogExp2(
0x050816,
0.0008
);




camera =
new THREE.PerspectiveCamera(

60,

window.innerWidth /
window.innerHeight,

1,

10000

);


camera.position.z=900;





renderer =
new THREE.WebGLRenderer({

alpha:true,

antialias:true,

powerPreference:
"high-performance"

});



renderer.setPixelRatio(

Math.min(
window.devicePixelRatio,
2
)

);



renderer.setSize(

window.innerWidth,

window.innerHeight

);



container.appendChild(
renderer.domElement
);



createStars();



window.addEventListener(
"mousemove",
mouseMove
);



window.addEventListener(
"touchmove",
touchMove,
{
passive:true
}
);



window.addEventListener(
"resize",
resize
);



animate();



}







function createStars(){


let geometry =
new THREE.BufferGeometry();



let positions =
new Float32Array(
COUNT*3
);



let colors =
new Float32Array(
COUNT*3
);




for(
let i=0;
i<COUNT;
i++
){



let radius =
Math.random()*1800;



let angle =
Math.random()*Math.PI*2;



let spiral =
radius*0.002;



let x =
Math.cos(
angle+spiral
)
*
radius;



let z =
Math.sin(
angle+spiral
)
*
radius;



let y =
(
Math.random()-0.5
)
*
450;




positions[i*3]=x;

positions[i*3+1]=y;

positions[i*3+2]=z;




let blue =
Math.random();



colors[i*3]=
0.2+blue*0.6;


colors[i*3+1]=
0.4+blue*0.5;


colors[i*3+2]=
1;



}



geometry.setAttribute(

"position",

new THREE.BufferAttribute(
positions,
3
)

);



geometry.setAttribute(

"color",

new THREE.BufferAttribute(
colors,
3
)

);





let material =
new THREE.PointsMaterial({

size:
window.innerWidth<700?3:4,


vertexColors:true,


transparent:true,


opacity:.85,


depthWrite:false,


blending:
THREE.AdditiveBlending

});





stars =
new THREE.Points(

geometry,

material

);



scene.add(
stars
);



}








function animate(){


requestAnimationFrame(
animate
);



stars.rotation.y +=0.0008;


stars.rotation.x +=0.0002;




camera.position.x +=

(
galaxyMouseX*200 -
camera.position.x
)
*
0.03;



camera.position.y +=

(
galaxyMouseY*120 -
camera.position.y
)
*
0.03;



camera.lookAt(
scene.position
);



renderer.render(

scene,

camera

);



}







function mouseMove(e){



galaxyMouseX =
(
e.clientX /
window.innerWidth
-
0.5
)
*
2;



galaxyMouseY =
(
e.clientY /
window.innerHeight
-
0.5
)
*
2;


}






function touchMove(e){


let t =
e.touches[0];



galaxyMouseX =
(
t.clientX /
window.innerWidth
-
0.5
)
*
2;



galaxyMouseY =
(
t.clientY /
window.innerHeight
-
0.5
)
*
2;


}







function resize(){


camera.aspect =
window.innerWidth /
window.innerHeight;



camera.updateProjectionMatrix();



renderer.setSize(

window.innerWidth,

window.innerHeight

);


}