import React, { useState } from "react";
function SignInInputs({ game, setClientGame }) {
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
        value={room}
        id="enter-room"
        onChange={handleRoom}
        placeholder="Enter room"
        className="sign-in-input"
      />
      {game && !game.public && (
        <>
          <label id="password-label">*required</label>
          <input
            type="password"
            value={password}
            autocomplete="off"
            id="room-password"
            onChange={handlePassword}
            className="sign-in-input"
            placeholder="Enter password"
          />
        </>
      )}
    </>
  );
}

export default SignInInputs;
