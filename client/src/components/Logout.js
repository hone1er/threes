import React, { useContext } from "react";
import { PrimaryBtn } from "./styledComponents/PrimaryBtn";
import { GameContext } from "./GameProvider";
import { Link } from "react-router-dom";
export default function Logout() {
  const { sock, player } = useContext(GameContext);
  function handleLogout() {
    sock.emit("disconnect", player);
  }
  return (
    <div>
      <PrimaryBtn onClick={handleLogout}>
        <Link to="/">Logout</Link>
      </PrimaryBtn>
    </div>
  );
}
