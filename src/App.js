import React, { useContext } from "react";
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
  const { sock, game, handleScore, player, setGame, handleReset } =
    useContext(GameContext);

  const { connection, disconnectWallet } = useWallet();
  return (
    <div className="App">
      <Logout disconnectWallet={disconnectWallet} />
      <ScoreBoard game={game} player={player} />
      <Winner game={game} />
      <Dice game={game} handleScore={handleScore} player={player} />
      <RollDice
        game={game}
        setGame={setGame}
        handleReset={handleReset}
        sock={sock}
        player={player}
      />
      <Chat sock={sock} connection={connection} gifs sound />
      <Modal class="game-room-rules modal-area" />
    </div>
  );
}

export default App;
