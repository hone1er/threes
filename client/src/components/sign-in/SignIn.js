import React, { useContext, useState } from "react";
import { GameContext } from "../GameProvider";
import { SignInDiv } from "../styledComponents/SignInDiv";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { PrimaryBtn } from "../styledComponents/PrimaryBtn";
import Radios from "./Radios";
import SignInInputs from "./SignInInputs";

export default function SignIn() {
  const { sock, player, game } = useContext(GameContext);
  const [roomList, setRoomList] = useState({});
  const room = game.currentRoom;

  function checkNameTaken() {
    if (roomList[room]) {
      return roomList[room].names.includes(player);
    } else {
      return false;
    }
  }

  function checkRoomTaken() {
    return Object.keys(roomList).filter((rom) => rom === room).length > 0;
  }

  function handleJoinRoom() {
    if (
      game.password === roomList[game.currentRoom].password &&
      game.public === roomList[game.currentRoom].public
    ) {
      sock.emit("joinRoom", {
        room: room,
        player: player,
        publicStatus: game.public,
        password: game.password,
      });
      localStorage.setItem("player", JSON.stringify(player));
    } else {
      alert(
        `${game.currentRoom} is set to private. Please select the private option and input the correct password`
      );
    }
  }

  function handleNewRoom() {
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

  function roomNameTaken() {
    alert(
      `The room '${room}' has already been created. Join the room or start a new one with a different name`
    );
  }
  function userNameTaken() {
    alert(`A player in ${room} has already used the name: ${player}`);
  }
  function roomDoesNotExist() {
    alert(
      `There is no room: '${room}'. Check the name and try again, or create a new room`
    );
  }

  const taken = checkNameTaken();
  const roomTaken = checkRoomTaken();
  const passwordCorrect = roomList[game.currentRoom]
    ? game.password === roomList[game.currentRoom].password
    : false;
  const publicRoomRadio = roomList[game.currentRoom]
    ? game.public === roomList[game.currentRoom].public
    : false;

  sock.on("setRooms", (rooms) => {
    setRoomList(rooms);
  });

  return (
    <SignInDiv player={player}>
      <SignInInputs />
      <Radios />
      <div className="sign-in-buttons">
        <Link
          to={
            taken
              ? "/"
              : !roomTaken || !passwordCorrect || !publicRoomRadio
              ? "/"
              : "/game"
          }
          id="join"
          onClick={
            taken
              ? userNameTaken
              : !roomTaken
              ? roomDoesNotExist
              : handleJoinRoom
          }
          className="sign-in-button"
        >
          <PrimaryBtn className="sign-in-button">Join Game</PrimaryBtn>
        </Link>
        <Link
          to={roomTaken || taken ? "/" : "/game"}
          id="new"
          onClick={
            taken ? userNameTaken : roomTaken ? roomNameTaken : handleNewRoom
          }
          className="sign-in-button"
        >
          <PrimaryBtn className="sign-in-button">New Game</PrimaryBtn>
        </Link>
        <Modal class="sign-in-rules modal-area" />
      </div>
    </SignInDiv>
  );
}
