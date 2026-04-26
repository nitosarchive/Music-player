const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
let parseInterval = 0;
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
      parseInterval++;

      minute = Math.floor(parseInterval / 60);

      seconds = parseInterval % 60;

      seconds.toString().padStart("2", "0");
      minute.toString().padStart("1", "0");
      intervalTime.innerText = `${minute}:${seconds}`;
    }, 1000);
  }
});

window.onload = () => {
  fullTime.innerText = Math.floor(mySong.duration / 60);
};
