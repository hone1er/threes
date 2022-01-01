import React from "react";
import { PlayerDiv } from "../styledComponents/PlayerDiv";
import { Address } from "@web3-ui/components";

export default function Player({ game, playerNumber, current }) {
  let display = game.names[playerNumber];
  return (
    <PlayerDiv current={current}>
      <div className="player" player={game.names[playerNumber]}>
        <div className="wrap">
          <Address value={display} shortened />
          <p>: {game.scores[playerNumber]}</p>
        </div>
      </div>
    </PlayerDiv>
  );
}
