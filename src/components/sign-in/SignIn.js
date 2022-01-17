import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../GameProvider";
import { SignInDiv } from "../../styledComponents/SignInDiv";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { PrimaryBtn } from "../../styledComponents/PrimaryBtn";
import Radios from "./Radios";
import SignInInputs from "./SignInInputs";
import { useContract, useWallet } from "@web3-ui/hooks";
import { abi } from "../DiceGame.json";
import { Button } from "@chakra-ui/react";
import { Address } from "@web3-ui/components";

export default function SignIn() {
  const { sock, player, game, setPlayer, setClientGame } =
    useContext(GameContext);
  const { connection, connected, connectWallet, disconnectWallet } =
    useWallet();
  const [loading, setLoading] = useState(false);
  const [etherscan, setEtherscan] = useState("https://ropsten.etherscan.io/");
  const [signed, setSigned] = useState(true);
  const contract = useContract(
    "0x346A8C192b68963210658A70Becc4AEB88c0258d",
    abi
  );

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
    const roomId = await contract.getGameByRoom(room);
    const joinGameTxn = await contract.joinGame(roomId);

    console.log("Mining...", joinGameTxn.hash);
    setEtherscan("https://ropsten.etherscan.io/tx/" + joinGameTxn.hash);
    setLoading(true);

    await joinGameTxn.wait();
    console.log("Mined -- ", loading, " ", joinGameTxn.hash);
    setLoading(false);
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

    sock.emit("newRoom", {
      room: room,
      player: player,
      publicStatus: game.public,
      password: game.password,
    });
    let tempGame = game;
    tempGame.names.push(player);
    tempGame.scores.push(0);
    localStorage.setItem("player", JSON.stringify(player));
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
    window.open(etherscan);
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
            <Button onClick={openEtherscan}>Approval pending...</Button>
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
        player={player}
        setPlayer={setPlayer}
        game={game}
        setClientGame={setClientGame}
        connectWallet={connectWallet}
        connected={connected}
        disconnectWallet={disconnectWallet}
        connection={connection}
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
