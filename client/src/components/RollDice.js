import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { Button } from "./styledComponents/Button";
export default function RollDice() {
  const { game, setGame, sock, player } = useContext(GameContext);
  
  function handleRoll() {
    let value = [Array(6).fill(null)];
    for (let i = 0; i < game.diceValues.length; i++) {
      value[i] = Math.ceil(Math.random() * 6);
      setGame({
        ...game,
        diceValues: value,
        rollDisabled: true,
        diceDisabled: false,
      });
    }

    sock.emit("rollDice", {
      ...game,
      diceValues: value,
      rollDisabled: true,
      diceDisabled: false,
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
      playerTurns: 6,
      diceValues: Array(6).fill(5),
      dieVisable: Array(6).fill(true),
      scores: Array(game.names.length).fill(0),
      rollDisabled: false,
      diceDisabled: true,
      gameOver: false,
    };
    sock.emit("setGame", newGame);
  }
  return (
    <>
      <Button disabled={player !== game.names[game.currentPlayer] ? true : game.rollDisabled} onClick={handleRoll}>
        {game.gameOver ? "game over " : "roll the dice"}
      </Button>
      <Button reset={!game.gameOver} onClick={handleReset}>reset</Button>
    </>
  );
}
