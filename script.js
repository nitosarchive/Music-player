const play = document.getElementById("play");
const mySong = document.getElementById("mySong");

play.addEventListener("click", () => {
  if (!mySong.paused) {
    mySong.pause();
  } else {
    mySong.play();
  }
});
