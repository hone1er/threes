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
  currentRoom: "",
  rollDisabled: false,
  rolling: false,
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
  sock.emit("setRooms", Object.keys(rooms));
  sock.on("newRoom", ({ room, player, publicStatus, password }) => {
    if (rooms[room]) {
      sock.emit("joinFailed", "roomTaken");
    } else {
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
      tempGame.public = publicStatus;
      tempGame.password = password;
      rooms[room] = tempGame;
      userGame = rooms[room];

      sock.emit("joinSuccess", "new");
      io.to(room).emit("setGame", tempGame);
      console.log(rooms);
      console.log(`\n${player} has succefully CREATED room: ${room}\n`);
    }
  });

  sock.on("joinRoom", ({ room, player, publicStatus, password }) => {
    //check if room exist
    if (rooms[room]) {
      //check if userName is already taken in the room
      if (rooms[room].names.includes(player)) {
        return sock.emit("joinFailed", "userNameTaken");
      }
      // check if room is public or private then join room. If private, verify password before joining
      if (
        (rooms[room].public === false && password === rooms[room].password) ||
        rooms[room].public === true
      ) {
        // this is removing the user from a previous game if theyre still connected when they join another game
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

        if (rooms[room].public !== publicStatus) {
          if (rooms[room].public === true) {
            return sock.emit("joinFailed", "publicStatusError")
          }
          else{
            return sock.emit("joinFailed", "privateStatusError")
          }
        }
        // join the game if everything is correct
        sock.join(room);
        currentGame = rooms[room];
        currentGame.names.push(player);
        currentGame.scores.push(0);
        sockUser = player;
        userRoom = room;
        rooms[room] = currentGame;
        userGame = rooms[room];
        console.log(`\n${sockUser} has succefully JOINED room: ${room}\n`);
        sock.emit("joinSuccess", "join");
        return io.to(room).emit("setGame", currentGame);
      }
      // wrong password error
      else if (password !== rooms[room].password) {
        console.log(`\nWRONG PASSWORD: ${room}\n`);
        return sock.emit("joinFailed", "wrongPassword");
      }
    }
    // room does not exist error
    else if (!rooms[room]) {
      console.log(`\nno room found named: ${room}\n`);
      return sock.emit("joinFailed", `roomDoesNotExist`);
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
        console.log("Rooms Remaining:  \n");
        console.log(
          Object.keys(rooms).length ? Object.keys(rooms) + "\n" : "none \n"
        );
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
