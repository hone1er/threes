import styled from "styled-components";
import threesimg from "./images/threesCropped.jpg";

export const SignInDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 100vh !important;
  min-height: 700px
  background-image: url(${threesimg});
  background-size: contain;
  background-position-y: -40px;
  background-repeat: no-repeat;
  background-position-x: center;
  padding-bottom: 25px;

  .addy-wrap {
    width: 100%;
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
    border-radius: 8px;
    background: ${(props) =>
      props.player === "" || props.room === "" ? "#555" : "#222"};
    pointer-events: ${(props) =>
      props.player === "" || props.room === "" ? "none" : "unset"};

    color: #f8f8f8;
    :hover {
      background: #111;
    }
    @media (max-width: 800px) {
      width: 86%;
      margin: 0 auto;
    }
  }
  .rules {
    pointer-events: all;
    background: #222;
    border-radius: 8px;
    color: #f8f8f8;
    @media (max-width: 800px) {
      width: 100%;
      background: #111;
    }
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
`;
