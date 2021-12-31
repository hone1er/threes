import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameProvider";
import { PlayerDiv } from "../styledComponents/PlayerDiv";
import { useWallet } from "@web3-ui/hooks";
import { Address } from "@web3-ui/components";

export default function Player(props) {
  const { game } = useContext(GameContext);
  const { connection } = useWallet();
  const [displayName, setDisplayName] = useState(
    connection.ens || connection.userAddress
  );

  useEffect(() => {
    setDisplayName(connection.ens || connection.userAddress);

    // eslint-disable-next-line
  }, [connection.userAddress, connection.ens]);

  let display = displayName ? displayName : game.names[props.playerNumber];
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
