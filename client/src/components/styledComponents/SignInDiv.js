import styled from "styled-components";
import threesimg from "./threesimg.jpg";

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
    border: 2px solid black;
    text-align: center;
    width: 150px;
    heigth: 60px;
    border-radius: 8px;
    text-decoration: none;
    background: #337ab7;
    color: #f8f8f8;
    border: none;
    margin-bottom: 8vh;

    :hover {
      background: #286090;
    }
  }

  input {
    background: #e4e4e4;
    width: 250px;
    height: 40px;
    margin: 1.5rem;
    font-size: 1.5rem;
    margin-top: 75vh;
  }

  a,
  input {
    padding: 10px;
  }

  @media (max-width: 500px){
    input {
      margin-top: 20vh;
    }
    a {
      margin-bottom: 66vh;
    }
  }
`;
