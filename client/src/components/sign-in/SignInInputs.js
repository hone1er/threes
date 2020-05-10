import React, { useState, useContext } from "react";
import { GameContext } from "../GameProvider";

function SignInInputs() {
  const { player, setPlayer, game, setGame } = useContext(GameContext);

  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");

  function handleUser(e) {
    setPlayer({e.target.value});
  }
  function handleRoom(e) {
    setRoom(e.target.value);
    setGame({ ...game, currentRoom: e.target.value });
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    setGame({ ...game, password: e.target.value });
  }

  const passwordInput = game.public ? null : (
    <>
    <label id="password-label">*required</label>
    <input
      className="sign-in-input"
      autocomplete="off"
      type="password"
      id="room-password"
      value={Array(password.length).fill("*").join("")}
      onChange={handlePassword}
      placeholder="Enter password"
    />
    </>
  );
  return (
    <>
        <label id="top-label">*required</label>
      <input
        className="sign-in-input"
        value={player}
        onChange={handleUser}
        placeholder="Enter your username"
        />
        <label id="bottom-label">*required</label>

      <input
        className="sign-in-input"
        id="enter-room"
        value={room}
        onChange={handleRoom}
        placeholder="Enter room"
      />
      {passwordInput}
    </>
  );
}

export default SignInInputs;
