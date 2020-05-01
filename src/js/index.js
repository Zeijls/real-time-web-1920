const socket = io();
socket.emit("connect", 1);

// Basic Chat
const usernameInput = document.getElementById("username");
const usernameForm = document.getElementById("usernameForm");
usernameForm.addEventListener("submit", setUsername);

// function setUsername(event) {
//   event.preventDefault();
//   // const userInputField = document.getElementById("usernameInput");
//   console.log(usernameInput.value);
//   socket.emit("set user", username.value());
//   // return false;
//   // e.preventDefault(); // prevents page reloading
//   // socket.emit("set user", usernameInput.value());
//   // return false;
// }

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
// const startGame = document.getElementById("Start Game");

// startGame.addEventListener("click", function () {
//   console.log("Game started!");
//   event.preventDefault();
//   const username = document.getElementById("username");
//   socket.emit("start game", username.value);
// });
