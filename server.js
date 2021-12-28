const http = require("http");
const express = require("express");
const socketio = require("socket.io");
// var mysql = require("mysql");

// var db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "gamedb",
// });

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// function createUser(userName, password, email) {
//   let user = {
//     username: userName,
//     password: password,
//     email: email,
//   };
//   let sql = `INSERT INTO players ${user}`;
//   db.query(sql, user, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// }

// function recordGame(userList) {
//   let sql;
//   userList.forEach((user) => {
//     if (user.won) {
//       sql = `UPDATE winloss SET wins = wins+1 WHERE id = ${user.id}`;

//       db.query(sql, (err, result) => {
//         if (err) {
//           throw err;
//         }
//         console.log(result);
//       });
//     } else if (!user.won) {
//       sql = `UPDATE winloss SET wins = wins+1 WHERE id = ${user.id}`;
//       db.query(sql, (err, result) => {
//         if (err) {
//           throw err;
//         }
//         console.log(result);
//       });
//     }
//   });
// }

const app = express();
const clientPath = `${__dirname}/build`;
// keep track of the number of clients connected
let count = 0;
// store the rooms as key(roomName): value(gameObject) pairs for quick lookup
let rooms = {};

// server side new game state
const newGame = {
  currentPlayer: 0,
  playerTurns: 5,
  diceValues: Array(5).fill(5),
  dieVisable: Array(5).fill(true),
  names: [],
  scores: [],
  chat: [],
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

// LOCAL SERVER
const PORT = process.env.PORT || 8000;
const INDEX = "build/index.html";
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () =>
    console.log(
      `\n\n\nListening on ${PORT}.............................................................\n\n\n`
    )
  );

// const server = http.createServer(app);

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
  sock.on("newRoom", ({ room, player, publicStatus, password }) => {
    if (rooms[room]) {
      sock.emit("joinFailed", "roomTaken");
    } else {
      // remove the player from any other rooms they may have been connected to before allowing them to create a new room
      if (userGame) {
        let currentGame = userGame;
        if (currentGame.names.indexOf(sockUser) !== -1) {
          currentGame.scores.splice(currentGame.names.indexOf(sockUser), 1);
          currentGame.names.splice(currentGame.names.indexOf(sockUser), 1);
          if (rooms[room]) {
            rooms[room].chat.push(`${sockUser} disconnected`);
          }
          sock.broadcast.to(userRoom).emit("receiveMessage", rooms[room].chat);
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
          rooms[room].chat.push(`${sockUser} disconnected`);
          sock.broadcast.to(userRoom).emit("receiveMessage", rooms[room].chat);
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
            return sock.emit("joinFailed", "publicStatusError");
          } else {
            return sock.emit("joinFailed", "privateStatusError");
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
    if (rooms[userRoom]) {
      rooms[userRoom].chat.push(message);
      sock.broadcast.to(userRoom).emit("receiveMessage", rooms[userRoom].chat);
      return;
    }
    return;
  });

  sock.on("disconnect", (user) => {
    if (rooms[userRoom]) {
      rooms[userRoom].chat.push(`${sockUser} disconnected`);
      sock.broadcast.to(userRoom).emit("receiveMessage", rooms[userRoom].chat);
    }
    let tempGame = userGame;
    count -= 1;

    console.log(
      `\n${sockUser} disconnected from room: ${userRoom}.....................................................\n`
    );

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
    io.to(userRoom).emit("setGame", tempGame);
  });
});

server.on("error", (error) => {
  console.error("server error: ", error);
});

// // // BUILD SERVER
// var port = process.env.PORT
// server.listen(port, () => {
//   console.log(
//     "Threes server started on port: " + port + "............................"
//   );
// });
