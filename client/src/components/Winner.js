import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { WinnerDiv } from "./styledComponents/WinnerDiv";
import threes from "./styledComponents/threesMain.jpg";

export default function Winner() {
  const { game } = useContext(GameContext);

  // keep track of low score
  const lowScores = game.scores.filter((item) => {
    return item === Math.min(...game.scores);
  });

  // assign classname based on current player or winner to styling
  const classname = "winner";
  const position = game.gameOver ? "0" : "-150vw";
  const imagePosition = game.gameOver ? "60px" : "80px";

  // show tie game or winner
  const winner =
    lowScores.length > 1 ? (
      <h1 className={classname}>Winner: tie game</h1>
    ) : (
      <div className={classname}>
      <h1 className="rainbow-text">
        Winner: {game.names[game.scores.indexOf(lowScores[0])]}
      </h1>
      </div>
    );

  return (
    <WinnerDiv
      position={position}
      imagePosition={imagePosition}
      className="player-area"
    >
      {winner}
      <img className="dice-area-logo" src={threes} alt="threesLogo" />
    </WinnerDiv>
  );
}
