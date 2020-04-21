import React from "react";
import "./App.css";
import { ScoreBoard } from "./components/ScoreBoard";
import CurrentPlayer from "./components/CurrentPlayer";
import Dice from "./components/Dice";
import RollDice from "./components/RollDice";
import 'react-dice-complete/dist/react-dice-complete.css'
// import Chat from "./components/Chat";
// import TestApp from "./TestApp";
function App() {
  
  return (
    <div className="App">
      <ScoreBoard />
      <Dice />
        {/* <TestApp/> */}
      <RollDice />
      <CurrentPlayer />
      {/* <Chat/> */}
    </div>
  );
}

export default App;
