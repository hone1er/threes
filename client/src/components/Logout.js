import React, { useContext } from "react";
import { PrimaryBtn } from "./styledComponents/PrimaryBtn";
import { GameContext } from "./GameProvider";
import { LogoutDiv } from "./styledComponents/LogoutDiv";
export default function Logout() {
  const { sock, player } = useContext(GameContext);
  function handleLogout() {
    sock.emit("disconnect", player);

  }
  return (
    <LogoutDiv>
        <a href="/">
      <PrimaryBtn id="logout" onClick={handleLogout}>
        Logout
      </PrimaryBtn>
      </a>
    </LogoutDiv>
  );
}
