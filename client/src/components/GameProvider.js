import React, { useState, createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";

export const GameContext = createContext();
const sock = socketIOClient("https://localhost:5000");

export function GameProvider(props) {
  const [player, setPlayer] = useState(
    JSON.parse(localStorage.getItem("player")) || ""
  );
  const [game, setGame] = useState({
    currentPlayer: 0,
    playerTurns: 6,
    diceValues: Array(6).fill(5),
    dieVisable: Array(6).fill(true),
    names: [],
    scores: [],
    rollDisabled: false,
    diceDisabled: true,
    gameOver: false,
  });

  function handleScore(playerid, value, die) {
    const tempGame = game;
    if (value !== 3) {
      tempGame.scores[playerid] += value;
    }
    tempGame.dieVisable[die] = false;
    tempGame.playerTurns -= 1;

    setGame({
      ...game,
      scores: tempGame.scores,
      dieVisable: tempGame.dieVisable,
      playerTurns: tempGame.playerTurns,
      rollDisabled: false,
    })
    sock.emit("setGame", {
      ...game,
      scores: tempGame.scores,
      dieVisable: tempGame.dieVisable,
      playerTurns: tempGame.playerTurns,
      rollDisabled: false,
    });
  }

  

  // handles the switching of players when playerTurns run out and checks for winner
  useEffect(() => {
    const tempGame = game;
    if (game.playerTurns <= 0 && game.currentPlayer < game.names.length) {
      tempGame.currentPlayer = (tempGame.currentPlayer + 1);
      tempGame.playerTurns = 6;
      tempGame.dieVisable = Array(6).fill(true);
      tempGame.diceDisabled = true

      setGame({
        ...game,
        currentPlayer: tempGame.currentPlayer,
        diceDisabled: tempGame.diceDisabled,
        dieVisable: tempGame.dieVisable,
        gameOver: game.currentPlayer === game.names.length,
        rollDisabled: game.currentPlayer === game.names.length,
      });
      sock.emit("setGame", {
        ...game,
        currentPlayer: tempGame.currentPlayer,
        diceDisabled: tempGame.diceDisabled,
        dieVisable: tempGame.dieVisable,
        gameOver: game.currentPlayer === game.names.length,
        rollDisabled: game.currentPlayer === game.names.length,
      })
    }
  }, [game]);

  sock.on("setGame", (data) => {
    setGame(data);
  });

  return (
    <GameContext.Provider
      value={{ game, setGame, handleScore, sock, setPlayer, player }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
