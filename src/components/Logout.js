import React from "react";
import { PrimaryBtn } from "../styledComponents/PrimaryBtn";
import { LogoutDiv } from "../styledComponents/LogoutDiv";
export default function Logout({ disconnectWallet }) {
  return (
    <LogoutDiv className="logout-area">
      <a href="/">
        <PrimaryBtn onClick={disconnectWallet} id="logout">
          Leave Room
        </PrimaryBtn>
      </a>
    </LogoutDiv>
  );
}
