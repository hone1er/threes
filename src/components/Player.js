import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameProvider";
import { PlayerDiv } from "../styledComponents/PlayerDiv";
import { useWallet, useTransaction } from "@web3-ui/hooks";
import { Address } from "@web3-ui/components";

export default function Player(props) {
  const { game } = useContext(GameContext);
  const { connection } = useWallet();
  const [displayName, setDisplayName] = useState(
    connection.ens || connection.userAddress
  );

  const { execute, loading, error } = useTransaction(
    connection.signer.signMessage,
    ["sign this"]
  );

  useEffect(() => {
    setDisplayName(connection.ens || connection.userAddress);
    console.log(connection);
    // eslint-disable-next-line
  }, [connection.userAddress, connection.ens]);

  useEffect(() => {
    async function exe() {
      const [exe, load, err] = [await execute, await loading, await error];
      console.log("EXE: ", connection.signer, await exe, load, err);
    }
    exe();
    return () => {};
  }, [execute, loading, error, connection.signer]);
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
