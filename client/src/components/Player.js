import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { PlayerDiv } from "./styledComponents/PlayerDiv";

export default function Player(props) {
  const { game } = useContext(GameContext);
  return (
    <PlayerDiv>
      <div className="player" player={props.player}>
      {props.player ? <p>You: </p> : null}
      <h1> {game.names[props.playerNumber]}</h1>
      </div>
      <h1>{game.scores[props.playerNumber]}</h1>
    </PlayerDiv>
  );
}
