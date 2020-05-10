import React, { useContext } from "react";
import { GameContext } from "../GameProvider";
import { SignInDiv } from "../styledComponents/SignInDiv";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { PrimaryBtn } from "../styledComponents/PrimaryBtn";
import Radios from "./Radios";
import SignInInputs from "./SignInInputs";

export default function SignIn() {
  const { sock, player, game } = useContext(GameContext);
  const room = game.currentRoom;


  function handleJoinRoom() {
    if (game.password === room) {
      alert(`Password cannot be the same as the room name`);
      return
    }
      sock.emit("joinRoom", {
        room: room,
        player: player,
        publicStatus: game.public,
        password: game.password,
      })
      localStorage.setItem("player", JSON.stringify(player));
 
    }


  

  function handleNewRoom() {
    if (game.password === room) {
      alert(`Password cannot be the same as the room name`);
      return
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
  }

 

  return (
    <SignInDiv player={player} room={room}>
      <SignInInputs />
      <Radios />
      <div className="sign-in-buttons">
        <Link
         to="/game"  
          id="join"
          
          className="sign-in-button"
        >
        </Link>
          <PrimaryBtn className="sign-in-button" onClick={handleJoinRoom}>Join Game</PrimaryBtn>
        <Link
          to="/game"
          id="new"
          
          className="sign-in-button"
        >
        </Link>
          <PrimaryBtn className="sign-in-button" onClick={handleNewRoom}>New Game</PrimaryBtn>
        <Modal class="sign-in-rules modal-area" />
      </div>
    </SignInDiv>
  );
}
