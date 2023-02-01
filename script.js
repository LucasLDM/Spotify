const cover = document.getElementById("cover");
const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress"); /* Para manipular a linha de progresso */
const progressContainer = document.getElementById("progress-container");
const heartSong = document.getElementById("like");
let hearted = false;
const shuffle = document.getElementById("shuffle");
let isPlaying = false;

const theLordAndMe = {
  songName: "The Lord and Me",
  artist: "Yung Lixo",
  file: "the-lord-and-me",
};

const inThisShirt = {
  songName: "In This Shirt",
  artist: "The Irrepressibles",
  file: "in-this-shirt",
};

const ponPonPon = {
  songName: "Pon Pon Pon",
  artist: "Kyary Pamyu Pamyu",
  file: "pon-pon-pon",
};

const playlist = [theLordAndMe, inThisShirt, ponPonPon];
let index = 1;

/* Curtir música */
function likeSong() {
  if (hearted === false) {
    heartSong.querySelector(".bi").classList.remove("bi-heart");
    heartSong.querySelector(".bi").classList.add("bi-heart-fill");
    heartSong.style.color = "#ff3434";
    hearted = true;
  } 
  else {
    heartSong.querySelector(".bi").classList.remove("bi-heart-fill");
    heartSong.querySelector(".bi").classList.add("bi-heart");
    heartSong.style.color = "#8b999c";
    hearted = false;
  }
}

function initializeSong() {
  cover.src = `img/${playlist[index].file}.jpg`;
  song.src = `songs/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
}

function playSong() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong();
  } 
  else {
    playSong();
  }
}

function nextSong() {
  if (index === playlist.length - 1) {
    index = 0;
  } 
  else {
    index = index + 1;
  }
  initializeSong();
  playSong();
}

function previousSong() {
  if (index === 0) {
    index = playlist.length - 1;
  } 
  else {
    index = index - 1;
  }
  initializeSong();
  playSong();
}

function updateProgressBar() {
  /* Calculando a porcentagem da música que foi tocada (apenas o valor, sem o %)*/
  const barWidth = (song.currentTime / song.duration) * 100;
  /* Substituindo o valor da propriedade do progresso de 0% para o valor da barra atualmente */
  currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

function jumpTo(event) {
  /* Pega o width da barra de progresso */
  const width = progressContainer.clientWidth;
  /* Pegando a posição do clique na barra de progresso */
  const clickPosition = event.offsetX;
  /* Calculando o tempo da música que foi clicada */
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function shufflePlaylist() {
  
  index = Math.floor(Math.random() * playlist.length);
  
  initializeSong();
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();
}

initializeSong(); /* Necessário pra funcionar */

heartSong.addEventListener("click", likeSong);
shuffle.addEventListener("click", shufflePlaylist);
play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
