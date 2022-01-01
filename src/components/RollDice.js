import React, { useEffect } from "react";
import { Button } from "../styledComponents/Button";
import diceAudio from "../audio/diceSound.mp3";
import { Address } from "@web3-ui/components";

var audio = new Audio(diceAudio);
export default function RollDice({ game, setGame, handleReset, sock, player }) {
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

  useEffect(() => {
    setTimeout(() => {
      let el = document.getElementsByClassName("dice");
      for (let i = 0; i < el.length; i++) {
        el[i].classList.remove("rolling");
      }
    }, 500);
    return () => {
      setTimeout(() => {
        let el = document.getElementsByClassName("dice");
        for (let i = 0; i < el.length; i++) {
          el[i].classList.add("rolling");
        }
      }, 0);
      return;
    };
  }, [game.rolling]);

  return (
    <div className="roll-area">
      <Button
        disabled={
          player !== game.names[game.currentPlayer] ? true : game.rollDisabled
        }
        onClick={handleRoll}
      >
        {game.gameOver || !game.names[game.currentPlayer] ? (
          "game over "
        ) : game.names[game.currentPlayer] !== player ? (
          <Address value={game.names[game.currentPlayer]} shortened />
        ) : (
          "roll the dice"
        )}
      </Button>
      <Button reset={!game.gameOver} onClick={handleReset}>
        reset
      </Button>
    </div>
  );
}
