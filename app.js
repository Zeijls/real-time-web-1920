require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const socketIO = require("socket.io");

const mongoose = require("mongoose");
const User = require("./database/models/User");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection succesfull");
  })

  .catch((error) => {
    console.log(error);
  });

const newUser = new User({
  _id: new mongoose.Types.ObjectId(),
  username: "Hoi",
});

User.create(newUser);

User.find().then((users) => {
  const firstUser = users[0];

  console.log(firstUser);
});

const http = require("http");
const server = http.createServer(app);
const ioInstance = require("socket.io")(server);

const path = require("path");
const cookieParser = require("cookie-parser");

const routes = require("./server/routes/routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(__dirname + "/static"));

app.use(cookieParser());

app.use(routes);

// //user bijhouden
// //https://stackoverflow.com/questions/18335028/socket-io-how-to-prompt-for-username-and-save-the-username-in-an-array
// let connectedUsers = [];
// let apiResults = [];

ioInstance.on("connection", function (socket) {
  //https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  console.log("socket created");

  let userName = "anonymous";
  socket.emit("server message", `SERVER: Welcome to the void.`);
  socket.broadcast.emit(
    "server message",
    `SERVER: User ${userName} connected.`
  );

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

  socket.on("disconnect", function () {
    console.log(`user with id ${userName} disconnected`);
    ioInstance.emit(
      "server message",
      `SERVER: User with id ${userName} disconnected.`
    );
  });

  socket.on("chat message", function (msg) {
    console.log("message: " + msg);
    ioInstance.emit("chat message", `${userName}: ${msg}`);
  });

  socket.on("start game", async function (id) {
    if (connectedUsers.length === 1) {
      apiResults = await getData();
      console.log(apiResults.length);
      console.log("Game Started!!!");
      // playSong();
    } else {
      // socket
    }
  });

  // Data;
  async function getData(apiResults) {
    const accessToken = req.cookies.ACCESS_TOKEN;

    console.log("hoi");
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const spotifyResponse = await fetch(
        "https://api.spotify.com/v1/me/tracks",
        headers
      );
      let data = await spotifyResponse.json();
      data = data.items;
      const cleanedData = cleanItems(data);
      res.send(cleanedData);
      console.log(cleanedData);
    } catch (err) {
      console.log("error fetching songs of user: ", err);
    }
  }

  // function playSong() {
  //   // radom track gekozen
  //   // naar iedere speler gestuurd
  //   // random generator aangeroepen

  //   // socket broadcast emit random song
  // }

  //   function randomSongGenerator(gameResults) {
  //     //radom track
  //     const randomNumber = Math.floor(Math.random() * movieListLength);
  //   }
});

server.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});
