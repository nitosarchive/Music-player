const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
let time = 0;
let interval;
let minute;
let seconds;
let songIndex = 0;

play.addEventListener("click", () => {
  if (!mySong.paused) {
    clearInterval(interval);
    mySong.pause();
  } else {
    mySong.play();
    mySong.mute;
    interval = setInterval(() => {
      time++;

      minute = Math.floor(time / 60);

      seconds = time % 60;

      seconds.toString().padStart("2", "0");
      minute.toString().padStart("1", "0");
      intervalTime.innerText = `${minute}:${seconds}`;
    }, 1000);
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
  },
  {
    artist: "future ft. The Weeknd",
    song: "low life",
    src: "./audio/Future - Lowlife ft The Weeknd.mp3",
  },
  {
    artist: "goatye feat. kimbra",
    song: "Somebody That I Used To Know",
    src: "./audio/Gotye - Somebody That I Used To Know (feat. Kimbra) Official Music Video (1).mp3",
  },
  {
    artist: "robert miles",
    song: "children",
    src: "./audio/Robert Miles - Children Dream Version.mp3",
  },
];

document.getElementById("nextSong").addEventListener("click", () => {
  if (songIndex === mySongInventory) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  console.log(songIndex);

  mySong.src = mySongInventory[songIndex].src;
  if (mySong.oncanplay) {
    fullTime.innerText = Math.floor(mySong.duration / 60);
  }
  mySong.play();
});
