const audio = document.querySelector("audio");
const songImage = document.querySelector("img.songThumbnail");
const songName = document.querySelector("p.songName");
const songArtist = document.querySelector("p.songArtist");
const volumeIcon = document.querySelector("i#volumeIcon");
const volumeSlider = document.querySelector("input#seekBarVolume");
const songSlider = document.querySelector("input#seekBarSong");
const timeStampDetails = document.querySelector("p.timeStamp");
const playPauseBtn = document.querySelector("i#playBtn");
const backwardBtn = document.querySelector("i#backwardBtn");
const forwardBtn = document.querySelector("i#forwardBtn");

const song = ["on-and-on", "tune"];
let songIndex = 0;

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === Infinity) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function loadSong(song) {
  audio.src = `audios/${song}.mp3`;
  songImage.src = `images/${song}.jpg`;
  if (song === "on-and-on") {
    songName.innerText = "On and On";
    songArtist.innerText = "Ft. Daniel Levi";
  } else {
    songName.innerText = "Instrumental";
    songArtist.innerText = "Ft. Matt Robbins";
  }
}

function prevSong() {
  console.log(songIndex);
  songIndex--;
  if (songIndex < 0) {
    songIndex = song.length - 1;
  }
  loadSong(song[songIndex]);
  audio.play();
}

function nextSong() {
  songIndex++;
  if (songIndex > song.length - 1) {
    songIndex = 0;
  }
  loadSong(song[songIndex]);
  audio.play();
}

function playOrPause(e) {
  if (playPauseBtn.classList.contains("fa-play")) {
    // Switch icon
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    // Play
    audio.play();
  } else {
    // Switch icon
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");
    // Pause
    audio.pause();
  }
}

function updateSlider() {
  songSlider.value = audio.currentTime;
}

function updateTimestamp() {
  timeStampDetails.innerText = `${formatTime(audio.currentTime)}/${formatTime(
    audio.duration
  )}`;
}

function updateUI(e) {
  updateSlider();
  updateTimestamp();
}

function updateSong(e) {
  audio.currentTime = songSlider.value;
}

function updateVolume() {
  if (volumeSlider.value == 0) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-mute");
    audio.volume = volumeSlider.value / 100;
  } else {
    if (volumeIcon.classList.contains("fa-volume-mute")) {
      volumeIcon.classList.remove("fa-volume-mute");
      volumeIcon.classList.add("fa-volume-high");
    }
    audio.volume = volumeSlider.value / 100;
  }
}

function sliderMaxValue(e) {
  songSlider.max = audio.duration;
}

function reset() {
  audio.volume = 1;
  volumeSlider.value = 100;
  songSlider.value = 0;
  audio.currentTime = 0;
}

function init() {
  document.addEventListener("DOMContentLoaded", reset);
  audio.addEventListener("loadedmetadata", sliderMaxValue);
  playPauseBtn.addEventListener("click", playOrPause);
  audio.addEventListener("timeupdate", updateUI);
  songSlider.addEventListener("input", updateSong);
  volumeSlider.addEventListener("input", updateVolume);
  forwardBtn.addEventListener("click", nextSong);
  backwardBtn.addEventListener("click", prevSong);
}

init();
