// require('module-alias/register');
require("dotenv-safe").config();

const express = require("express");
const cookieParser = require("cookie-parser");

// const homeRoute = require("@routes/home");
// const accountRoute = require("@routes/account");
const homeRoute = require("./server/routes/home");
const accountRoute = require("./server/routes/account");

// Spotify auth routes
// const loginRoute = require("@routes/login");
// const callbackRoute = require("@routes/callback");

const loginRoute = require("./server/routes/login");
const callbackRoute = require("./server/routes/callback");
const chatRoute = require("./server/routes/chat");
const songRoute = require("./server/routes/songs");

const app = express();
const PORT = process.env.PORT || DEFAULT_PORT;

// Socket chat
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const ioInstance = socketIO(server);

app.use(express.static("client/static"));
app.use(cookieParser());

app.get("/", homeRoute);
// app.get("/account", accountRoute);
app.get("/account", songRoute); // calback url

app.get("/login", loginRoute); // Gaan naar Spotify
app.get("/callback", callbackRoute); // Komen terug van ons feestje bij Spotify

app.get("/chat", chatRoute);

// Socket chat
// BRON Voorbeeld Guido

// // Routing
// app.set("view engine", "ejs").set("views", "views");

// ioInstance.on("connection", function (socket) {
//   console.log("socket created");

//   // Username default
//   let userName = "anonymous";
//   socket.emit("server message", `SERVER: Welcome!`);
//   socket.broadcast.emit(
//     "server message",
//     `SERVER: User ${userName} connected.`
//   );

//   // User aanmaken
//   socket.on("set user", function (id) {
//     const oldUsername = userName;
//     userName = id;
//     console.log(`user with id ${userName} connected`);
//     socket.emit(
//       "server message",
//       `SERVER: Your username was changed to ${userName}.`
//     );
//     socket.broadcast.emit(
//       "server message",
//       `SERVER: User ${oldUsername} changed their name to ${userName}.`
//     );
//   });

//   // When socket disconnect
//   socket.on("disconnect", function () {
//     console.log(`user with id ${userName} disconnected`);
//     ioInstance.emit("server message", `SERVER: User:${userName} disconnected.`);
//   });

//   // Message
//   socket.on("chat message", function (msg) {
//     // when the client emits 'new message', this listens and executes

//     console.log("message: " + msg);
//     ioInstance.emit("chat message", `${userName}: ${msg}`);
//   });
//   socket.on("chat message", function (msg) {
//     // check if a custom messages is used
//     for (let item in customMessages) {
//       if (msg === item) {
//         // set data to be the chosen custom message
//         msg = customMessages[item];
//         // we tell the client to execute 'new message'
//         emitToUser(socket, data);
//       }
//     }

//     // we tell the client to execute 'new message'
//     console.log("message: " + msg);
//     ioInstance.emit("chat message", `${userName}: ${msg}`);

//     // socket.broadcast.emit("new message", {
//     //   username: socket.username,
//     //   message: data,
//     // });
//   });
// });

// // Port
// // server.listen(process.env.PORT || 5000, function () {
// //   console.log("listening on *:5000");
// // });

// // server.listen(PORT, () => {
// //   console.log(`Listening on http://localhost:${PORT}`);
// // });

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// // const emitToUsc = (socket, data) => {
// //   socket.emit("new message", {
// //     username: socket.username,
// //     message: `Send message: ${data}`,
// //   });
// // };

// const emitToUser = (ioInstance, msg) => {
//   // socket.emit("new message", {
//   //   username: socket.username,
//   //   message: `Send message: ${data}`,

//   console.log("message: " + msg);
//   ioInstance.emit("chat message", `${userName}: ${msg}`);
// };
