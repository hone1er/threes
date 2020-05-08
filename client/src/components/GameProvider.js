import React, { useState, createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
export const GameContext = createContext();
const sock = socketIOClient("localhost:5000");

export function GameProvider(props) {
  const [player, setPlayer] = useState("");
  const [game, setGame] = useState({
    currentPlayer: 0,
    playerTurns: 5,
    diceValues: Array(5).fill(5),
    dieVisable: Array(5).fill(true),
    names: [],
    scores: [],
    rooms: [],
    currentRoom: "",
    password: "",
    rollDisabled: false,
    rolling: false,
    diceDisabled: true,
    gameOver: false,
    public: true,
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
    });
    sock.emit("setGame", {
      ...game,
      scores: tempGame.scores,
      dieVisable: tempGame.dieVisable,
      playerTurns: tempGame.playerTurns,
      rollDisabled: false,
    });
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
      });
    } else {
      return;
    }
  }, [game]);

  useEffect(() => {
    setTimeout(() => {
      let el = document.getElementsByClassName("dice");
      for (let i = 0; i < el.length; i++) {
        el[i].classList.add("rolling");
      }
    }, 0);

    return () => {
      setTimeout(() => {
        let el = document.getElementsByClassName("dice");
        for (let i = 0; i < el.length; i++) {
          el[i].classList.remove("rolling");
        }
      }, 500);
      return;
    };
  }, [game.rolling]);

  sock.on("setGame", (data) => {
    setGame(data);
  });

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        handleScore,
        sock,
        setPlayer,
        player,
        handleReset,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
