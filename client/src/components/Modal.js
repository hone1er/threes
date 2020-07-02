import React, { useState } from "react";
import { ModalDiv } from "../styledComponents/ModalDiv";
import { PrimaryBtn } from "../styledComponents/PrimaryBtn";
import rules from "../styledComponents/images/rules(1).jpg";

export default function Modal(props) {
  const [modalState, setModalState] = useState(true);
  // Get the modal
  var modal = document.getElementById("rulesModal");
  // When the user clicks on the button, open the modal
  function handleButtonClick() {
    setModalState(!modalState);
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      setModalState(!modalState);
    }
  };

  function handleRulesEnter(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("myBtn").click();
    }
  }
  return (
    <ModalDiv className={props.class} modal={modalState}>
      <PrimaryBtn
        className="rules sign-in-button"
        onClick={handleButtonClick}
        id="myBtn"
        tabIndex="0"
        onKeyUp={handleRulesEnter}
      >
        Rules
      </PrimaryBtn>

      <div id="rulesModal" className="modal">
        <div className="modal-content">
          <span onClick={handleButtonClick} className="close">
            &times;
          </span>
          <img src={rules} alt="rules" />
          <ul>
            <li>This is a turn based game</li>
            <li>Lowest score at the end of the game wins</li>
            <li>Each player will start their turn with 5 dice</li>
            <li>Player will roll the dice up to 5 times</li>
            <li>
              After each roll, the player must pick up at least 1 die but may
              pick up more if they choose
            </li>
            <li>
              Player will continue to roll and pick up dice until all dice have
              been taken
            </li>
            <li>
              When chosen, each die adds its face value to the current players
              score, except 3, 3 adds 0 to the score
            </li>
          </ul>
        </div>
      </div>
    </ModalDiv>
  );
}
