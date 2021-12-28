import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import threes from "../styledComponents/images/threesMain.jpg";
import { WinnerDiv } from "../styledComponents/WinnerDiv";
import { Address } from "@web3-ui/components";

export default function Winner() {
  const { game } = useContext(GameContext);

  // keep track of low score
  const lowScores = game.scores.filter((item) => {
    return item === Math.min(...game.scores);
  });

  // assign classname based on current player or winner to styling
  const classname = "winner";
  const position = game.gameOver ? "0" : "-150vw";

  // show tie game or winner
  const winner =
    lowScores.length > 1 ? (
      <h1 className={classname}>TIE GAME</h1>
    ) : (
      <div className={classname}>
        <h1 className="rainbow-text">Winner:</h1>
        <Address
          className="addy"
          value={game.names[game.scores.indexOf(lowScores[0])]}
          shortened
        />
      </div>
    );

  return (
    <WinnerDiv position={position} className="player-area">
      {winner}
      <img className="dice-area-logo" src={threes} alt="threesLogo" />
    </WinnerDiv>
  );
}
