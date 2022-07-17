import styled from "styled-components";
import threesimg from "./images/threesCropped.jpg";

export const SignInDiv = styled.div`
  background-image: url(${threesimg});
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 700px;
  background-size: contain;
  background-position-y: -40px;
  background-repeat: no-repeat;
  background-position-x: center;
  padding-bottom: 25px;

  .disclaimer {
    height: 64px;
    margin-top: 96px;
  }

  .addy-wrap {
    width: 100%;
    margin-top: 42.75%;
    place-content: center;

    p {
      margin: auto;
      background-color: #ffffff;
    }
  }

  @media (max-width: 472px) {
    background-position-y: 5vw;
  }

  a {
    display: none;
    pointer-events: ${(props) =>
      props.player === "" || props.room === "" ? "none" : "unset"};
    text-decoration: none;
  }
  select {
    margin-bottom: 15px;
    width: 175px;
    padding: 10px;
  }
  #top-label {
    margin-top: 30vh;
    @media (max-width: 814px) {
      margin-top: 275px;
    }
    @media (max-width: 400px) {
      margin-top: 175px;
    }
  }
  #top-label,
  #bottom-label,
  #password-label {
    width: 90%;
    min-width: 290px;
    max-width: 600px;
  }
  label {
    color: #ff7070;
    margin-bottom: 5px;
  }
  input {
    color: #444;
    background: #f8f8f8;
    border-radius: 8px;
    border: 3px solid black;
    width: 90%;
    height: 40px;
    margin: 1.5rem;
    margin-top: 0;
    font-size: 1.5rem;
    padding: 10px;
    min-width: 290px;
    max-width: 600px;
  }

  .sign-in-button {
  }
  .rules {
  }
  #enter-room {
    margin: 0 0 10px;
  }
  #password-label {
    margin: 15px 0 10px;
  }

  .radio-btn-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    input {
      width: 15px !important;
      min-width: auto;
      height: auto;
      margin-top: 4vh;
    }
  }

  .sign-in-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    position: relative;
    top: 25px;

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 175px;
      min-height: 175px;
    }
  }

  .gameContainer {
    text-align: center;
    margin-bottom: 10px;
  }
  .gameHeader {
    font-weight: bold;
    font-size: 2rem;
    overflow-y: scroll;
  }

  .gameList {
    width: 500px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1px;
    overflow-x: hidden;
    overflow-y: scroll;
    margin: auto;
    background: #f8f8f8;
    height: 300px;
    box-shadow: 0px 0px 7px 5px rgb(0 0 0 / 8%);
    border-radius: 8px;
    list-style: none;
    text-align: center;
  }
  .gameItem {
    padding: 5px;
    box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 8%);
  }
  .gameItem:hover {
    box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 22%);
  }

  .connectWallet {
    margin-top: 45% !important;
  }
`;
