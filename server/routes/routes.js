const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const index = require("./index");
const login = require("./login");
const songs = require("./songs");
const chat = require("./chat");

// callback
const callback = require("./callback");

app.get("/", index);
app.get("/login", login);
app.get("/songs", songs);
app.get("/chat", chat);

// callback route
app.get("/callback", callback);

module.exports = app;
