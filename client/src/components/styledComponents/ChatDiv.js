import styled from "styled-components";

export const ChatDiv = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 25px;
  height: 100vh;

  h1 {
    font-size: 1.4rem;
  }
  .chat-item {
    display: flex;
  }

  .chat-user-item {
    color: #333;
    margin-right: 2.5%;
  }

  #chat-input-div {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  #chat-mute {
    width: 145px;
    position: relative;
    top: 5px;
    left: 3px;

  }
  h1 {
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 0 1px;
    overflow-x: hidden;
    margin: auto;
    background: #f8f8f8;
    height: 60vh;
    overflow-y: scroll;
    border: 2px solid black;
    list-style: none;
    text-align: left;
  }

  li {
    font-size: 1.15rem;
    border: 1px solid #e4e4e480;
    line-height: 1.5rem;
    padding: 2px 0 2px 10px;
    letter-spacing: 0.05rem;
  }
  input {
    width: calc(100% - 71px);
    margin: auto;
    height: 2.3rem;
    font-size: 1rem;
    font-weight: 400;
    padding-left: 5px;
    letter-spacing: 0.05rem;
  }
  button {
      letter-spacing: 0.05rem;
    position: relative;
    bottom: 1.5px;
    width: 60px;
    cursor: pointer;
    margin: 0;
    background: #337ab7;
    color: #f8f8f8;
    border: none;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 2.5rem;

    :hover {
      background: #286090;
    }
  }

  @media (max-width: 800px) {
    li {
      font-size: 1rem;
    }
    #chat-mute {
      width: 145px;

    }
    input {
    width: calc(100% - 75px);
    border-radius: 0 !important;
    }
  }
  @media (max-width: 650px) {
    height: 100%;
    ul {
      height: 300px;
    }
  }
  @media (max-width: 460px) {

    input {
      font-size: .9rem;
    }
    li {
      font-size: .9rem;
    }
  }
`;
