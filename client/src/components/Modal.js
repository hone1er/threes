import React from "react";
import {ModalDiv} from "./styledComponents/ModalDiv"
import { PrimaryBtn } from "./styledComponents/PrimaryBtn";
import rules from "./styledComponents/rules(1).jpg"

export default function Modal() {
    // Get the modal
var modal = document.getElementById("myModal");
// When the user clicks on the button, open the modal
function handleButtonClick() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function handleSpanClick() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
  return (
    <ModalDiv>
      <PrimaryBtn className="rules" onClick={handleButtonClick} id="myBtn">Rules</PrimaryBtn>

      <div id="myModal" class="modal">
        <div className="modal-content">
          <span onClick={handleSpanClick} class="close">&times;</span>
          <img src={rules} alt="rules"/>
          <ul>
              <li>This is a turn based game</li>
              <li>Lowest score at the end of the game wins</li>
              <li>Each player will start their turn with 5 dice</li>
              <li>Player will roll the dice up to 5 times</li>
              <li>After each roll, the player must pick up at least 1 die but may pick up more if they choose</li>
              <li>Player will continue to roll and pick up dice until all dice have been taken</li>
              <li>When chosen, each die adds its face value to the current players score, except 3, 3 adds 0 to the score</li>
          </ul>
        </div>
      </div>
    </ModalDiv>
  );
}
