const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
let time = 0;
let interval;
let minute;
let seconds;
let songIndex = 0;
const repeat = document.getElementById("repeat");

function getInterval() {
  interval = setInterval(() => {
    time++;

    minute = Math.floor(time / 60);

    seconds = time % 60;

    seconds.toString().padStart("2", "0");
    minute.toString().padStart("1", "0");
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

window.onload = () => {
  fullTime.innerText = Math.floor(mySong.duration / 60);
};

const mySongInventory = [
  {
    artist: "Don Toliver",
    song: "TMU",
    src: "./audio/Don Toliver - TMU.mp3",
    img: "./imgs/octane.webp"
  },
  {
    artist: "future ft. The Weeknd",
    song: "low life",
    src: "./audio/Future - Lowlife ft The Weeknd.mp3",
    img: "./imgs/low-life.png"
  },
  {
    artist: "goatye feat. kimbra",
    song: "Somebody That I Used To Know",
    src: "./audio/Gotye - Somebody That I Used To Know (feat. Kimbra) Official Music Video (1).mp3",
    img:"./imgs/stiutk.png"
  },
  {
    artist: "robert miles",
    song: "children",
    src: "./audio/Robert Miles - Children Dream Version.mp3",
    img: "./imgs/children.jpg"
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
  clearInterval(interval);
  getInterval();
  setTimeout(() => {
    fullTime.innerText = Math.floor(mySong.duration / 60);
  }, 2000);
  mySong.src = mySongInventory[songIndex].src;

  mySong.play();
}

document.getElementById("nextSong").addEventListener("click", fetchSong);

repeat.addEventListener("click", fetchSong);

document.getElementById("lastSong").addEventListener("click", fetchSong);

mySong.addEventListener("ended", () => {
  songIndex++;
  fetchSong(undefined);
});
