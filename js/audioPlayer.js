let playlist=[];

let currentSong=0;


const audio =
document.getElementById("audio");


const playBtn =
document.getElementById("audioPlay");


const player =
document.getElementById("audioPlayer");


const title =
document.getElementById("audioTitle");


const text =
document.getElementById("audioText");



const pulse =
document.querySelector(".pulseRing");

const wave =
document.getElementById("NameOwner");

const bg =
document.getElementById("bgCanvas");



let audioContext;

let analyser;

let source;

let dataArray;






fetch("data/playlist.json")

.then(r=>r.json())

.then(data=>{


playlist=data;


loadSong();


});








function loadSong(){


let song =
playlist[currentSong];


audio.src =
song.audio;


title.innerHTML =
song.title;


text.innerHTML =
"Press Play";


}









playBtn.onclick=()=>{


if(audio.paused){


audio.play();


playBtn.innerHTML="❚❚";


player.classList.add("playing");



startAnalyzer();


}

else{



audio.pause();



playBtn.innerHTML="▶";


player.classList.remove("playing");


}



};









audio.ontimeupdate=()=>{


let song =
playlist[currentSong];


let line =
song.text

.filter(
x=>x.time <= audio.currentTime
)

.pop();



if(line)

text.innerHTML =
line.value;


};







audio.onended=()=>{


currentSong++;


if(currentSong>=playlist.length)

currentSong=0;


loadSong();


audio.play();


};










function startAnalyzer(){


if(audioContext)

return;



audioContext =
new AudioContext();



analyser =
audioContext.createAnalyser();



source =
audioContext.createMediaElementSource(audio);



source.connect(analyser);


analyser.connect(
audioContext.destination
);



analyser.fftSize=256;



dataArray =
new Uint8Array(
analyser.frequencyBinCount
);



animateAudio();


}








function animateAudio(){


requestAnimationFrame(
animateAudio
);



if(!analyser)

return;



analyser.getByteFrequencyData(
dataArray
);



let sum=0;



for(let i=0;i<dataArray.length;i++)

sum+=dataArray[i];



let volume =
sum/dataArray.length;



let scale =
1+
volume/120;



pulse.style.transform =
`scale(${scale})`;





// تغییر رنگ بر اساس فرکانس


let r =
Math.min(
255,
volume*3
);


let g =
100+
volume;


let b =
255-volume;


wave.style.opacity=volume/100;
pulse.style.background =
`rgb(${r},${g},${b})`;
wave.style.color  =
`rgb(${r},${r},${b})`;
if(volume<1){
    wave.style.color  =
`rgb(255,255,255)`;
wave.style.opacity=1;

}


}