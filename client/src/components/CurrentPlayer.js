import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { CurrentPlayerDiv } from "./styledComponents/CurrentPlayerDiv";

export default function CurrentPlayer() {
  const { game } = useContext(GameContext);
  // keep track of low scor
  const lowScores = game.scores.filter((item) => {
    return item === Math.min(...game.scores);
  });
  // show current player or winner
  const current =
    game.names.length < 1
      ? ""
      : !game.gameOver
      ? game.names[game.currentPlayer] + "'s Turn"
      : lowScores.length > 1
      ? "TIE GAME!"
      : "Winner: " + game.names[game.scores.indexOf(lowScores[0])];

  // assign classname based on current player or winner to styling
  const classname = game.names[game.currentPlayer] ? "turn" : "winner";

  return (
    <CurrentPlayerDiv className="player-area">
      <h1 className={classname}>{current}</h1>
    </CurrentPlayerDiv>
  );
}
