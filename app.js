require("dotenv").config();
const fetch = require("node-fetch");

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
let connectedUsers = [];
let gameResults = {};
let apiResults = [];
let movieLeftovers = [];
let randomMovie = [];
let tracksData = [];

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
    // console.log(msg);
    songTitleCheck(msg);
    // ioInstance.emit("chat message", `${userName}: ${msg}`);
  });

  // Start game
  socket.on("start game", async function (id) {
    gameResults[userName] = {
      userId: socket.id,
      wins: 0,
    };

    // socket.emit("player role", `player role guesser`);

    //   const currantSongTitle = tracksData.items[0].track.name;
    // io.emit("player guessed movie", currantSongTitle, userName);
  });

  socket.on("getSong", function (id) {
    socket.emit("getTokens", id);
    socket.broadcast.emit("getTokens", id);
  });

  socket.on("playSong", function (myObject) {
    console.log("my object is:", myObject);
    // const query = queryString.stringify({
    //   uris: ['spotify:track:${myObject.id}']
    // })
    fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myObject.accessToken}`,
      },
      body: JSON.stringify({
        uris: [`spotify:track:${myObject.id}`],
        title: [`spotify:track:${myObject.name}`],
      }),
    }).then(async (response) => {
      tracksData = await response.json();
      if (response.status == 403) {
        socket.emit(
          "server message",
          "Server: You don't have a spotify premium account. You can chat with people but you can't listen to the party music."
        );
      }
      if (response.status == 404) {
        socket.emit(
          "server message",
          "Server: We can't find an active device please open your spotify application on your own device and start a random track to active the session."
        );
      }
    });
  });

  //   function randomTrackGenerator(tracksData) {
  //     const tracksDataLength = tracksData.length;
  //     const randomNumber = Math.floor(Math.random() * tracksDataLength);
  //     console.log(randomNumber);
  //     const oneRandomTrack = tracksData[randomNumber];

  //     randomTrack.push(oneRandomTrack);
  //   }

  function songTitleCheck(msg) {
    // const currantSongTitle = tracksData.items;
    // console.log(currantSongTitle);
    // const currantSongSample = tracksData.items[9].track.id;
    // console.log(msg);

    if (msg.messageInputField === msg.actualSong) {
      ioInstance.emit(
        "chat message",
        `${userName}: ${msg.messageInputField}`,
        randomColor
      );
      ioInstance.emit(
        "SERVER MESSAGE",
        `${userName} guessed the song! It was: ${msg.actualSong}`
      );
      ioInstance.emit("player guessed song", `a player guessed it!`);
      console.log(gameResults);

      if (gameResults[userName].wins) {
        gameResults[userName].wins++;
      } else {
        gameResults[userName].wins = 1;
      }
      console.log(gameResults);
      // let setPoint = gameResults[userName].wins++;

      // drawPlayer = Object.keys(gameResults)[setDrawingRole];
      // console.log(gameResults);

      // randomMovieGenerator(gameResults);

      // randomSong.length = 0;
    } else {
      // io.emit("chat message", `${userName}: ${msg}`, randomColor);
      ioInstance.emit(
        "chat message",
        `${userName}: ${msg.messageInputField}`,
        randomColor
      );
    }
  }
});

server.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});
