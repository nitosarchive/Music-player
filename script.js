const play = document.getElementById("play");
const mySong = document.getElementById("mySong");
const fullTime = document.getElementById("fullTime");
const intervalTime = document.getElementById("intervalTime");
const artistName = document.getElementById("artistName");
const songName = document.getElementById("songName");
const albumCover = document.querySelector(".album-cover");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const queueWrapper = document.querySelector(".queue-wrapper");
const shuffle = document.querySelector("#shuffle");
const queueBtn = document.querySelector(".queue");
let songIndex = 0;
const repeat = document.getElementById("repeat");
let totalSeconds;
let totalMinutes;
let isTotalTime;
let interval;
let openClose = 0;
let chooseDirection;
let screenSize = window.matchMedia("(min-width: 850px)");
let concurrentIndex;
let shuffled = false;

function openCloseQueue(duration) {
  if (screenSize.matches) {
    const queueOpen = [
      { transform: "translate(0px)" },
      { transform: "translate(280px)" },
    ];

    if (openClose === 0) {
      openClose++;
      chooseDirection = "normal";
    } else {
      openClose--;
      chooseDirection = "reverse";
    }

    const queueTimimg = {
      duration: 400,
      fill: "forwards",

      direction: chooseDirection,
    };

    queueWrapper.animate(queueOpen, queueTimimg);
  } else {
    if (openClose === 0) {
      queueWrapper.classList.remove("close");
      openClose++;
    } else {
      queueWrapper.classList.add("close");
      openClose--;
    }
  }
}

screenSize.addEventListener("change", () => {
  if (screenSize.matches) {
    !queueWrapper.classList.contains("close")
      ? queueWrapper.classList.add("close")
      : null;
  } else {
    const queueOpen = [
      { transform: "translate(0px)" },
      { transform: "translate(280px)" },
    ];

    chooseDirection = "reverse";

    const queueTimimg = {
      duration: 0,
      fill: "forwards",

      direction: chooseDirection,
    };

    queueWrapper.animate(queueOpen, queueTimimg);
  }

  openClose = 0;
});

queueBtn.addEventListener("click", openCloseQueue);

function updateProgress() {
  const duration = mySong.duration;
  const currentTime = mySong.currentTime;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

mySong.addEventListener("timeupdate", updateProgress);

function getInterval() {
  interval = setInterval(() => {
    if (mySong.paused) return;
    minute = Math.floor(Math.floor(mySong.currentTime) / 60);
    seconds = Math.floor(mySong.currentTime) % 60;
    intervalTime.innerText = `${minute.toString().padStart("2", "0")}:${seconds.toString().padStart("2", "0")}`;
  }, 1000);
}

function pausePlay() {
  mySong.onload = mySong.addEventListener("pause", () => {
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  });

  mySong.addEventListener("play", () => {
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  });
}

pausePlay();

function playAudio() {
  if (!mySong.paused) {
    mySong.pause();
  } else {
    mySong.play();
    getInterval();
  }
}

play.addEventListener("click", playAudio);
window.addEventListener("keyup", (e) => {
  if (e.key != " ") return;
  playAudio();
});

function totalTime() {
  mySong.addEventListener("canplaythrough", () => {
    totalMinutes = Math.floor(mySong.duration / 60);
    totalSeconds = Math.floor(mySong.duration - totalMinutes * 60);
    fullTime.innerText = `${totalMinutes.toString().padStart("1", "0")}:${totalSeconds.toString().padStart("2", "0")}`;
  });
}

window.onload = totalTime;

let mySongInventory = [
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

const defaultPosition = [...mySongInventory];

function fetchShuffle() {
  if (shuffled === false) {
    mySongInventory.splice(songIndex, 1);
    let currentIndex = mySongInventory.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      console.log(randomIndex);
      currentIndex--;
      // And swap it with the current element.
      [mySongInventory[currentIndex], mySongInventory[randomIndex]] = [
        mySongInventory[randomIndex],
        mySongInventory[currentIndex],
      ];
    }
    shuffled = true;
    mySongInventory.unshift(concurrentIndex);
  } else {
    shuffled = false;
    mySongInventory = [...defaultPosition];
  }

  songIndex = 0;
  sliceFactor = 1;
  fetchQueue();
}

shuffle.addEventListener("click", fetchShuffle);

let sliceFactor = 1;
function fetchQueue() {
  const elements = mySongInventory.slice(sliceFactor).map((elem) => {
    return `<span>${elem.song}</span>`;
  });

  queueWrapper.innerHTML = elements.join("");
}

fetchQueue();

function fetchSong(event) {
  if (event) {
    if (event.target.id === "nextSong") {
      if (songIndex === mySongInventory.length - 1) {
        songIndex = 0;
        sliceFactor = 1;
      } else {
        songIndex++;
        sliceFactor++;
      }
    } else if (event.target.id === "lastSong") {
      if (songIndex === 0) {
        songIndex = mySongInventory.length;
        sliceFactor = 1;
      }
      songIndex--;
      sliceFactor--;
    }
    fetchQueue();
  }
  concurrentIndex = mySongInventory[songIndex];
  mySong.src = mySongInventory[songIndex].src;
  totalTime();
  songName.innerText = mySongInventory[songIndex].song;
  artistName.innerText = mySongInventory[songIndex].artist;
  albumCover.src = mySongInventory[songIndex].img;

  getInterval();
  mySong.play();
}

document.getElementById("nextSong").addEventListener("click", fetchSong);

repeat.addEventListener("click", fetchSong);

document.getElementById("lastSong").addEventListener("click", fetchSong);

mySong.addEventListener("ended", () => {
  if (songIndex != mySongInventory.length - 1) {
    songIndex++;
  } else songIndex = 0;
  fetchSong(undefined);
});

const progressContainer = document.querySelector(".progress-bar-container");

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = mySong.duration;
  mySong.currentTime = (clickX / width) * duration;
  minute = Math.floor(Math.floor(mySong.currentTime) / 60);
  seconds = Math.floor(mySong.currentTime) % 60;
  intervalTime.innerText = `${minute.toString().padStart("2", "0")}:${seconds.toString().padStart("2", "0")}`;
}

progressContainer.addEventListener("click", setProgress);

function getRand(max) {
  return Math.floor(Math.random() * max);
}

const audioString = document.querySelectorAll(".audio-string");

function getHeight(string) {
  setInterval(() => {
    if (!mySong.paused) {
      string.style.height = `${getRand(20)}px`;
    } else return (string.style.height = `1px`);
  }, 180);
}
audioString.forEach(getHeight);
