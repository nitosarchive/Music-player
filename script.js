const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
const artistName = document.getElementById("artistName");
const songName = document.getElementById("songName");
const albumCover = document.querySelector(".album-cover");
const progressBar = document.querySelector(".progress-bar");
let time = 0;
let interval;
let minute;
let seconds;
let songIndex = 0;
const repeat = document.getElementById("repeat");
let totalSeconds;
let totalMinutes;
let animation;
let animationProgress = 0;

function fetchProgress(event) {
  if (event) {
    if (event.target.id === "nextSong" || event.target.id === "lastSong" || event.target.id === "mySong" || event.target.id === "repeat") {
      progressBar.style.width = "0%";
      animationProgress = 0;
    }
  }
  if (animation) clearInterval(animation);
  animation = setInterval(() => {
    let duration = 100 / mySong.duration;
    if (animationProgress === 100) return;
    if (mySong.paused) return;
    animationProgress = animationProgress + duration;
    progressBar.style.width = `${animationProgress}%`;
  }, 1000);
}
function getInterval() {
  interval = setInterval(() => {
    if (mySong.paused) return;
    time++;

    minute = Math.floor(time / 60);

    seconds = time % 60;

    intervalTime.innerText = `${minute.toString().padStart("2", "0")}:${seconds}`;
  }, 1000);
}

function playAudio() {
  if (interval) clearInterval(interval);
  if (!mySong.paused) {
    mySong.pause();
  } else {
    mySong.play();
    getInterval();
  }
  fetchProgress();
}

play.addEventListener("click", playAudio);

function totalTime() {
  totalMinutes = Math.floor(mySong.duration / 60);
  totalSeconds = Math.floor(mySong.duration - totalMinutes * 60);
  fullTime.innerText = `${totalMinutes.toString().padStart("1", "0")}:${totalSeconds.toString().padStart("2", "0")}`;
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
  fetchProgress(event);
  time = 0;

  clearInterval(interval);

  getInterval();
  setInterval(() => {
    totalTime();
  }, 500);
  mySong.src = mySongInventory[songIndex].src;
  songName.innerText = mySongInventory[songIndex].song;
  artistName.innerText = mySongInventory[songIndex].artist;
  albumCover.src = mySongInventory[songIndex].img;

  mySong.play();
}

document.getElementById("nextSong").addEventListener("click", fetchSong);

repeat.addEventListener("click", fetchSong);

document.getElementById("lastSong").addEventListener("click", fetchSong);

mySong.addEventListener("ended", () => {
  if (songIndex != mySongInventory.length - 1) {
    songIndex++;
  } else songIndex = 0;
  fetchProgress(event);
  fetchSong(undefined);
});
