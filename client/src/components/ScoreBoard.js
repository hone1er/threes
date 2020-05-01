import React, { useContext } from "react";
import { ScoreBoardDiv } from "./styledComponents/ScoreBoardDiv";
import { GameContext } from "./GameProvider";
import Player from "./Player";

export function ScoreBoard() {
  const { game, player } = useContext(GameContext);

  return (
    <ScoreBoardDiv>
      {game.names.map((name, index) => {
          return (
            <>
              <Player playerNumber={index} player={name===player}/>
            </>
          );
        }
        )}
    </ScoreBoardDiv>
  );
}
