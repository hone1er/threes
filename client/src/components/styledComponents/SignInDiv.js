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
    pointer-events: ${props => props.player === "" ? "none" : "unset"};
    text-decoration: none;
  }
  input {
    background: #e4e4e4;
    width: 250px;
    height: 40px;
    margin: 1.5rem;
    font-size: 1.5rem;
    margin-top: 50vh;
    padding: 10px;
  }
  #enter-room{ 
    margin: 0 0 10px;
  }

`;
