const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
let parseInterval = 0;
let interval;

play.addEventListener("click", () => {
  if (!mySong.paused) {
    clearInterval(interval);
    mySong.pause();
  } else {
    mySong.play();
    interval = setInterval(() => {
      parseInterval++;
      intervalTime.innerText = parseInterval;
    }, 1000);
  }
});

window.onload = () => {
  fullTime.innerText = Math.floor(mySong.duration / 60);
};
