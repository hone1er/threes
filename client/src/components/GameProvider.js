import React, { useState, createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import diceAudio from "../diceSound.mp3"
export const GameContext = createContext();
const sock = socketIOClient("enigmatic-stream-22705.herokuapp.com");

export function GameProvider(props) {
  const [player, setPlayer] = useState("");
  const [game, setGame] = useState({
    currentPlayer: 0,
    playerTurns: 5,
    diceValues: Array(5).fill(5),
    dieVisable: Array(5).fill(true),
    names: [],
    scores: [],
    rollDisabled: false,
    rolling: false,
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
      tempGame.playerTurns = 5;
      tempGame.dieVisable = Array(5).fill(true);
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

  useEffect(() => {
    setTimeout(() => {
      let el = document.getElementsByClassName("dice");
      var audio = new Audio(diceAudio);
      audio.play();
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
    }
  }, [game.rolling])

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
