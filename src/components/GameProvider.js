import React, { useState, createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import swish from "../audio/swish.mp3";
import "../index.css";
import { NETWORKS, Provider as HookProvider } from "@web3-ui/hooks";
import {
  publicStatusError,
  privateStatusError,
  roomNameTaken,
  userNameTaken,
  wrongPassword,
  roomDoesNotExist,
} from "../helperMessages";
export const GameContext = createContext();
const swishSound = new Audio(swish);
const sock = socketIOClient("webthrees.herokuapp.com");
let index = 0;
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

sock.on("joinSuccess", (reason) => {
  console.log("REASON: ", reason["join"]);
  let response = reason["join"] || "create";
  switch (response) {
    case reason["join"]:
      document.getElementById("join").click();
      index = reason["join"];
      break;
    case "create":
      document.getElementById("new").click();
      break;
    default:
      break;
  }
  return;
});

sock.on("ping", function (data) {
  sock.emit("pong", { beat: 1 });
});

export function GameProvider(props) {
  const [player, setPlayer] = useState("");
  const [status, setStatus] = useState("");
  const [game, setClientGame] = useState({
    currentPlayer: 0,
    playerTurns: 5,
    diceValues: Array(5).fill(5),
    dieVisable: Array(5).fill(true),
    names: [],
    scores: [],
    chat: [],
    currentRoom: "",
    password: "",
    rollDisabled: false,
    rolling: false,
    diceDisabled: true,
    gameOver: false,
    public: true,
  });
  const [loading, setLoading] = useState(false);
  const [etherscan, setEtherscan] = useState("https://ropsten.etherscan.io/");
  const [bet, setBet] = useState(0);
  const [clientScore, setClientScore] = useState(null);
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
    setClientGame(gameStats);
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

    setClientGame(newGame);
    sock.emit("setGame", newGame);
  }
  // handles the switching of players when playerTurns run out and checks for winner
  useEffect(() => {
    const tempGame = game;
    if (clientScore !== null) return;
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

      setClientGame(gameObj);
      sock.emit("setGame", gameObj);
    } else {
      return;
    }
    // eslint-disable-next-line
  }, [clientScore]);

  sock.on("setGame", (data) => {
    setClientGame(data);
    setClientScore(null);
  });

  return (
    <HookProvider network={NETWORKS.ropsten}>
      <GameContext.Provider
        value={{
          game,
          setClientGame,
          handleScore,
          sock,
          setPlayer,
          player,
          handleReset,
          setStatus,
          status,
          index,
          loading,
          setLoading,
          etherscan,
          setEtherscan,
          bet,
          setBet,
          clientScore,
          setClientScore,
        }}
      >
        {props.children}
      </GameContext.Provider>
    </HookProvider>
  );
}
