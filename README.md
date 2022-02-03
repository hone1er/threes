![web threes](/webthrees.png)

A smart-contract based web3 dice game

Built with:

- [NextJS](https://nextjs.org/docs)
- [NodeJS](https://nodejs.dev/)
- [Web3-UI](https://github.com/Developer-DAO/web3-ui)
- [Solidity](https://docs.soliditylang.org/en/v0.8.11/)

> Check out the game at [webthrees.herokuapp.com](https://webthrees.herokuapp.com/)

### Deployed Contract Address

Ropsten Testnet
[0xB15e828145d5a00a468bf6520bEE958a46c4217F](https://ropsten.etherscan.io/address/0x228d65C80a4D7072868034A2b503ec51eC75084b)

## Rules

- This is a turn based game
- Lowest score at the end of the game wins
- Each player will start their turn with 5 dice
- Player will roll the dice up to 5 times
- After each roll, the player must pick up at least 1 die but may pick up more if they choose
- Player will continue to roll and pick up dice until all dice have been taken
- When chosen, each die adds its face value to the current players score, except 3, 3 adds 0 to the score

## Features

- Connect Ethereum wallet
- Smart-contract interactions
- Real time multiplayer dice game
- Real time chat
- Chat & game audio
- Create new rooms
- Join previously created rooms
- Choose between public or private(password protected) rooms

# Learnings

- Building a web app with React using modern hooks and functional components

- Connecting the client and server through a web socket and use this connection to communicate between clients. The use of namespaces as they relate to sockets, and how to create, join, and communicate with rooms within each namespace.

- Improve working knowledge of hooks and the context API from React. All state management was done with hooks and the context API.

- Smart-contract creation, deployment, & interaction with Solidity and Ethers.js
