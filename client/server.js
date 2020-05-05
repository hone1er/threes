const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const clientPath = `${__dirname}/build`;
// keep track of the number of clients connected
let count = 0;
// chat log
let chat = [];
let rooms = {};
// server side game state
const newGame = {
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
  public: true,
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
  let userGame = JSON.parse(JSON.stringify(newGame));
  count += 1;
  console.log(
    "\ntotal users connected: " +
      count +
      "...........................................\n"
  );
  sock.emit("setRooms", rooms);
  sock.on("newRoom", ({ room, player }) => {
    if (userGame) {
      let currentGame = userGame;
      if (currentGame.names.indexOf(sockUser) !== -1) {
        currentGame.scores.splice(currentGame.names.indexOf(sockUser), 1);
        currentGame.names.splice(currentGame.names.indexOf(sockUser), 1);
        chat.push(`${sockUser} disconnected`);
        sock.broadcast.to(userRoom).emit("receiveMessage", chat);
        sock.leave(userRoom);
        console.log(`\n${player} disconnected from room: ${userRoom}\n`);
        sock.broadcast.to(userRoom).emit("setGame", currentGame);
        if (currentGame.names.length === 0) {
          delete rooms[userRoom];
          console.log(`\n${userRoom} deleted...........................\n`);
        }
      }
    }
    sock.leaveAll();
    sock.join(room);
    sockUser = player;
    userRoom = room;
    let tempGame = JSON.parse(JSON.stringify(newGame));
    tempGame.names.push(player);
    tempGame.scores.push(0);
    rooms[room] = tempGame;
    userGame = rooms[room];

    io.emit("setRooms", rooms);
    io.to(room).emit("setGame", tempGame);
    console.log(`\n${player} has succefully CREATED room: ${room}\n`);
  });
  sock.on("joinRoom", ({ room, player }) => {
    let currentGame = userGame;
    if (currentGame.names.indexOf(sockUser) !== -1) {
      currentGame.scores.splice(currentGame.names.indexOf(sockUser), 1);
      currentGame.names.splice(currentGame.names.indexOf(sockUser), 1);
      chat.push(`${sockUser} disconnected`);
      sock.broadcast.to(userRoom).emit("receiveMessage", chat);
      sock.leave(userRoom);
      console.log(`\n${player} disconnected from room: ${userRoom}\n`);

      if (currentGame.names.length === 0) {
        delete rooms[userRoom];
        console.log(`\n${userRoom} deleted...........................\n`);
        console.log(rooms);
      }
    }
    if (rooms[room]) {
      sock.join(room);
      currentGame = rooms[room];
      currentGame.names.push(player);
      currentGame.scores.push(0);
      sockUser = player;
      userRoom = room;
      rooms[room] = currentGame;
      userGame = rooms[room];
      console.log(`\n${sockUser} has succefully JOINED room: ${room}\n`);
      return io.to(room).emit("setGame", currentGame);
    } else {
      console.log(`\nno room found named: ${room}\n`);
      return sock.emit("err", `\nno room found named: ${room}\n`);
    }
  });

  sock.on("setGame", (data) => {
    rooms[userRoom] = data;
    sock.broadcast.to(userRoom).emit("setGame", data);
  });

  sock.on("rollDice", (data) => {
    sock.broadcast.to(userRoom).emit("setGame", data);
  });

  sock.on("sendMessage", (message) => {
    chat.push(message);
    sock.broadcast.to(userRoom).emit("receiveMessage", chat);
  });

  sock.on("disconnect", (user) => {
    chat.push(`${sockUser} disconnected`);
    sock.broadcast.to(userRoom).emit("receiveMessage", chat);
    let tempGame = userGame;
    count -= 1;

    if (tempGame.names.indexOf(sockUser) !== -1) {
      tempGame.scores.splice(tempGame.names.indexOf(sockUser), 1);
      tempGame.names.splice(tempGame.names.indexOf(sockUser), 1);
      if (tempGame.names.length === 0) {
        delete rooms[userRoom];
        console.log(`\n${userRoom} deleted...........................\n`);
        console.log("Rooms Remaining:  \n")
        console.log(Object.keys(rooms).length ? Object.keys(rooms) + "\n" : "none \n");
      } else {
        rooms[userRoom] = tempGame;
        userGame = rooms[userRoom];
      }
    }
    sock.leave(userRoom);
    io.emit("setRooms", rooms);
    io.to(userRoom).emit("setGame", tempGame);
    console.log(
      `\n${sockUser} disconnected from room: ${userRoom}.....................................................\n`
    );
  });
});

server.on("error", (error) => {
  console.error("server error: ", error);
});

server.listen(process.env.PORT, () => {
  console.log(
    "Threes server started on port: " + process.env.PORT + "............................"
  );
});
