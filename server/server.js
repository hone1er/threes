const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const clientPath = `${__dirname}/../client/build`;
let count = 0;
let chat = [];
let game = {
  currentPlayer: 0,
  playerTurns: 6,
  diceValues: Array(6).fill(5),
  dieVisable: Array(6).fill(true),
  names: [],
  scores: [],
  rollDisabled: false,
  diceDisabled: true,
  gameOver: false,
};

console.log(`serving static files from : ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (sock) => {
  count += 1;
  console.log("total users connected: " + count);

  sock.emit("setGame", game);

  sock.on("setGame", (data) => {
    console.log(data);
    game = data;

    io.emit("setGame", data);
  });

  sock.on("rollDice", (data) => {
    io.emit("setGame", data);
  });

  sock.on("addUser", (user) => {
    game.names.push(user);
    game.scores.push(0);
    io.emit("setGame", game);
  });

  sock.on("sendMessage", (message) => {
    chat.push(message);
    console.log(chat)
    sock.broadcast.emit("receiveMessage", chat)
    
  });
});

server.on("error", (error) => {
  console.error("server error: ", error);
});

server.listen(5000, () => {
  console.log("Threes server started");
});
