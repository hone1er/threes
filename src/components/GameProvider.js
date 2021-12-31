import React, { useState, createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import swish from "../audio/swish.mp3";
import "../index.css";
import { NETWORKS, Provider as HookProvider } from "@web3-ui/hooks";
export const GameContext = createContext();
const swishSound = new Audio(swish);
const sock = socketIOClient("webthrees.herokuapp.com/");

sock.on("joinFailed", (reason) => {
  switch (reason) {
    case "userNameTaken":
      userNameTaken();
      break;
    case "roomTaken":
      roomNameTaken();
      break;
    case "roomDoesNotExist":
      roomDoesNotExist();
      break;
    case "wrongPassword":
      wrongPassword();
      break;
    case "publicStatusError":
      publicStatusError();
      break;
    case "privateStatusError":
      privateStatusError();
      break;
    default:
      break;
  }
});

function publicStatusError() {
  alert(
    `The room you are trying to join is set to public. Please select the public option and try again`
  );
}

function privateStatusError() {
  alert(
    `The room you are trying to join is set to private. Please select the private option, enter the correct password, and try again`
  );
}

function roomNameTaken() {
  alert(
    `That room name has already been created. Join the room or start a new one with a different name`
  );
}
function userNameTaken() {
  alert(
    `A player in the room you are joining has already used that username. Please select another usename and try again`
  );
}
function wrongPassword() {
  alert(
    `The room you are trying to join is set to private. Please select the private option, enter the correct password, and try again`
  );
}
function roomDoesNotExist() {
  alert(
    `There is no room by that name. Check the name and try again, or create a new room`
  );
}

sock.on("joinSuccess", (reason) => {
  switch (reason) {
    case "join":
      document.getElementById("join").click();
      break;
    case "new":
      document.getElementById("new").click();
      break;
    default:
      break;
  }
  return;
});

export function GameProvider(props) {
  const [player, setPlayer] = useState("");
  const [status, setStatus] = useState("");
  const [game, setGame] = useState({
    currentPlayer: 0,
    playerTurns: 5,
    diceValues: Array(5).fill(5),
    dieVisable: Array(5).fill(true),
    names: [],
    scores: [],
    currentRoom: "",
    password: "",
    rollDisabled: false,
    rolling: false,
    diceDisabled: true,
    gameOver: false,
    public: true,
  });

  function handleScore(playerid, value, die) {
    swishSound.play();
    const tempGame = game;
    if (value !== 3) {
      tempGame.scores[playerid] += value;
    }
    tempGame.dieVisable[die] = false;
    tempGame.playerTurns -= 1;

    let gameStats = {
      ...game,
      scores: tempGame.scores,
      dieVisable: tempGame.dieVisable,
      playerTurns: tempGame.playerTurns,
      rollDisabled: false,
    };
    setGame(gameStats);
    sock.emit("setGame", gameStats);
  }

  function handleReset() {
    const elements = document.getElementsByClassName("dice");
    for (let i = 0; i < elements.length; i++) {
      document.getElementsByClassName("dice")[i].style.display = "unset";
    }
    const newGame = {
      ...game,
      currentPlayer: 0,
      playerTurns: 5,
      diceValues: Array(5).fill(5),
      dieVisable: Array(5).fill(true),
      scores: Array(game.names.length).fill(0),
      rollDisabled: false,
      diceDisabled: true,
      gameOver: false,
      public: true,
    };

    setGame(newGame);
    sock.emit("setGame", newGame);
  }
  // handles the switching of players when playerTurns run out and checks for winner
  useEffect(() => {
    const tempGame = game;
    if (game.playerTurns <= 0 && game.currentPlayer < game.names.length) {
      tempGame.currentPlayer = tempGame.currentPlayer + 1;
      tempGame.playerTurns = 5;
      tempGame.dieVisable = Array(5).fill(true);
      tempGame.diceDisabled = true;

      let gameObj = {
        ...game,
        currentPlayer: tempGame.currentPlayer,
        diceDisabled: tempGame.diceDisabled,
        dieVisable: tempGame.dieVisable,
        gameOver: game.currentPlayer === game.names.length,
        rollDisabled: game.currentPlayer === game.names.length,
      };

      setGame(gameObj);
      sock.emit("setGame", gameObj);
    } else {
      return;
    }
  }, [game]);

  sock.on("setGame", (data) => {
    setGame(data);
  });

  return (
    <HookProvider network={NETWORKS.mainnet}>
      <GameContext.Provider
        value={{
          game,
          setGame,
          handleScore,
          sock,
          setPlayer,
          player,
          handleReset,
          setStatus,
          status,
        }}
      >
        {props.children}
      </GameContext.Provider>
    </HookProvider>
  );
}
