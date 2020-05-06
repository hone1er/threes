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
  const classname = game.names[game.currentPlayer] ? "turn" : "winner";
  // show current player or winner
  const current =
    game.names.length < 1 || !game.gameOver ? (
      <img src={threes} alt="threesLogo" />
    ) : lowScores.length > 1 ? (
      <h1 className={classname}>TIE GAME!</h1>
    ) : (
      <h1 className={classname}>
        Winner: {game.names[game.scores.indexOf(lowScores[0])]}
      </h1>
    );

  return <CurrentPlayerDiv className="player-area">{current}</CurrentPlayerDiv>;
}
