import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { Die } from "./styledComponents/Die";
import { DiceDiv } from "./styledComponents/DiceDiv";
import die1 from "../diceSVG/U+2680.svg";
import die2 from "../diceSVG/U+2681.svg";
import die3 from "../diceSVG/U+2682.svg";
import die4 from "../diceSVG/U+2683.svg";
import die5 from "../diceSVG/U+2684.svg";
import die6 from "../diceSVG/U+2685.svg";

export default function Dice() {
  const { game, handleScore, player } = useContext(GameContext);
  const diceImages = [die1, die2, die3, die4, die5, die6];

  return (
    <DiceDiv className="dice-area">
      {game.diceValues.map((value, index) => {
        const die = diceImages[value - 1];
        let diePosition;
        if (game.dieVisable[index]) {
          diePosition = "0";
        } else {
          diePosition = index % 2 ? "120vw" : "-120vw";
        }
        return (
          <Die
            key={index}
            id={index}
            disabled={
              player !== game.names[game.currentPlayer]
                ? true
                : game.diceDisabled
            }
            className="dice"
            diePosition={diePosition}
            onClick={() => handleScore(game.currentPlayer, value, index)}
          >
            <img src={die} alt="dice" />
          </Die>
        );
      })}
    </DiceDiv>
  );
}
