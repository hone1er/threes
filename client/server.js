const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const clientPath = `${__dirname}/build`;
let count = 0;
let chat = [];
let game = {
  currentPlayer: 0,
  playerTurns: 5,
  diceValues: Array(5).fill(5),
  dieVisable: Array(5).fill(true),
  names: [],
  scores: [],
  rolling: false,
  rollDisabled: false,
  diceDisabled: true,
  gameOver: false,
};

console.log(`serving static files from : ${clientPath}`);

app.use(express.static(clientPath));

app.get("*", (req, res) => {
  express.static(path.resolve(__dirname, "build"));
});

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (sock) => {
  let sockUser;
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
    sockUser = user;
    console.log(`${sockUser} has joined the game`);
    io.emit("setGame", game);
  });

  sock.on("sendMessage", (message) => {
    chat.push(message);
    console.log(chat);
    sock.broadcast.emit("receiveMessage", chat);
  });

  sock.on("disconnect", (user) => {
    let tempGame = game;
    tempGame.scores.splice(tempGame.names.indexOf(sockUser), 1);
    tempGame.names.splice(tempGame.names.indexOf(sockUser), 1);
    io.emit("setGame", tempGame);
    console.log(`${sockUser} disconnected`);
  });
});

server.on("error", (error) => {
  console.error("server error: ", error);
});

server.listen(process.env.PORT, () => {
  console.log("Threes server started");
});
