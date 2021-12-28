import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../GameProvider";
import { Address } from "@web3-ui/components";
import { useWallet } from "@web3-ui/hooks";
function SignInInputs() {
  const { player, setPlayer, game, setGame } = useContext(GameContext);
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const { connection, connected, connectWallet, disconnectWallet } =
    useWallet();

  useEffect(() => {
    if (connected) {
      setPlayer(connection.ens || connection.userAddress);
    }
  }, [connected, connection, setPlayer]);

  function handleRoom(e) {
    setRoom(e.target.value);
    setGame({ ...game, currentRoom: e.target.value });
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    setGame({ ...game, password: e.target.value });
  }

  return (
    <>
      <Address value={player} />

      <label id="bottom-label" className="text-2xl">
        *required
      </label>

      <input
        className="sign-in-input"
        id="enter-room"
        value={room}
        onChange={handleRoom}
        placeholder="Enter room"
      />
      {!game.public && (
        <>
          <label id="password-label">*required</label>
          <input
            className="sign-in-input"
            type="password"
            autocomplete="off"
            id="room-password"
            value={password}
            onChange={handlePassword}
            placeholder="Enter password"
          />
        </>
      )}
      {!connected ? (
        <div className="sign-in-rules rules p-10" onClick={connectWallet}>
          Connect wallet
        </div>
      ) : (
        <div className="sign-in-rules rules p-10" onClick={disconnectWallet}>
          Disconnect wallet
        </div>
      )}
    </>
  );
}

export default SignInInputs;
