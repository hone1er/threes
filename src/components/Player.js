import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { PlayerDiv } from "../styledComponents/PlayerDiv";
import { Address } from "@web3-ui/components";

export default function Player(props) {
  const { game } = useContext(GameContext);

  let display = game.names[props.playerNumber];
  return (
    <PlayerDiv current={props.current}>
      <div className="player" player={game.names[props.playerNumber]}>
        <div className="wrap">
          <Address value={display} shortened />
          <p>: {game.scores[props.playerNumber]}</p>
        </div>
      </div>
    </PlayerDiv>
  );
}
