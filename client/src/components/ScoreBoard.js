import React, { useContext } from "react";
import { ScoreBoardDiv } from "./styledComponents/ScoreBoardDiv";
import { GameContext } from "./GameProvider";
import Player from "./Player";
import threes from "../Untitled-Artwork.psd"

export function ScoreBoard() {
  const { game, player } = useContext(GameContext);

  return (
    <ScoreBoardDiv>
      <img src={threes} alt="threes"/>
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
