import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { Button } from "./styledComponents/Button";
import diceAudio from "../diceSound.mp3";

export default function RollDice() {
  const { game, setGame, sock, player } = useContext(GameContext);
  
  var audio = new Audio(diceAudio);
  function handleRoll() {
    audio.play();
    let value = [Array(5).fill(null)];


    for (let i = 0; i < game.diceValues.length; i++) {
      value[i] = Math.ceil(Math.random() * 6);
      setGame({
        ...game,
        diceValues: value,
        rollDisabled: true,
        diceDisabled: false,
        rolling: !game.rolling
      });
    }
    setGame({
      ...game,
      diceValues: value,
      rollDisabled: true,
      diceDisabled: false,
      rolling: !game.rolling

    })
    sock.emit("rollDice", {
      ...game,
      diceValues: value,
      rollDisabled: true,
      diceDisabled: false,
      rolling: !game.rolling
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
    };

    setGame(newGame);
    sock.emit("setGame", newGame);
  }
  
  return (
    <>
      <Button disabled={player !== game.names[game.currentPlayer] ? true : game.rollDisabled} onClick={handleRoll}>
        {game.gameOver ? "game over " : game.names[game.currentPlayer] !== player ? `${game.names[game.currentPlayer]}'s turn` :  game.rollDisabled ? "pickup dice" :  "roll the dice"}
      </Button>
      <Button reset={!game.gameOver} onClick={handleReset}>reset</Button>
    </>
  );
}
