const cover = document.getElementById("cover");
const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress"); /* Para manipular a linha de progresso */
const progressContainer = document.getElementById("progress-container");
let isPlaying = false; /* Vai verificar se está tocando ou não */

/* Criando identidades para cada música */
/* 
Obs: note que em 'file' usei apenas 1 linha de código, já que
o nome da música e imagem são os mesmos. Se não fossem, eu criaria
mais uma linha pra especificar.
*/
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

/* Criando o array playlist com as músicas */
const playlist = Array(theLordAndMe, inThisShirt, ponPonPon);
let index = 0; /* Índice para selecionar cada música */

/*
A função inicializa a música configurando a capa, música, nome da música e a banda para o índice da playlist atual
*/
function initializeSong() {
  cover.src = `img/${playlist[index].file}.jpg`;
  song.src = `songs/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
}

function playSong() {
  /* Removendo a classe 'bi-play-circle-fill' do elemento com id 'play' contendo a classe 'bi' */
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  /* Selecionando o mesmo de antes, mas adicionando o botão de pause */
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

/* Se a música está tocando, pause. Caso contrário, toque. */
function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong();
  } else {
    playSong();
  }
}

function nextSong() {
  if (index === playlist.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  initializeSong();
  playSong();
}

function previousSong() {
  if (index === 0) {
    index = playlist.length - 1;
  } else {
    index = index - 1;
  }
  initializeSong();
  playSong();
}

function updateProgressBar() {
    /* Calculando a porcentagem da música que foi tocada (apenas o valor, sem o %)*/
    const barWidth = (song.currentTime/song.duration) * 100;
    /* Substituindo o valor da propriedade do progresso de 0% para o valor da barra atualmente */ 
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

function jumpTo(event){
    /* Pega o width da barra de progresso */
    const width = progressContainer.clientWidth;
    /* Pegando a posição do clique na barra de progresso */
    const clickPosition = event.offsetX;
    /* Calculando o tempo da música que foi clicada */ 
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}

initializeSong(); /* Necessário pra funcionar */

/* A função addEventListener é ativada quando ela ouvir um 'click' (quando você clicar no elemento, que no caso é o botão 'play').

    O primeiro argumento é o tipo de evento que deve escutar
    O segundo é a própria função que criei (use sem os parêntesis).

O javascript vai executar o evento assim que checar a função 'playPauseDecider()'.
*/
play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
