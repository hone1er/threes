import React from "react";
import { DieDiv } from "../styledComponents/DieDiv";

function Die({ id, disabled, diePosition, onClick, dieImg }) {
  return (
    <DieDiv
      id={id}
      disabled={disabled}
      className="dice"
      diePosition={diePosition}
      onClick={onClick}
    >
      <img src={dieImg} alt="dice" />
    </DieDiv>
  );
}

export default Die;
