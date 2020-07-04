const socket = io();
socket.emit("connect", 1);

// Basic Chat
const usernameInput = document.getElementById("username");
const usernameForm = document.getElementById("usernameForm");
usernameForm.addEventListener("submit", setUsername);

// Set Username
function setUsername(event) {
  event.preventDefault();
  console.log(usernameInput.value);
  socket.emit("set user", usernameInput.value);
}

// Message input
const messageForm = document.getElementById("messageForm");
messageForm.addEventListener("submit", inputText);

function inputText(event) {
  event.preventDefault();
  console.log("inputText event");
  const messageInputField = document.getElementById("message").value;
  const actualSong = document.getElementById("currentSong").value;

  socket.emit("chat message", { messageInputField, actualSong });
  const chatForm = document.getElementById("messageForm");
  chatForm.reset();
}

// Server message
socket.on("server message", function (msg) {
  const messages = document.getElementById("messages");
  messages.insertAdjacentHTML(
    "beforeend",
    `<li class="server-message">${msg}</li>`
  );
});

// Chat Message
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
  console.log("hallo");
  const cleanInformation = document.getElementById("informationTextAboutRound");
  cleanInformation.innerHTML = "";

  event.preventDefault();
  const token = nextSong.dataset.token;

  socket.emit("next song", token);
});

// New Song
socket.on("newSong", function (data) {
  console.log("newSong");

  console.log(data);
  document.getElementById("currentSong").value = data.track.name;
  document.getElementById("trackName").innerHTML = data.track.name;
  document.getElementById("StartGame").dataset.id = data.track.id;
});

// Play Song
const btn = document.getElementById("StartGame");

btn.addEventListener("click", playSong);

function playSong(event) {
  const songId = event.target.dataset.id;
  console.log(songId);
  // const songTitle = event.target.dataset.name;
  console.log(songId);
  socket.emit("getSong", songId);
}

// Get Tokens
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

// Player guessed song
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
});

// Score board
socket.on("score board", function (gameResults) {
  const scoreBoard = document.getElementById("scoreBoard");
  while (scoreBoard.firstChild) scoreBoard.firstChild.remove();
  scoreBoard.insertAdjacentHTML("afterbegin", `<h1>Score Board</h1>`);
  const mapTest = new Map(
    Object.entries(gameResults).map(([key, value]) => [
      key["userName"],
      value["wins"],
      console.log("test", key, value),
      scoreBoard.insertAdjacentHTML(
        "beforeend",
        `<p>${key}: ${value.wins}</p>`
      ),
    ])
  );
});

// End game
socket.on("end game", function (userName, gameResults) {
  console.log("Hier kom ik nog");
  const scoreBoard = document.getElementById("informationTextAboutRound");
  while (scoreBoard.firstChild) scoreBoard.firstChild.remove();
  scoreBoard.insertAdjacentHTML("beforeend", `<h1>Game is over!</h1>`),
    scoreBoard.insertAdjacentHTML(
      "beforeend",
      `<h2>Check the scoreboard to see who win the game</h2>`
    );

  const removeNextButton = document.getElementById("nextSong");
  const removePlaySong = document.getElementById("StartGame");
  removeNextButton.remove();
  removePlaySong.remove();
});
