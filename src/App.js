import "./App.css";
import "./index.css";
import Chat from "./components/Chat";
import Dice from "./components/Dice";
import Modal from "./components/Modal";
import Logout from "./components/Logout";
import Winner from "./components/Winner";
import React, { useContext } from "react";
import { useWallet } from "@web3-ui/hooks";
import RollDice from "./components/RollDice";
import { ScoreBoard } from "./components/ScoreBoard";
import { GameContext } from "./components/GameProvider";
import "react-dice-complete/dist/react-dice-complete.css";

function App() {
  const {
    bet,
    game,
    sock,
    index,
    player,
    setBet,
    betPlaced,
    handleReset,
    handleScore,
    clientScore,
    setBetPlaced,
    setClientGame,
    setClientScore,
  } = useContext(GameContext);

  const { connection, disconnectWallet } = useWallet();

  return (
    <div className="App">
      <Logout disconnectWallet={disconnectWallet} />
      <ScoreBoard game={game} player={player} />
      <Winner game={game} />
      <Dice game={game} handleScore={handleScore} player={player} />
      <RollDice
        bet={bet}
        game={game}
        sock={sock}
        setBet={setBet}
        player={player}
        betPlaced={betPlaced}
        handleReset={handleReset}
        clientScore={clientScore}
        setBetPlaced={setBetPlaced}
        setClientGame={setClientGame}
        setClientScore={setClientScore}
      />
      <Chat
        gifs
        sound
        game={game}
        sock={sock}
        index={index}
        connection={connection}
      />
      <Modal class="game-room-rules modal-area" />
    </div>
  );
}

export default App;
