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
  }, [connection]);

  let display = displayName ? displayName : game.names[props.playerNumber];
  return (
    <PlayerDiv current={props.current}>
      <div className="player" player={game.names[props.playerNumber]}>
        <Address value={display} shortened />
      </div>
    </PlayerDiv>
  );
}
