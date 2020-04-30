import styled from "styled-components";

export const ChatDiv = styled.div`
  width: 100%;
    margin-top: 25px;
    h1 {
        text-transform: uppercase;
    }
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-x: hidden;
    margin: auto;
    width: 90%;
    background: #f8f8f8;
    height: 150px;
    max-height: 150px;
    overflow-y: scroll;
    border: 2px solid black;
    list-style: none;
    text-align: left;
}

li {
    padding-left: 20px;
    font-size: 1.5rem;
    font-weight: 500;
    border: 1px solid #e4e4e4;
  }
  input {
      margin: 10px 0;
      height: 2rem;
  }
  button {
      height: 2rem;
      margin-bottom: 100px;
  }
`;
