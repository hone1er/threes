import React, { useContext } from "react";
import { GameContext } from "./GameProvider";

export default function CurrentPlayer() {
  const { game } = useContext(GameContext);

  return (
    <div>
      <h1>
        {game.names[game.currentPlayer]
          ? game.names[game.currentPlayer] + "'s Turn"
          : "Winner: " +
            game.names[game.scores.indexOf(Math.min(...game.scores))]}
      </h1>
    </div>
  );
}
