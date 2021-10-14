import React, { useState, useContext } from "react";
import { GameContext } from "../GameProvider";
function SignInInputs() {
  const { player, setPlayer, game, setGame } = useContext(GameContext);
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");

  function handleUser(e) {
    setPlayer(e.target.value);
  }
  function handleRoom(e) {
    setRoom(e.target.value);
    setGame({ ...game, currentRoom: e.target.value });
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    setGame({ ...game, password: e.target.value });
  }

  const metamask = async () => {
    if (window.ethereum) { //check if Metamask is installed
          try {
              const address = await window.ethereum.enable(); //connect Metamask
              const obj = {
                      connectedStatus: true,
                      status: "",
                      address: address
                  }
                  setPlayer(obj.address[0])
                  return obj;
               
          } catch (error) {
              return {
                  connectedStatus: false,
                  status: "🦊 Connect to Metamask using the button on the top right."
              }
          }
          
    } else {
          return {
              connectedStatus: false,
              status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
          }
        } 
  };

  const passwordInput = game.public ? null : (
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
      <button onClick={metamask}>Login with metamask</button>
    </>
  );
}

export default SignInInputs;
