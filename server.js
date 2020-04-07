// BRON Voorbeeld Guido
const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const ioInstance = socketIO(server);

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

ioInstance.on("connection", function (socket) {
  console.log("socket created");

  // Username default
  let userName = "anonymous";
  socket.emit("server message", `SERVER: Welcome to the void.`);
  socket.broadcast.emit(
    "server message",
    `SERVER: User ${userName} connected.`
  );

  // User aanmaken
  socket.on("set user", function (id) {
    const oldUsername = userName;
    userName = id;
    console.log(`user with id ${userName} connected`);
    socket.emit(
      "server message",
      `SERVER: Your username was changed to ${userName}.`
    );
    socket.broadcast.emit(
      "server message",
      `SERVER: User ${oldUsername} changed their name to ${userName}.`
    );
  });

  // When socket disconnect
  socket.on("disconnect", function () {
    console.log(`user with id ${userName} disconnected`);
    ioInstance.emit("server message", `SERVER: User:${userName} disconnected.`);
  });

  // Message
  socket.on("chat message", function (msg) {
    console.log("message: " + msg);
    ioInstance.emit("chat message", `${userName}: ${msg}`);
  });
});

// Port
server.listen(4000, function () {
  console.log("listening on *:4000");
});
