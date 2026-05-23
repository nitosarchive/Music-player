const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
const artistName = document.getElementById("artistName");
const songName = document.getElementById("songName");
const albumCover = document.querySelector(".album-cover");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn")
let songIndex = 0;
const repeat = document.getElementById("repeat");
let totalSeconds;
let totalMinutes;
let isTotalTime;
let interval;

function updateProgress(e){
  let currentTIme
  const {duration, currentTime} =e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`
}

mySong.addEventListener("timeupdate", updateProgress)


function getInterval() {
  intervalTime.innerText = "00:00"
  interval = setInterval(() => {
    if (mySong.paused) return;

    minute = Math.floor(Math.floor(mySong.currentTime) / 60);

    seconds = Math.floor(mySong.currentTime) % 60;

    intervalTime.innerText = `${minute.toString().padStart("2", "0")}:${seconds.toString().padStart("2", "0")}`;
  }, 1000);
}

function playAudio() {
  if (interval) clearInterval(interval);
  if (!mySong.paused) {
    mySong.pause();
    
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  } else {
    mySong.play();
    getInterval();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  }
 
}

play.addEventListener("click", playAudio);
window.addEventListener("keyup",(e)=>{
  if (e.key != " ") return;
  playAudio();
} )

function totalTime() {
  isTotalTime = false;
  
  setInterval(() => {
  if(isTotalTime === true ) return;
  if(mySong.duration){
  totalMinutes = Math.floor(mySong.duration / 60);
  totalSeconds = Math.floor(mySong.duration - totalMinutes * 60);
  
  fullTime.innerText = `${totalMinutes.toString().padStart("1", "0")}:${totalSeconds.toString().padStart("2", "0")}`;}
  if(mySong.duration) isTotalTime = true;
  }, 200);
  
}
window.onload = totalTime;

const mySongInventory = [
  {
    artist: "Don Toliver",
    song: "TMU",
    src: "./audio/Don Toliver - TMU.mp3",
    img: "./imgs/octane.webp",
  },
  {
    artist: "future ft. The Weeknd",
    song: "low life",
    src: "./audio/Future - Lowlife ft The Weeknd.mp3",
    img: "./imgs/low-life.png",
  },
  {
    artist: "goatye feat. kimbra",
    song: "Somebody That I Used To Know",
    src: "./audio/Gotye - Somebody That I Used To Know (feat. Kimbra) Official Music Video (1).mp3",
    img: "./imgs/stiutk.png",
  },
  {
    artist: "robert miles",
    song: "children",
    src: "./audio/Robert Miles - Children Dream Version.mp3",
    img: "./imgs/children.jpg",
  },
  {
    artist: "Kanye",
    song: "ALL THE LOVE",
    src: "./audio/YE - ALL THE LOVE (feat. ANDRÉ TROUTMAN).mp3",
    img: "./imgs/bully.jpg",
  },
];

function fetchSong(event) {
  if (event) {
    if (event.target.id === "nextSong") {
      if (songIndex === mySongInventory.length - 1) songIndex = 0;
      else {
        songIndex++;
      }
    } else if (event.target.id === "lastSong") {
      if (songIndex === 0) {
        songIndex = mySongInventory.length;
      }
      songIndex--;
    }
  }

  time = 0;

  clearInterval(interval);

  getInterval();
  
  totalTime();
  mySong.src = mySongInventory[songIndex].src;
  songName.innerText = mySongInventory[songIndex].song;
  artistName.innerText = mySongInventory[songIndex].artist;
  albumCover.src = mySongInventory[songIndex].img;
  if(mySong.paused){
    playBtn.classList.add("hidden")
    pauseBtn.classList.remove("hidden")
  }
  mySong.play();
}

document.getElementById("nextSong").addEventListener("click", fetchSong);

repeat.addEventListener("click", fetchSong);

document.getElementById("lastSong").addEventListener("click", fetchSong);

mySong.addEventListener("ended", () => {
  if (songIndex != mySongInventory.length - 1) {
    songIndex++;
  } else songIndex = 0;
  fetchSong(undefined);
});


const progressContainer = document.querySelector(".progress-bar-container");

function setProgress(e){
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = mySong.duration
  mySong.currentTime = (clickX/width) * duration
}

progressContainer.addEventListener("click", setProgress)

