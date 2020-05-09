import React from "react";
import "./App.scss";
import { ScoreBoard } from "./components/ScoreBoard";
import CurrentPlayer from "./components/CurrentPlayer";
import Dice from "./components/Dice";
import RollDice from "./components/RollDice";
import "react-dice-complete/dist/react-dice-complete.css";
import Chat from "./components/Chat";
import Modal from "./components/Modal";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <Logout />
      <ScoreBoard />
      <CurrentPlayer />
      <Dice />
      <RollDice />
      <Chat />
      <Modal class="game-room-rules modal-area" />
    </div>
  );
}

export default App;
