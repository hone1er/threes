import styled from "styled-components";

export const ChatDiv = styled.div`
  width: 775px;
  margin: auto;
  margin-top: 25px;

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
    margin: 0 37px 150px;
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
    font-size: 1.15rem;
    border: 1px solid #e4e4e4;
    line-height: 1.5rem;
    padding: 2px 0 2px 10px;
    letter-spacing: 0.05rem;
  }
  input {
    width: 635px;
    margin: auto;
    height: 2rem;
    font-size: 1rem;
    font-weight: 400;
    padding-left: 5px;
    letter-spacing: 0.05rem;
  }
  button {
      letter-spacing: 0.05rem;
    position: relative;
    bottom: 0.5px;
    width: 60px;
    cursor: pointer;
    margin: 0;
    background: #337ab7;
    color: #f8f8f8;
    border: none;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 2.2rem;

    :hover {
      background: #286090;
    }
  }

  @media (max-width: 800px) {
    width: 450px;

    input {
      width: 342px;
    }

    #chat-mute {
      width: 145px;
      margin: 0 20px 150px;
    }
  }

  @media (max-width: 460px) {
    width: 350px;

    input {
      width: 251px;
    }

    li {
      font-size: 1.1rem;
    }
  }
`;
