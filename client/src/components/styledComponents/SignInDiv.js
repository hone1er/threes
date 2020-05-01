import styled from "styled-components";
import threesimg from "./threes(1).jpg";

export const SignInDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${threesimg});
  background-size: contain;
  background-position: center;
  a {
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

  @media (max-width: 500px){
    input {
      margin-top: 20vh;
    }
    .rules {
      margin-bottom: 61vh;
    }
  }
`;
