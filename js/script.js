console.log("Welcome to Spotify");
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('../songs/Adore.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let playerGif = document.getElementById('playerGif');
let songBottom = document.getElementById('songBottom');

let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Adore",filePath:"../songs/Adore.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"All Ace",filePath:"../songs/All Ace.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"Black Effect",filePath:"../songs/Black Effect.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"Hul Chul",filePath:"../songs/Hul Chul.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"Jatt Flex",filePath:"../songs/jatt Flex.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"YKWIM",filePath:"../songs/YKWIM.mp3",coverPath:"../img/cover1.jpg"}
]
songItems.forEach((element,i)=>{
    
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

// audioElement.play();

//Listen to events
// handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playerGif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        playerGif.style.opacity = 0; 
    }
})

audioElement.addEventListener('timeupdate',()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        audioElement.src = `${songs[songIndex].filePath}`;
        audioElement.currentTime = 0;
        e.target.classList.toggle('fa-circle-play')
        e.target.classList.toggle('fa-circle-pause')
        songIndex = i;
        audioElement.play();
        masterPlay.classList.toggle('fa-circle-play');
        masterPlay.classList.toggle('fa-circle-pause');
        playerGif.style.opacity = 1;
        songBottom.innerText = songs[songIndex].songName;
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if (songIndex >= 5 ){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songs[songIndex].filePath}`;
    songBottom.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex <= 0 ){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songs[songIndex].filePath}`;
    songBottom.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})