import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { SignInDiv } from "./styledComponents/SignInDiv";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { PrimaryBtn } from "./styledComponents/PrimaryBtn";
export default function SignIn() {
  const { sock, player, setPlayer, game, setGame } = useContext(GameContext);

  function handleUser(e) {
    setPlayer(e.target.value);
  }

  function nameTaken() {
    return game.names.filter((name) => name === player).length > 0;
  }

  function sendUser() {
    let tempGame = game;
    tempGame.names.push(player);
    tempGame.scores.push(0);
    setGame(tempGame);
    sock.emit("addUser", player);
    localStorage.setItem("player", JSON.stringify(player));
  }
  function alertUser() {
    alert(`${player} is taken`);
  }

  let taken = nameTaken();
  return (
    <SignInDiv>
      <input
        value={player}
        onChange={handleUser}
        placeholder="Enter your username"
      />
      <Link disabled="true" to={"/game"} onClick={taken ? alertUser : sendUser}>
      <PrimaryBtn>
        Join Game
      </PrimaryBtn>
      </Link>
      <Modal />
    </SignInDiv>
  );
}
