require("dotenv").config();
const fetch = require("node-fetch");

const express = require("express");
const app = express();
const port = process.env.PORT;

const mongoose = require("mongoose");
const User = require("./database/models/User");

// Database mongoose
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
  const seccondUser = users[1];

  console.log(seccondUser);
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
let gameResults = {};
let tracksData = [];

ioInstance.on("connection", function (socket) {
  //https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  console.log("socket created");

  ioInstance.emit("score board", gameResults);

  // Username
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

    // Set gameresults
    gameResults[userName] = {
      userName: userName,
      wins: 0,
      nextRound: 1,
    };

    // Update Scoreboard
    ioInstance.emit("score board", gameResults);
  });

  // Disconnect
  socket.on("disconnect", function () {
    console.log(`user with id ${userName} disconnected`);
    ioInstance.emit(
      "server message",
      `SERVER: User with id ${userName} disconnected.`
    );
    ioInstance.emit("score board", gameResults);
  });

  // Chat Message
  socket.on("chat message", function (msg) {
    console.log("message: " + msg);
    songTitleCheck(msg);
  });

  // Next song
  socket.on("next song", async function (token, userName) {
    // Random song
    function randomNumberGenerator(tracksData) {
      return Math.floor(Math.random() * tracksData.length);
    }

    // Fetch liked songs user's spotify
    const data = await fetch("https://api.spotify.com/v1/me/tracks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const data = await response.json();
      const randomNumber = await randomNumberGenerator(data.items);

      updateRound(userName);

      return data.items[randomNumber];
    });

    socket.emit("newSong", data);
  });

  // Next round
  function updateRound() {
    if (gameResults[userName].nextRound) {
      gameResults[userName].nextRound++;
    } else {
      gameResults[userName].nextRound = 1;
    }
    console.log(gameResults[userName].nextRound);

    if (gameResults[userName].nextRound === 10) {
      console.log("PLayer reach question 10!");
      ioInstance.emit("end game", userName, gameResults);
      ioInstance.emit(
        "server message",
        `SERVER: ${userName} has guessed 10 songs and ended the game!`
      );
    }
  }

  // Get Song
  socket.on("getSong", function (id) {
    socket.emit("getTokens", id);
  });

  // Streamer spotify to play a track
  socket.on("playSong", function (myObject) {
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

  // Check answer
  function songTitleCheck(msg) {
    const messageInputField = msg.messageInputField;
    const actualSong = msg.actualSong;

    if (messageInputField === actualSong) {
      ioInstance.emit(
        "chat message",
        `${userName}: ${messageInputField}`,
        randomColor
      );
      ioInstance.emit(
        "server message",
        `SERVER: ${userName} guessed the song! It was: ${actualSong}.`
      );

      ioInstance.emit("player guessed song", userName, actualSong);

      // Score
      setAPoint(userName);

      // Scoreboard

      ioInstance.emit("score board", gameResults);
    } else {
      ioInstance.emit(
        "chat message",
        `${userName}: ${msg.messageInputField}`,
        randomColor
      );
    }
  }

  // Set a point to winner
  function setAPoint(userName) {
    if (gameResults[userName].wins) {
      gameResults[userName].wins++;
    } else {
      gameResults[userName].wins = 1;
    }
    console.log(gameResults[userName].wins);
  }
});

// Port
server.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});
