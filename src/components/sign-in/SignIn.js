import Modal from '../Modal';
import Radios from './Radios';
import { abi } from '../DiceGame.json';
import { Link } from 'react-router-dom';
import SignInInputs from './SignInInputs';
import { GameContext } from '../GameProvider';
import { Address } from '@web3-ui/components';
import { contractAddress } from '../../constants';
import { useWallet, useContract } from '@web3-ui/hooks';
import { SignInDiv } from '../../styledComponents/SignInDiv';
import React, { useContext, useEffect, useState } from 'react';
import { PrimaryBtn } from '../../styledComponents/PrimaryBtn';
export default function SignIn() {
  const {
    game,
    sock,
    roomName,
    player,
    loading,
    setRoomName,
    setRoomId,
    etherscan,
    setPlayer,
    setLoading,
    setEtherscan,
    setClientGame,
  } = useContext(GameContext);
  console.log('🚀 ~ file: SignIn.js:28 ~ SignIn ~ player:', player);
  const { connection, connected, connectWallet, disconnectWallet } = useWallet({
    connection: {
      network: 11155111,
    },
  });
  const [contract] = useContract(contractAddress, abi);
  const [signed, setSigned] = useState(true);
  const [roomCreator, setRoomCreator] = useState();
  const [allCurrentGames, setAllCurrentGames] = useState();

  const room = game.currentRoom;
  useEffect(() => {
    if (connected) {
      setPlayer(connection.ens || connection.userAddress);
    } else {
      setPlayer('');
    }
  }, [connected, connection, setPlayer]);

  async function handleJoinRoom() {
    // password check
    if (game.password === room) {
      alert(`Password cannot be the same as the room name`);
      return;
    }

    // get room id w/ creator of the room public key ??????????????????????
    try {
      const joinGameTxn = await contract.joinGame(roomCreator);
      console.log('Mining...', joinGameTxn.hash);
      setEtherscan('https://sepolia.etherscan.io/tx/' + joinGameTxn.hash);
      setLoading(true);

      await joinGameTxn.wait();
      console.log('Mined -- ', loading, ' ', joinGameTxn.hash);
      setLoading(false);
      setRoomName(room);
      sock.emit('joinRoom', {
        room: room,
        player: player,
        publicStatus: game.public,
        password: game.password,
      });
      localStorage.setItem('player', JSON.stringify(player));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleNewRoom() {
    if (game.password === room) {
      alert(`Password cannot be the same as the room name`);
      return;
    }

    const approveNewGameTxn = await contract.newGame();
    setLoading(true);
    console.log('Mining...', approveNewGameTxn.hash);
    setEtherscan(
      'https://sepolia.etherscan.io/tx/' + String(approveNewGameTxn.hash)
    );
    await approveNewGameTxn.wait();
    console.log('Mined -- ', !loading, ' ', approveNewGameTxn.hash);

    const setNewGameTxn = await contract.setGame();
    console.log('Mining...', setNewGameTxn.hash);
    setEtherscan(
      'https://sepolia.etherscan.io/tx/' + String(setNewGameTxn.hash)
    );
    setSigned(false);

    await setNewGameTxn.wait();
    console.log('Mined -- ', !loading, ' ', setNewGameTxn.hash);
    setSigned(true);
    setLoading(false);
    setRoomName(room);
    const roomIdx = await contract.getGameId(player);
    setRoomId(parseInt(roomIdx));
    console.log(
      '🚀 ~ file: SignIn.js:107 ~ handleNewRoom ~ roomIdx:',
      parseInt(roomIdx)
    );

    const res = sock.emit('newRoom', {
      room: room,
      player: player,
      publicStatus: game.public,
      password: game.password,
      roomId: parseInt(roomIdx),
    });
    console.log('🚀 ~ file: SignIn.js:119 ~ handleNewRoom ~ res:', res);
    console.log('🚀 ~ file: SignIn.js:116 ~ handleNewRoom ~ : ', {
      room: room,
      player: player,
      publicStatus: game.public,
      password: game.password,
      roomId: parseInt(roomIdx),
    });
    let tempGame = game;
    tempGame.names.push(player);
    tempGame.scores.push(0);
    tempGame.currentRoom = room;
    tempGame.roomId = parseInt(roomIdx);
    localStorage.setItem('player', JSON.stringify(player));
    setClientGame(tempGame);
  }

  function handleJoinEnter(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleJoinRoom();
    }
  }
  function handleNewEnter(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleNewRoom();
    }
  }

  function openEtherscan() {
    window.open(etherscan, '_blank');
  }

  let frontEndRooms = [];

  sock.on('connected', (data) => {
    if (Object.keys(data).length) {
      for (const key in data) {
        const room = data[key];
        frontEndRooms.push({
          roomName: room.currentRoom,
          roomId: room.roomId,
          creator: room.names[0],
        });
      }
    }
    if (frontEndRooms.length) setAllCurrentGames(frontEndRooms);
  });
  return (
    <SignInDiv player={player} room={room}>
      {!connected ? (
        <PrimaryBtn
          onClick={connectWallet}
          fontSize={'16px'}
          justifyContent={'center'}
          alignContent={'center'}
          style={{ marginBottom: '20px', marginTop: '45%' }}
        >
          Connect wallet
        </PrimaryBtn>
      ) : (
        <>
          <div className='addy-wrap'>
            <Address value={player} shortened />
          </div>
          <PrimaryBtn
            onClick={disconnectWallet}
            className='etherscan'
            style={{ 'margin-bottom': '20px' }}
          >
            Disconnect wallet
          </PrimaryBtn>
        </>
      )}

      {loading ? (
        signed ? (
          <PrimaryBtn onClick={openEtherscan} className='etherscan'>
            Pending...
          </PrimaryBtn>
        ) : (
          <PrimaryBtn onClick={openEtherscan} className='etherscan'>
            Creating game...
          </PrimaryBtn>
        )
      ) : (
        <PrimaryBtn onClick={openEtherscan} className='etherscan'>
          Etherscan
        </PrimaryBtn>
      )}
      <SignInInputs
        game={game}
        roomName={roomName}
        player={player}
        setRoomName={setRoomName}
        setPlayer={setPlayer}
        connected={connected}
        connection={connection}
        setClientGame={setClientGame}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />
      <Radios />
      <div className='gameContainer'>
        <h1 className='gameHeader'>Current Games</h1>
        <ul className='gameList'>
          {allCurrentGames &&
            allCurrentGames.map((room, idx) => {
              return (
                <button
                  key={room.roomId}
                  onClick={() => {
                    setRoomCreator(room.creator);
                    setRoomName(room.roomName);
                    setRoomId(parseInt(room.roomId));
                    setClientGame({
                      ...game,
                      currentRoom: room.roomName,
                      currentRoomId: room.roomId,
                    });
                  }}
                >
                  <li key={idx} className='gameItem'>
                    {room.roomName}
                  </li>
                </button>
              );
            })}
        </ul>
      </div>
      <div className='sign-in-buttons'>
        <PrimaryBtn
          onClick={handleJoinRoom}
          onKeyUp={handleJoinEnter}
          tabIndex='0'
        >
          Join Game
        </PrimaryBtn>

        <PrimaryBtn
          onClick={handleNewRoom}
          onKeyUp={handleNewEnter}
          tabIndex='0'
        >
          New Game
        </PrimaryBtn>
        <PrimaryBtn>
          <Modal class='' />
        </PrimaryBtn>
      </div>
      <Link to='/game' id='join' className='sign-in-button'></Link>
      <Link to='/game' id='new' className='sign-in-button'></Link>

      <div className='disclaimer'>
        <p>*this game is currently deployed on the sepolia test network</p>
      </div>
    </SignInDiv>
  );
}
