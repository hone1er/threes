import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { CurrentPlayerDiv } from "./styledComponents/CurrentPlayerDiv";

export default function CurrentPlayer() {
  const { game } = useContext(GameContext);

  // show current player or winner
  const current = game.names[game.currentPlayer]
    ? game.names[game.currentPlayer] + "'s Turn"
    : "Winner: " + game.names[game.scores.indexOf(Math.min(...game.scores))];

  // assign classname based on current player or winner to styling
  const classname = game.names[game.currentPlayer] ? "turn" : "winner";

  return (
    <CurrentPlayerDiv>
      <h1 className={classname}>{current}</h1>
    </CurrentPlayerDiv>
  );
}
