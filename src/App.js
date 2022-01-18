import React, { useContext, useState } from "react";
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
import { useWallet } from "@web3-ui/hooks";
import { GameContext } from "./components/GameProvider";
function App() {
  const {
    sock,
    game,
    handleScore,
    player,
    setClientGame,
    clientScore,
    setClientScore,
    handleReset,
    index,
    bet,
    setBet,
  } = useContext(GameContext);

  const { connection, disconnectWallet } = useWallet();
  const [betPlaced, setBetPlaced] = useState(false);

  return (
    <div className="App">
      <Logout disconnectWallet={disconnectWallet} />
      <ScoreBoard game={game} player={player} />
      <Winner game={game} />
      <Dice game={game} handleScore={handleScore} player={player} />
      <RollDice
        game={game}
        setClientGame={setClientGame}
        handleReset={handleReset}
        sock={sock}
        player={player}
        bet={bet}
        setBet={setBet}
        betPlaced={betPlaced}
        setBetPlaced={setBetPlaced}
        clientScore={clientScore}
        setClientScore={setClientScore}
      />
      <Chat
        sock={sock}
        connection={connection}
        game={game}
        index={index}
        gifs
        sound
      />
      <Modal class="game-room-rules modal-area" />
    </div>
  );
}

export default App;
