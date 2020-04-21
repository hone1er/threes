import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { CurrentPlayerDiv } from "./styledComponents/CurrentPlayerDiv";

export default function CurrentPlayer() {
  const { game } = useContext(GameContext);

  return (
    <CurrentPlayerDiv>
      <h1>
        {game.names[game.currentPlayer]
          ? game.names[game.currentPlayer] + "'s Turn"
          : "Winner: " +
            game.names[game.scores.indexOf(Math.min(...game.scores))]}
      </h1>
    </CurrentPlayerDiv>
  );
}
