const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const clientPath = `${__dirname}/build`;
// keep track of the number of clients connected
let count = 0;
// chat log
let chat = [];
let rooms = {
  1: {
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
  },
  2: {
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
  },
  3: {
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
  },
  4: {
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
  },
  5: {
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
  },
  "benal": {
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
  },
};
// server side game state

const game = {
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
  let userRoom;
  let userGame = game;
  count += 1;
  console.log("total users connected: " + count);
  sock.emit("setRooms", Object.keys(rooms));
  sock.on("joinRoom", ({room, player}) => {
   
    if (rooms[room]) {
      sock.join(room);
      currentGame = rooms[room];
      currentGame.names.push(player);
      currentGame.scores.push(0);
      sockUser = player;
      userRoom = room;
      userGame = rooms[room]
      rooms[room] = currentGame;
      console.log(`you have succefully joined room: ${room}`);
      return io.to(room).emit("setGame", currentGame)
    } else {
      console.log(`no room found named: ${room}`);
      return sock.emit("err", `no room found named: ${room}`);
    }
  });
  sock.on("newRoom", (game) => {
      let tempGame = game;
      tempGame.names.push(player);
      tempGame.scores.push(0);
      rooms[room] = tempGame;
      console.log(rooms)
      return io.to(room).emit("setGame", tempGame)
  })


  sock.on("setGame", (data) => {
    rooms[userRoom] = data;
    sock.broadcast.to(userRoom).emit("setGame", data);
  });

  sock.on("rollDice", (data) => {
    sock.broadcast.to(userRoom).emit("setGame", data);
  });



  sock.on("sendMessage", (message) => {
    chat.push(message);
    console.log(chat);
    sock.broadcast.to(userRoom).emit("receiveMessage", chat);
  });

  sock.on("disconnect", (user) => {
    chat.push(`${sockUser} disconnected`);
    sock.emit("setGame", game);
    sock.broadcast.to(userRoom).emit("receiveMessage", chat);
    let tempGame = userGame;
    console.log(sockUser)
    if (tempGame.names.indexOf(sockUser) !== -1) {
      tempGame.scores.splice(tempGame.names.indexOf(sockUser), 1);
      tempGame.names.splice(tempGame.names.indexOf(sockUser), 1);
      sock.broadcast.to(userRoom).emit("setGame", tempGame);
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
