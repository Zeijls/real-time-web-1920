const socket = io();
socket.emit("connect", 1);

// Basic Chat
const usernameInput = document.getElementById("username");
const usernameForm = document.getElementById("usernameForm");
usernameForm.addEventListener("submit", setUsername);

function setUsername(event) {
  event.preventDefault();
  // const userInputField = document.getElementById("usernameInput");
  console.log(usernameInput.value);
  socket.emit("set user", usernameInput.value);
  // return false;
  // e.preventDefault(); // prevents page reloading
  // socket.emit("set user", usernameInput.value());
  // return false;
}

const messageForm = document.getElementById("messageForm");
messageForm.addEventListener("submit", inputText);

function inputText(event) {
  event.preventDefault();
  const messageInputField = document.getElementById("message");
  console.log(messageInputField.value);
  socket.emit("chat message", messageInputField.value);
}

socket.on("server message", function (msg) {
  const messages = document.getElementById("messages");
  messages.insertAdjacentHTML(
    "beforeend",
    `<li class="server-message">${msg}</li>`
  );
});

socket.on("chat message", function (msg, randomColor) {
  const messages = document.getElementById("messages");
  messages.insertAdjacentHTML(
    "beforeend",
    `<li class="chat-message" style="border: 2px solid ${randomColor};" >${msg}</li>`
  );
});

// Start game
const startGame = document.getElementById("StartGame");

startGame.addEventListener("click", function () {
  event.preventDefault();
  const username = document.getElementById("username");
  socket.emit("start game", username);
});

const btn = document.getElementById("StartGame");

btn.addEventListener("click", playSong);

function playSong(event) {
  const songId = event.target.dataset.id;
  const songTitle = event.target.dataset.name;
  // const randomSongId = songId(Math.random);
  console.log(songId);
  socket.emit("getSong", songId, songTitle);
}

socket.on("getTokens", function (id) {
  const accessToken = document.cookie
    .split(";")
    .find((item) => {
      return item.includes("accessToken");
    })
    .split("=")[1]
    .trim();
  socket.emit("playSong", {
    id,
    accessToken,
    name,
  });
});

// socket.on("player role", function (currantSongTitle) {
//   if (currantSongTitle === "player role guesser") {
//     const trackList = document.getElementById("trackList");
//     trackList.insertAdjacentHTML(
//       "beforeend",
//       `<h2>Guess the song in the chat</h2>`
//     );
//     trackList.insertAdjacentHTML(
//       "beforeend",
//       `<p>The first one who guess the song right wins this round! So be quick</p>`
//     );
//     trackList.insertAdjacentHTML(
//       "beforeend",
//       `<img src="https://lh3.googleusercontent.com/proxy/2holoyWbQotj033yGIjGiTE_uiEJ9w6geWd8Ksosm_lMtP3alNLxCidD3CAofyQucLAyQCyw89Dd91nuOgnYWEstnGB7aC_pVHoGBROdlA4d6Ljv58qVmX19v-ecp5Se" alt="Cover image of a questionmark" >`
//     );
//   } else {
//     const movieImages = document.getElementById("movielist");
//     movieImages.insertAdjacentHTML("beforeend", `<h1>Draw this movie:</h1>`);
//     movieImages.insertAdjacentHTML(
//       "beforeend",
//       `<h2>${currantMovieTitle}</h2>`
//     );
//     movieImages.insertAdjacentHTML(
//       "beforeend",
//       `<p>Tip: if you don't know the movie, draw the poster</p>`
//     );
//     movieImages.insertAdjacentHTML(
//       "beforeend",
//       `<img src="https://image.tmdb.org/t/p/w500${currantMovieCover}" alt="Cover image of the movie: ${currantMovieTitle}" >`
//     );
//   }
// });

// socket.on("player guessed movie", function (currantSongTitle, userName) {
//   const showMovie = document.getElementById("roundEnd");
//   const showWinner = document.getElementById("informationTextAboutRound");
//   showWinner.insertAdjacentHTML(
//     "beforeend",
//     `<h1>The movie was: ${currantMovieTitle}</h1>`
//   );
//   showWinner.insertAdjacentHTML(
//     "beforeend",
//     `<h2>${userName} is the winner of this round!</h2>`
//   );
//   showWinner.insertAdjacentHTML("beforeend", `<p>${userName} gets 1 point</p>`);
//   showMovie.insertAdjacentHTML(
//     "beforeend",
//     `<img src="https://image.tmdb.org/t/p/w500${currantMovieCover}" alt="Cover image of the movie: ${currantMovieTitle}" >`
//   );
//   // window.location = document.getElementById("canvas").toDataURL('image/png');
//   // socket.emit("save game data of round", window.location);
//   // alert("Hello! I am an alert box!!");
// });
