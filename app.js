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

const routes = require("./routes/routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// app.use(express.static(path.join(__dirname, "/static")));
app.use(express.static(__dirname + "/static"));

app.use(cookieParser());

app.use(routes);

ioInstance.on("connection", function (socket) {
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
});

server.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});
