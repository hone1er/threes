import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "./components/GameProvider";

export default function SignIn() {
  const { sock, player, setPlayer, game } = useContext(GameContext);

  function handleUser(e) {
    setPlayer(e.target.value);
  }
 function nameTaken(){
   return game.names.filter(name => name.toLowerCase() === player.toLowerCase()).length > 0;
 }
 
  function sendUser() {
    sock.emit("addUser", player);
    localStorage.setItem("player", JSON.stringify(player));
  }

  function alertUser() {
    alert(`${player} is taken`);
  }

  let taken = nameTaken();
  return (
    <div>
      <h1>Please select a username</h1>
      <input value={player} onChange={handleUser} />

      <Link disabled="true" to={taken ? "/" : "/game"} onClick={taken ? alertUser : sendUser}>
        Join Game
      </Link>
    </div>
  );
}
