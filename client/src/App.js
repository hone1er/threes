import React from "react";
import "./App.css";
import { ScoreBoard } from "./components/ScoreBoard";
import CurrentPlayer from "./components/CurrentPlayer";
import Dice from "./components/Dice";
import RollDice from "./components/RollDice";
import "react-dice-complete/dist/react-dice-complete.css";
import Chat from "./components/Chat";
import Modal from "./components/Modal";
import Logout from "./components/Logout";
// import TestApp from "./TestApp";
function App() {
  return (
    <div className="App">
      <Logout/>
      <ScoreBoard />
      <CurrentPlayer />
      <Dice />
      {/* <TestApp/> */}
      <RollDice />
      <Chat />
      <Modal />
    </div>
  );
}

export default App;
