var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

// Homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// User connected
io.on("connection", function (socket) {
  console.log("a user connected");
});

// User disconnected
io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

// Message
io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    console.log("message: " + msg);
  });
});

// Send the message to everyone
io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
  });
});

// Port
http.listen(port, function () {
  console.log("listening on *:" + port);
});
