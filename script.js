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

mySongList = [];

const mySongInventory = [
  {
    Artist: "future",
    Song: "low life",
    src: "./audio/Future - Lowlife ft The Weeknd.mp3",
  },
];

document.getElementById("nextSong").addEventListener("click", () => {
  mySong.src = mySongInventory[0].src;

  mySong.play();
});

const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

const restock = { restock: true };
const sufficient = { restock: false };
const result = Map.groupBy(inventory, ({ quantity }) =>
  quantity > 6 ? restock : sufficient,
);
console.log(result.get(restock));
// [{ name: "bananas", type: "fruit", quantity: 5 }]
