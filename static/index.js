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
  console.log("inputText event");
  const messageInputField = document.getElementById("message").value;
  const actualSong = document.getElementById("currentSong").value;

  socket.emit("chat message", { messageInputField, actualSong });
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
  console.log(startGame);

  socket.emit("start game", username);
});

// Next song
const nextSong = document.getElementById("nextSong");

nextSong.addEventListener("click", function () {
  event.preventDefault();
  const token = nextSong.dataset.token;

  socket.emit("next song", token);
});

socket.on("newSong", function (data) {
  console.log("newSong");

  console.log(data);
  document.getElementById("currentSong").value = data.track.name;
  document.getElementById("trackName").innerHTML = data.track.name;
  document.getElementById("StartGame").dataset.id = data.track.id;
});

const btn = document.getElementById("StartGame");

btn.addEventListener("click", playSong);

function playSong(event) {
  const songId = event.target.dataset.id;
  console.log(songId);
  // const songTitle = event.target.dataset.name;
  console.log(songId);
  socket.emit("getSong", songId);
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

// socket.on("user won", function (id) {
//   console.log("user won test");

// });

socket.on("player guessed song", function (userName, actualSong) {
  const showSong = document.getElementById("roundEnd");
  const showWinner = document.getElementById("informationTextAboutRound");
  showWinner.insertAdjacentHTML(
    "beforeend",
    `<h1>The song was: ${actualSong} </h1>`
  );
  showWinner.insertAdjacentHTML(
    "beforeend",
    `<h2>${userName} is the winner of this round!</h2>`
  );
  showWinner.insertAdjacentHTML("beforeend", `<p>${userName} gets 1 point</p>`);
  // showSong.insertAdjacentHTML(
  //   "beforeend",
  //   // show image of cover song
  // );
});
