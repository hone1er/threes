import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { PlayerDiv } from "./styledComponents/PlayerDiv";

export default function Player(props) {
  const { game } = useContext(GameContext);
  return (
    <PlayerDiv>
      <div className="player" player={props.player}>
      <h1> {game.names[props.playerNumber]}: {game.scores[props.playerNumber]}</h1>
      </div>
    </PlayerDiv>
  );
}
