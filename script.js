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
const shuffleButton = document.getElementById("shuffle");

let hearted = false;
let isShuffled = false;
let isPlaying = false;

/* Identidade de cada música */ 

const inThisShirt = {
  songName: "In This Shirt",
  artist: "The Irrepressibles",
  file: "in-this-shirt",
};

const theLordAndMe = {
  songName: "The Lord and Me",
  artist: "Yung Lixo",
  file: "the-lord-and-me",
};

const ponPonPon = {
  songName: "Pon Pon Pon",
  artist: "Kyary Pamyu Pamyu",
  file: "pon-pon-pon",
};

const originalPlaylist = [inThisShirt, theLordAndMe, ponPonPon];
let sortedPlaylist = [...originalPlaylist]; /* Cópia da originalPlaylist */
let index = 0;

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
  cover.src = `img/${sortedPlaylist[index].file}.jpg`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
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
  if (index === sortedPlaylist.length - 1) {
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
    index = sortedPlaylist.length - 1;
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

/* A função pega um array como argumento e returna uma versão embaralhada */
function shuffleArray(preShuffleArray){

  let size = preShuffleArray.length;
  let currentIndex = size - 1;

  /* Repete enquanto não for o primeiro elemento */
  while(currentIndex > 0){
    /* Gerando um número aleatório entre 0 e o tamanho do array */
    let randomIndex = Math.floor(Math.random() * size);
    /* Salvando o valor do index atual na variável auxiliar */
    let aux = preShuffleArray[currentIndex];
    /* Trocando os valores do array */
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked(){

  if(isShuffled == false){
    isShuffled = true;
    /* Embaralhando a cópia do array */
    shuffleArray(sortedPlaylist);
    /* O botão fica verde ao clicar */ 
    shuffleButton.classList.add("button-active");
  }
  else{
    /* Resetando a playlist para a ordem original */
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.remove("button-active");
  }
  
}

initializeSong(); /* Necessário pra funcionar */

heartSong.addEventListener("click", likeSong);
shuffleButton.addEventListener("click", shuffleButtonClicked);
play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);