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
const forwardBtn = document.querySelector("i#forwadBtn");

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

function updateSlider(e) {
  songSlider.value = audio.currentTime;
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

function syncWithSlider(e) {
  songSlider.max = audio.duration;
}

function reset() {
  audio.volume = 1;
  volumeSlider.value = 100;
  songSlider.value = 0;
  audio.currentTime = 0;
}

document.addEventListener("DOMContentLoaded", reset);
audio.addEventListener("loadedmetadata", syncWithSlider);
playPauseBtn.addEventListener("click", playOrPause);
audio.addEventListener("timeupdate", updateSlider);
songSlider.addEventListener("input", updateSong);
volumeSlider.addEventListener("input", updateVolume);
