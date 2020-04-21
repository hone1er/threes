import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { PlayerDiv } from "./styledComponents/PlayerDiv";

export default function Player(props) {
  const { game } = useContext(GameContext);
  return (
    <PlayerDiv>
      <div className="player">
      {props.player ? <p>You: </p> : null}
      <h1> {game.names[props.playerNumber]}</h1>
      </div>
      <h2>{game.scores[props.playerNumber]}</h2>
    </PlayerDiv>
  );
}
