import ReactGA from "react-ga";
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

ReactGA.initialize("UA-146246516-6");
ReactGA.pageview(window.location.pathname + window.location.search);

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
