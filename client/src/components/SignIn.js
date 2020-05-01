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

  function handleEnterKey(event) {
    if (event.keyCode === 13 && player !== "") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("join").click();
    }
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
    <SignInDiv player={player}>
      <input
        value={player}
        onChange={handleUser}
        placeholder="Enter your username"
        onKeyUp={handleEnterKey}
      />
      <Link to={taken ? "/" : "/game"} id="join" onClick={taken ? alertUser : sendUser}>
      <PrimaryBtn>
        Join Game
      </PrimaryBtn>
      </Link>
      <Modal />
    </SignInDiv>
  );
}
