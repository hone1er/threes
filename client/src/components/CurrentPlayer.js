import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { CurrentPlayerDiv } from "./styledComponents/CurrentPlayerDiv";
import threes from "./styledComponents/threesMain.jpg";
export default function CurrentPlayer() {
  const { game } = useContext(GameContext);
  // keep track of low scor
  const lowScores = game.scores.filter((item) => {
    return item === Math.min(...game.scores);
  });
  // assign classname based on current player or winner to styling
  const classname = "winner";
  const position = game.gameOver ? "0" : "-150vw";
  const imagePosition = game.gameOver ? "0" : "-100px";

  // show current player or winner
  const current =
    lowScores.length > 1 ? (
      <h1 className={classname}>TIE GAME!</h1>
    ) : (
      <h1 className={classname}>
        Winner: {game.names[game.scores.indexOf(lowScores[0])]}
      </h1>
    );

  return (
    <CurrentPlayerDiv position={position} imagePosition={imagePosition} className="player-area">
      <img className="dice-area-logo" src={threes} alt="threesLogo" />
      {current}
    </CurrentPlayerDiv>
  );
}
