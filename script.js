const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
const artistName = document.getElementById("artistName");
const songName = document.getElementById("songName");
const albumCover = document.querySelector(".album-cover");
let time = 0;
let interval;
let minute;
let seconds;
let songIndex = 0;
const repeat = document.getElementById("repeat");
let totalSeconds;
let totalMinutes;

function getInterval() {
  interval = setInterval(() => {
    time++;

    minute = Math.floor(time / 60);

    seconds = time % 60;

    seconds.toString().padStart("2", "0");
    minute.toString().padStart("2", "0");
    intervalTime.innerText = `${minute}:${seconds}`;
  }, 1000);
}

play.addEventListener("click", () => {
  if (!mySong.paused) {
    clearInterval(interval);
    mySong.pause();
  } else {
    mySong.play();
    getInterval();
  }
});
function totalTime() {
  totalMinutes = Math.floor(mySong.duration / 60);
  totalSeconds = Math.floor(mySong.duration - totalMinutes * 60);
  fullTime.innerText = `${totalMinutes}:${totalSeconds}`;
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
      if (songIndex === mySongInventory.length) songIndex = 0;
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
  if (interval) {
    clearInterval(interval);
  }
  getInterval();
  setTimeout(() => {
    totalTime();
  }, 2000);
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
  songIndex++;
  fetchSong(undefined);
});
