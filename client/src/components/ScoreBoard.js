import React, { useContext } from "react";
import { ScoreBoardDiv } from "../styledComponents/ScoreBoardDiv";
import { GameContext } from "./GameProvider";
import Player from "./Player";

export function ScoreBoard() {
  const { game, player } = useContext(GameContext);

  return (
    <ScoreBoardDiv className="scoreboard-area">
      <div className="score-header-container">
        <h1 className="scoreboard-header">Players</h1>
      </div>
      {game.names.map((name, index) => {
        return (
          <Player
            key={index + name}
            playerNumber={index}
            player={name === player ? "true" : null}
            current={
              game.names.indexOf(name) === game.currentPlayer
                ? "current"
                : "not-current"
            }
          />
        );
      })}
    </ScoreBoardDiv>
  );
}
