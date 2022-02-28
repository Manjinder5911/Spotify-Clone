console.log("Welcome to Spotify");
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('../songs/Adore.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let playerGif = document.getElementById('playerGif');
let songBottom = document.getElementById('songBottom');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volume = document.getElementById('volume');

// ARRRAY OF SONGS INFO
let songs = [
    {songName:"Adore",filePath:"../songs/Adore.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"All Ace",filePath:"../songs/All Ace.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"Black Effect",filePath:"../songs/Black Effect.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"Hul Chul",filePath:"../songs/Hul Chul.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"Jatt Flex",filePath:"../songs/jatt Flex.mp3",coverPath:"../img/cover1.jpg"},
    {songName:"YKWIM",filePath:"../songs/YKWIM.mp3",coverPath:"../img/cover1.jpg"}
]

// NAMING SONGS AND COVER IMAGES AUTOMATICALLY FROM SONGS ARRAY
songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//Listen to events

// handle play/pause click ON MAIN ICON
// masterplay function
let mPlayfunc = ()=>{
    if(audioElement.paused || audioElement.currentTime<= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playerGif.style.opacity = 1;
        Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.remove('fa-circle-play');
        Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        playerGif.style.opacity = 0;
        makeAllPlays();
    }
}
masterPlay.addEventListener('click',mPlayfunc)

// UPDATING THE SONG DURATION CHANGE
audioElement.addEventListener('timeupdate',()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;  
    // AUTOMATICALLY CHANGING SONGS AFTER END
    if(myProgressBar.value == 100){
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
        makeAllPlays();
        Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.remove('fa-circle-play');
        Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.add('fa-circle-pause');
    }
})
// CHANGING SONG DURATION USING RANGE
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})
// HANDLING VOLUME OF SONGS
audioElement.volume = 0.1;
volume.addEventListener('change',()=>{
    audioElement.volume = volume.value/100;
})

// CONVERTING ALL ICONS INTO PLAY IN SONGLIST
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

// CLICKING ON PLAY/PAUSE ICONS ON SONGSLIST
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = i;
        audioElement.currentTime = 0;
        if (audioElement.paused){
            audioElement.src = `${songs[songIndex].filePath}`;
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            playerGif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            makeAllPlays();
            playerGif.style.opacity = 0;
        } 
        
        masterPlay.classList.toggle('fa-circle-play');
        masterPlay.classList.toggle('fa-circle-pause'); 
        songBottom.innerText = songs[songIndex].songName; 
        
    })
})

// CLICKING NEXT ICON
let nextFunc = ()=>{
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
    makeAllPlays();
    Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.remove('fa-circle-play');
    Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.add('fa-circle-pause');
}
document.getElementById('next').addEventListener('click',nextFunc)

// CLICKING PREVIOUS ICON
let prevFunc = ()=>{
    if (songIndex <= 0 ){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    makeAllPlays();
    Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.remove('fa-circle-play');
    Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.add('fa-circle-pause');
    audioElement.src = `${songs[songIndex].filePath}`;
    songBottom.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();  
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
};

document.getElementById('previous').addEventListener('click',prevFunc)


//  LISTENING KEYBOARD INPUTS 
window.addEventListener('keydown',event=>{
    if (event.code == 'Space'){
        mPlayfunc() ; 
    }  
    // left arrow key
    if (event.keyCode == 37){
        prevFunc();
    }
    // right arrow key
    if (event.keyCode == 39){
        nextFunc();
    }
})