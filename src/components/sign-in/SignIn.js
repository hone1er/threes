import Modal from "../Modal";
import Radios from "./Radios";
import { abi } from "../DiceGame.json";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import SignInInputs from "./SignInInputs";
import { GameContext } from "../GameProvider";
import { Address } from "@web3-ui/components";
import { contractAddress } from "../../constants";
import { useWallet, useContract } from "@web3-ui/hooks";
import { SignInDiv } from "../../styledComponents/SignInDiv";
import React, { useContext, useEffect, useState } from "react";
import { PrimaryBtn } from "../../styledComponents/PrimaryBtn";
export default function SignIn() {
  const {
    game,
    sock,
    roomName,
    player,
    loading,
    setRoomName,
    etherscan,
    setPlayer,
    setLoading,
    setEtherscan,
    setClientGame,
  } = useContext(GameContext);
  const { connection, connected, connectWallet, disconnectWallet } =
    useWallet();
  const [contract, isReady] = useContract(contractAddress, abi);
  const [signed, setSigned] = useState(true);

  const room = game.currentRoom;
  useEffect(() => {
    if (connected) {
      setPlayer(connection.ens || connection.userAddress);
    } else {
      setPlayer("");
    }
  }, [connected, connection, setPlayer]);

  async function handleJoinRoom() {
    if (game.password === room) {
      alert(`Password cannot be the same as the room name`);
      return;
    }
    const roomId = await contract.getGameId(room);
    const joinGameTxn = await contract.joinGame(roomId);

    console.log("Mining...", joinGameTxn.hash);
    setEtherscan("https://ropsten.etherscan.io/tx/" + joinGameTxn.hash);
    setLoading(true);

    await joinGameTxn.wait();
    console.log("Mined -- ", loading, " ", joinGameTxn.hash);
    setLoading(false);
    setRoomName(room);
    sock.emit("joinRoom", {
      room: room,
      player: player,
      publicStatus: game.public,
      password: game.password,
    });
    localStorage.setItem("player", JSON.stringify(player));
  }

  async function handleNewRoom() {
    if (game.password === room) {
      alert(`Password cannot be the same as the room name`);
      return;
    }

    const approveNewGameTxn = await contract.newGame();
    setLoading(true);
    console.log("Mining...", approveNewGameTxn.hash);
    setEtherscan(
      "https://ropsten.etherscan.io/tx/" + String(approveNewGameTxn.hash)
    );
    await approveNewGameTxn.wait();
    console.log("Mined -- ", !loading, " ", approveNewGameTxn.hash);

    const setNewGameTxn = await contract.setGame(room);
    console.log("Mining...", setNewGameTxn.hash);
    setEtherscan(
      "https://ropsten.etherscan.io/tx/" + String(setNewGameTxn.hash)
    );
    setSigned(false);

    await setNewGameTxn.wait();
    console.log("Mined -- ", !loading, " ", setNewGameTxn.hash);
    setSigned(true);
    setLoading(false);
    setRoomName(room);

    sock.emit("newRoom", {
      room: room,
      player: player,
      publicStatus: game.public,
      password: game.password,
    });
    let tempGame = game;
    tempGame.names.push(player);
    tempGame.scores.push(0);
    tempGame.currentRoom = room;
    localStorage.setItem("player", JSON.stringify(player));
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
    window.open(etherscan, "_blank");
  }

  return (
    <SignInDiv player={player} room={room}>
      {!connected ? (
        <PrimaryBtn>
          <Button onClick={connectWallet}>Connect wallet</Button>
        </PrimaryBtn>
      ) : (
        <>
          <div className="addy-wrap">
            <Address value={player} shortened />
          </div>
          <PrimaryBtn className="etherscan">
            <Button onClick={disconnectWallet}>Disconnect wallet</Button>
          </PrimaryBtn>
        </>
      )}

      {loading ? (
        signed ? (
          <PrimaryBtn className="etherscan">
            <Button onClick={openEtherscan}>Pending...</Button>
          </PrimaryBtn>
        ) : (
          <PrimaryBtn className="etherscan">
            <Button onClick={openEtherscan}>Creating game...</Button>
          </PrimaryBtn>
        )
      ) : (
        <PrimaryBtn className="etherscan">
          <Button onClick={openEtherscan}>Etherscan</Button>
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
      <div className="sign-in-buttons">
        <PrimaryBtn
          className="sign-in-button"
          onClick={handleJoinRoom}
          onKeyUp={handleJoinEnter}
          tabIndex="0"
        >
          Join Game
        </PrimaryBtn>

        <PrimaryBtn
          className="sign-in-button"
          onClick={handleNewRoom}
          onKeyUp={handleNewEnter}
          tabIndex="0"
        >
          New Game
        </PrimaryBtn>
        <Modal class="sign-in-rules modal-area" />
      </div>
      <Link to="/game" id="join" className="sign-in-button"></Link>
      <Link to="/game" id="new" className="sign-in-button"></Link>
    </SignInDiv>
  );
}
