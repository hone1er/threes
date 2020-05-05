import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { Button } from "./styledComponents/Button";
import diceAudio from "../diceSound.mp3";

var audio = new Audio(diceAudio);
export default function RollDice() {
  const { game, setGame, handleReset, sock, player } = useContext(GameContext);
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
        rolling: !game.rolling,
      });
    }
    setGame({
      ...game,
      diceValues: value,
      rollDisabled: true,
      diceDisabled: false,
      rolling: !game.rolling,
    });
    sock.emit("rollDice", {
      ...game,
      diceValues: value,
      rollDisabled: true,
      diceDisabled: false,
      rolling: !game.rolling,
    });
  }
  return (
    <div className="roll-area">
      <Button
        disabled={
          player !== game.names[game.currentPlayer] ? true : game.rollDisabled
        }
        onClick={handleRoll}
      >
        {game.gameOver
          ? "game over "
          : game.names[game.currentPlayer] !== player
          ? `${game.names[game.currentPlayer]}'s turn`
          : game.rollDisabled
          ? "pickup dice"
          : "roll the dice"}
      </Button>
      <Button reset={!game.gameOver} onClick={handleReset}>
        reset
      </Button>
    </div>
  );
}
