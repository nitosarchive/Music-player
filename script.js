document.getElementById("play").addEventListener("click", () => {
  if (!document.getElementById("mySong").paused) {
    document.getElementById("mySong").pause();
  } else {
    document.getElementById("mySong").play();
  }
});
