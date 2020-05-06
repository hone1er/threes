import styled from "styled-components";
import threesimg from "./threesCropped.jpg";

export const SignInDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url(${threesimg});
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;

  a {
    pointer-events: ${(props) => (props.player === "" ? "none" : "unset")};
    text-decoration: none;
  }
  select {
    margin-bottom: 15px;
    width: 175px;
    padding: 10px;
  }
  input {
    color: #444;
    background: #f8f8f8;
    border-radius: 8px;
    border: 3px solid black;
    width: 90%;
    height: 40px;
    margin: 1.5rem;
    margin-top: 1.5rem;
    font-size: 1.5rem;
    margin-top: 45vh;
    padding: 10px;
    min-width: 315px;
    max-width: 600px;
    @media (max-width: 500px) {
      margin-top: 25vh;
    }
  }
    
  .sign-in-button {
    border-radius: 8px;
    background: ${(props) => (props.player === "" ? "#555" : "#333")};

    color: #f8f8f8;
    :hover {
      background: #000;
    }
    @media (max-width: 800px) {
      width: 90%;
      margin: auto;
    }
  }
.rules {
  background: #333;
  @media (max-width: 800px) {

    width: 100%;
  }
}
  #enter-room {
    margin: 0 0 10px;
  }

  .sign-in-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    position: relative;
    top: 25px;

    @media (max-width: 800px){
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 175px;
    }
    
  }

  
`;
