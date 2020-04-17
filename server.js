// BRON Voorbeeld Guido
const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const ioInstance = socketIO(server);

customMessages = {
  "--hhry": "Hey, how are you?",
  "--ghry": "Good, how are you?",
  "--hry": "How are you?",
  "--wryd": "What are you doing?",
  "--ny": "Nothing, you?",
  "--ly": "Love You",
  "--xo": "-xoxox-",
  "--hug": "(づ｡◕‿‿◕｡)づ",
  "--bird": "~( ‾▿‾)~",
  "--bear": "ʕ•ᴥ•ʔ",
  "--strong": "ᕙ(`▿´)ᕗ",
  "--cry": "(╥﹏╥)",
  "--love": "❤",
  "--dollar": "[̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]",
  "--smile": "ヅ",
};

// Routing

app
  .set("view engine", "ejs")
  .set("views", "views")
  .use(express.static("public"))

  .get("/", (req, res) => {
    res.render(res, "index", customMessages);
  });

// app.use(express.static(__dirname + "/public"));

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });

ioInstance.on("connection", function (socket) {
  console.log("socket created");

  // Username default
  let userName = "anonymous";
  socket.emit("server message", `SERVER: Welcome!`);
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
    // when the client emits 'new message', this listens and executes

    console.log("message: " + msg);
    ioInstance.emit("chat message", `${userName}: ${msg}`);
  });
  socket.on("chat message", function (msg) {
    // check if a custom messages is used
    for (let item in customMessages) {
      if (msg === item) {
        // set data to be the chosen custom message
        msg = customMessages[item];
        // we tell the client to execute 'new message'
        emitToUser(socket, data);
      }
    }

    // we tell the client to execute 'new message'
    console.log("message: " + msg);
    ioInstance.emit("chat message", `${userName}: ${msg}`);

    // socket.broadcast.emit("new message", {
    //   username: socket.username,
    //   message: data,
    // });
  });
});

// Port
server.listen(process.env.PORT || 5000, function () {
  console.log("listening on *:5000");
});

// const emitToUser = (socket, data) => {
//   socket.emit("new message", {
//     username: socket.username,
//     message: `Send message: ${data}`,
//   });
// };

const emitToUser = (ioInstance, msg) => {
  // socket.emit("new message", {
  //   username: socket.username,
  //   message: `Send message: ${data}`,

  console.log("message: " + msg);
  ioInstance.emit("chat message", `${userName}: ${msg}`);
};
