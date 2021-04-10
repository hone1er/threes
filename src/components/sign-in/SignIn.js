import React, { useContext } from "react";
import { GameContext } from "../GameProvider";
import { SignInDiv } from "../../styledComponents/SignInDiv";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { PrimaryBtn } from "../../styledComponents/PrimaryBtn";
import Radios from "./Radios";
import SignInInputs from "./SignInInputs";


export default function SignIn() {
  const { sock, player, game } = useContext(GameContext);
  const room = game.currentRoom;

  function handleJoinRoom() {
    if (game.password === room) {
      alert(`Password cannot be the same as the room name`);
      return;
    }
    sock.emit("joinRoom", {
      room: room,
      player: player,
      publicStatus: game.public,
      password: game.password,
    });
    localStorage.setItem("player", JSON.stringify(player));
  }

  function handleNewRoom() {
    if (game.password === room) {
      alert(`Password cannot be the same as the room name`);
      return;
    }
    sock.emit("newRoom", {
      room: room,
      player: player,
      publicStatus: game.public,
      password: game.password,
    });
    let tempGame = game;
    tempGame.names.push(player);
    tempGame.scores.push(0);
    localStorage.setItem("player", JSON.stringify(player));

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('/createuser', { username: "hone", password: "pass", email: "penalcodehone@gmail.com" })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }

  function handleJoinEnter(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleJoinRoom();
    }
  }
  function handleNewEnter(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleNewRoom();
    }
  }

  return (
    <SignInDiv player={player} room={room}>
      <SignInInputs />
      <Radios />
      <div className="sign-in-buttons">
        <PrimaryBtn
          className="sign-in-button"
          onClick={handleJoinRoom}
          onKeyUp={handleJoinEnter}
          tabIndex="0"
        >
          Join Game
        </PrimaryBtn>

        <PrimaryBtn
          className="sign-in-button"
          onClick={handleNewRoom}
          onKeyUp={handleNewEnter}
          tabIndex="0"
        >
          New Game
        </PrimaryBtn>
        <Modal class="sign-in-rules modal-area" />
      </div>
      <Link to="/game" id="join" className="sign-in-button"></Link>
      <Link to="/game" id="new" className="sign-in-button"></Link>
    </SignInDiv>
  );
}
