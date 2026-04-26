const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
const parseInterval = 0;

play.addEventListener("click", () => {
  if (!mySong.paused) {
    mySong.pause();
  } else {
    mySong.play();
    setInterval(() => {
      parseInterval++;
      intervalTime.innerText = parseInterval;
    }, 1000);
  }
});

window.onload = () => {
  fullTime.innerText = Math.floor(mySong.duration / 60);
};
