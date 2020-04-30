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
      cursor: pointer;
      margin: 10px;
      background: #337ab7;
      color: #f8f8f8;
      border: none;
      border-radius: 4px;
      text-align: center;
      padding: 0 20px;
      justify-content: center;
      align-items: center;
      height: 2rem;
      margin-bottom: 100px;

      :hover {
          background: #286090;
      }
  }
`;
