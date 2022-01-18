import React, { useContext, useEffect, useState } from "react";
import { abi } from "./DiceGame.json";
import { Button } from "../styledComponents/Button";
import diceAudio from "../audio/diceSound.mp3";
import BetInput from "./BetInput";
import { GameContext } from "./GameProvider";
import { useContract } from "@web3-ui/hooks";
var audio = new Audio(diceAudio);
export default function RollDice({
  setClientGame,
  handleReset,
  sock,
  player,
  bet,
  setBet,
  betPlaced,
  setBetPlaced,
  clientScore,
  setClientScore,
}) {
  const { game, loading, setLoading, etherscan, setEtherscan } =
    useContext(GameContext);
  const [roomId, setRoomId] = useState();
  const contract = useContract(
    "0xd5626c12DA885C44E5780296f56cd0B46F7812a8",
    abi
  );

  let overrides = {
    value: String(bet), // ether in this case MUST be a string
  };
  useEffect(() => {
    async function checkBet() {
      if (contract.checkBet === undefined) return;
      try {
        if (!roomId) {
          const roomIdx = await contract.getGameId(game.currentRoom);
          setRoomId(roomIdx);
        }
        const currentBet = await contract.checkBet(roomId);
        console.log(currentBet);
      } catch (error) {
        console.log(error);
      }
    }
    checkBet();
    // eslint-disable-next-line
  }, [contract]);

  // handles the sending score
  useEffect(() => {
    async function sendScore() {
      try {
        const scoreTxn = await contract.setScore(
          roomId,
          game.scores[game.currentPlayer]
        );

        setLoading(true);
        setEtherscan("https://ropsten.etherscan.io/tx/" + scoreTxn.hash);
        setClientScore(game.scores[game.currentPlayer]);
        await scoreTxn.wait();
        setClientScore(null);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (game.playerTurns <= 0 && game.currentPlayer < game.names.length) {
      sendScore();
      setBet(0);
    }
    // eslint-disable-next-line
  }, [game]);

  async function handleSendBet() {
    const betTxn = await contract.placeBet(overrides);
    setLoading(true);
    setEtherscan("https://ropsten.etherscan.io/tx/" + betTxn.hash);
    await betTxn.wait();
    setLoading(false);
    setBetPlaced(true);
    setBet(0);
  }

  function handleRoll() {
    if (!betPlaced) return;
    audio.play();
    let value = [Array(5).fill(null)];

    for (let i = 0; i < game.diceValues.length; i++) {
      value[i] = Math.ceil(Math.random() * 6);
      setClientGame({
        ...game,
        diceValues: value,
        rollDisabled: true,
        diceDisabled: false,
        rolling: !game.rolling,
      });
    }
    setClientGame({
      ...game,
      diceValues: value,
      rollDisabled: true,
      diceDisabled: false,
      rolling: !game.rolling,
    });
    sock.emit("rollDice", {
      ...game,
      diceValues: value,
      rollDisabled: true,
      diceDisabled: false,
      rolling: !game.rolling,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      let el = document.getElementsByClassName("dice");
      for (let i = 0; i < el.length; i++) {
        el[i].classList.remove("rolling");
      }
    }, 500);
    return () => {
      setTimeout(() => {
        let el = document.getElementsByClassName("dice");
        for (let i = 0; i < el.length; i++) {
          el[i].classList.add("rolling");
        }
      }, 0);
      return;
    };
  }, [game.rolling]);

  function openEtherscan() {
    window.open(etherscan);
  }

  return (
    <div className="roll-area">
      <BetInput bet={bet} setBet={setBet} />
      {!betPlaced ? (
        bet <= 0 ? (
          <Button onClick={handleSendBet} disabled={true}>
            Enter bet{" "}
            <span role="img" aria-label="up emoji">
              👆
            </span>
          </Button>
        ) : !loading ? (
          <Button onClick={handleSendBet}>Place Bet</Button>
        ) : (
          <Button onClick={openEtherscan}>Placing Bet...</Button>
        )
      ) : (
        <Button
          disabled={
            player !== game.names[game.currentPlayer] ? true : game.rollDisabled
          }
          onClick={handleRoll}
        >
          {game.gameOver || !game.names[game.currentPlayer]
            ? "game over "
            : game.names[game.currentPlayer] !== player
            ? `${
                game.names[game.currentPlayer].length > 12
                  ? String(game.names[game.currentPlayer]).substring(0, 4) +
                    "..." +
                    String(game.names[game.currentPlayer]).substring(38)
                  : game.names[game.currentPlayer]
              }'s turn`
            : "roll the dice"}
        </Button>
      )}
      <Button reset={!game.gameOver} onClick={handleReset}>
        reset game
      </Button>
    </div>
  );
}
