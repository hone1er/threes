import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameProvider";
import { PlayerDiv } from "../styledComponents/PlayerDiv";

export default function Player(props) {
  const { game, status } = useContext(GameContext);
  const [displayName, setDisplayName] = useState(game.names[props.playerNumber])
  useEffect(() => {
    console.log(status);
    if (status === "connected") {
      var ethers = require("ethers");
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      // ENS functionality is provided directly on the core provider object.
      var name = provider.lookupAddress(game.names[props.playerNumber]).then(function (res) {
        setDisplayName(res);
        return res;
      });
    }
    // Check to be sure the reverse record is correct.
  }, []);
  let display = displayName ? displayName : game.names[props.playerNumber]
  return (
    <PlayerDiv current={props.current}>
      <div className="player" player={game.names[props.playerNumber]}>
        <h1>
          {" "}
          {display.length > 12
            ? String(display).substring(0, 7) +
              "..." +
              String(display).substring(38)
            : display}
          : {game.scores[props.playerNumber]}
        </h1>
      </div>
    </PlayerDiv>
  );
}
