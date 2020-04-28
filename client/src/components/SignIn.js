import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "./GameProvider";
import { SignInDiv } from "./styledComponents/SignInDiv";
export default function SignIn() {
  const { sock, player, setPlayer, game, setGame } = useContext(GameContext);

  function handleUser(e) {
    setPlayer(e.target.value);
  }
  function nameTaken() {
      return (
      game.names.filter((name) => name === player)
        .length > 0
    );
}

  function sendUser() {
    let tempGame = game;
    tempGame.names.push(player);
    tempGame.scores.push(0);
    setGame(tempGame)
    sock.emit("addUser", player);
    localStorage.setItem("player", JSON.stringify(player));
  }

  function alertUser() {
    alert(`${player} is taken`);
  }

  let taken = nameTaken();
  return (
    <SignInDiv>
      <h1>Let's play 3's!</h1>
      <input
        value={player}
        onChange={handleUser}
        placeholder="Enter your username"
      />

      <Link
        disabled="true"
        to={"/game"}
        onClick={taken ? alertUser : sendUser}
      >
        Join Game
      </Link>
      <Link to="/game">Specate</Link>
    </SignInDiv>
  );
}
