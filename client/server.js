const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const clientPath = `${__dirname}/build`;
// keep track of the number of clients connected
let count = 0;
// chat log
let chat = [];
// server side game state
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
  // name of the socket user
  let sockUser;
  count += 1;
  console.log("total users connected: " + count);
  // emit game state of connection
  sock.emit("setGame", game);
  
  sock.on("setGame", (data) => {
    game = data;
    io.emit("setGame", data);
  });

  sock.on("rollDice", (data) => {
    io.emit("setGame", data);
  });

  // upon sign-in, add user and set game 
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
    chat.push(`${sockUser} disconnected`);
    io.emit("receiveMessage", chat);
    let tempGame = game;
    if (tempGame.names.indexOf(sockUser) !== -1){
    tempGame.scores.splice(tempGame.names.indexOf(sockUser), 1);
    tempGame.names.splice(tempGame.names.indexOf(sockUser), 1);
    io.emit("setGame", tempGame);
    count -= 1;
    console.log(`${sockUser} disconnected`);
    }
  });
});

server.on("error", (error) => {
  console.error("server error: ", error);
});

server.listen(process.env.PORT, () => {
  console.log("Threes server started");
});
