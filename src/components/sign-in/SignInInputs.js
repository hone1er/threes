import React, { useState } from "react";
function SignInInputs({
  player,
  setPlayer,
  game,
  setClientGame,
  connection,
  connected,
  connectWallet,
  disconnectWallet,
}) {
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");

  function handleRoom(e) {
    setRoom(e.target.value);
    setClientGame({ ...game, currentRoom: e.target.value });
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    setClientGame({ ...game, password: e.target.value });
  }

  return (
    <>
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
      {game && !game.public && (
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
    </>
  );
}

export default SignInInputs;
