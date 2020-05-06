import React, { useContext, useState } from "react";
import { GameContext } from "./GameProvider";
import { SignInDiv } from "./styledComponents/SignInDiv";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { PrimaryBtn } from "./styledComponents/PrimaryBtn";

export default function SignIn() {
  const { sock, player, setPlayer, game } = useContext(GameContext);
  const [room, setRoom] = useState("");
  const [roomList, setRoomList] = useState({});

  function handleUser(e) {
    setPlayer(e.target.value);
  }
  function handleRoom(e) {
    setRoom(e.target.value);
  }

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
    localStorage.setItem("player", JSON.stringify(player));
    sock.emit("joinRoom", { room: room, player: player });
  }

  function handleNewRoom() {
    sock.emit("newRoom", { room: room, player: player });
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

  let taken = checkNameTaken();
  let roomTaken = checkRoomTaken();

  sock.on("setRooms", (rooms) => {
    setRoomList(rooms);
  });

  return (
    <SignInDiv player={player}>
      <input
      className="sign-in-input"
        value={player}
        onChange={handleUser}
        placeholder="Enter your username"
      />
      <input
      className="sign-in-input"
        id="enter-room"
        value={room}
        onChange={handleRoom}
        placeholder="Enter room"
      />
      <div className="sign-in-buttons">
      <Link
        to={taken ? "/" : !roomTaken ? "/" : "/game"}
        id="join"
        onClick={
          taken ? userNameTaken : !roomTaken ? roomDoesNotExist : handleJoinRoom
        }
        className="sign-in-button"
      >
        <PrimaryBtn  className="sign-in-button">Join Game</PrimaryBtn>
      </Link>
      <Link
        to={roomTaken || taken ? "/" : "/game"}
        id="new"
        onClick={taken ? userNameTaken : roomTaken ? roomNameTaken : handleNewRoom}
        className="sign-in-button"
      >
        <PrimaryBtn  className="sign-in-button">New Game</PrimaryBtn>
      </Link>
      <Modal className="sign-in-button" />
      </div>
    </SignInDiv>
  );
}
