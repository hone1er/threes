import React from "react";
import "./App.css";
import { ScoreBoard } from "./components/ScoreBoard";
import Winner from "./components/Winner";
import Dice from "./components/Dice";
import RollDice from "./components/RollDice";
import "react-dice-complete/dist/react-dice-complete.css";
import Chat from "./components/Chat";
import Logout from "./components/Logout";
import Modal from "./components/Modal";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Logout />
      <ScoreBoard />
      <Winner />
      <Dice />
      <RollDice />
      <Chat />
      <Modal class="game-room-rules modal-area" />
    </div>
  );
}

export default App;
