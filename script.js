const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
let time = 0;
let interval;
let minute;
let seconds;

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

mySong.src = "./audio/Future - Lowlife ft The Weeknd.mp3";

mySongList = [];
