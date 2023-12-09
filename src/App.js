import './App.css';
import './index.css';
import Chat from './components/Chat';
import Dice from './components/Dice';
import Modal from './components/Modal';
import Logout from './components/Logout';
import Winner from './components/Winner';
import React, { useContext } from 'react';
import { useWallet } from '@web3-ui/hooks';
import RollDice from './components/RollDice';
import { ScoreBoard } from './components/ScoreBoard';
import { GameContext } from './components/GameProvider';
import 'react-dice-complete/dist/react-dice-complete.css';
import { PrimaryBtn } from './styledComponents/PrimaryBtn';

function App() {
  const { game, sock, index, player, handleScore } = useContext(GameContext);

  const { connection, disconnectWallet, provider } = useWallet();

  return (
    <div className='App'>
      <Logout disconnectWallet={disconnectWallet} />
      <ScoreBoard game={game} player={player} />
      <Winner game={game} />
      <Dice game={game} handleScore={handleScore} player={player} />
      <RollDice provider={provider} />
      <Chat
        gifs
        sound
        game={game}
        sock={sock}
        index={index}
        connection={connection}
      />
      <PrimaryBtn>
        <Modal class='game-room-rules modal-area' />
      </PrimaryBtn>
    </div>
  );
}

export default App;
