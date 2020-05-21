import styled from "styled-components";

export const ChatDiv = styled.div`
#gif-preview {
  position: relative;
  top: 15px;
  display: flex;

  span {
    cursor: pointer;
    font-size: 2rem;
    width: 45px;
    margin-right: 10px;
    text-align: left;
    position: relative;
    bottom: 15px;
  }
}

  width: 100%;
  margin: auto;
  margin-top: 25px;

  h1 {
    font-size: 1.4rem;
  }
  .chat-item {
    display: flex;
  }

  .chat-user-item {
    color: #222;
    margin-right: 2.5%;
  }

  #chat-input-div {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;

    @media (max-width: 800px){
      position: relative;
      top: 2px;
    }
  }
  #chat-btn {
    background: white;
    width: fit-content;
    height: auto;
    postion: relative;
    top: 10px;
    svg {
      width: 30px;
      height: 30px;
      fill: #222;
      &:hover {
        fill: #111
      }
    }
  }
  .chat-gif {
    align-self: center;
    justify-self: center;
  }
  #chat-mute {
    width: fit-content;
    height: auto;
    color: black;
    background: white;
    width: max-content
    position: relative;
    top: 5px;
    left: 3px;
    svg {
      width: 30px;
      height: 30px;
      fill: #222;
      &:hover {
        fill: #111
      }
    }
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
    border: 1px solid black;
    list-style: none;
    text-align: left;
  }

  li {
    font-size: 1.15rem;
    border: 1px solid #e4e4e480;
    line-height: 1.5rem;
    padding: 2px 0 2px 10px;
    letter-spacing: 0.05rem;
    color: #444;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: fit-content;
    
  }
  input {
    width: calc(100% - 56px);
    margin: auto;
    height: 2.3rem;
    font-size: 1rem;
    font-weight: 400;
    padding-left: 5px;
    letter-spacing: 0.05rem;
    color: #444;
  }
  button {
      letter-spacing: 0.05rem;
    position: relative;
    bottom: 1.5px;
    width: 60px;
    cursor: pointer;
    margin: 0;
    background: #222;
    color: #f8f8f8;
    border: none;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 2.5rem;

    :hover {
      background: #111;
    }
  }

  .buttonWrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    top: 15px;
    margin-bottom: 75px;
  }

#sound {
  display: none;
}

  @media (max-width: 800px) {
    li {
      font-size: 1rem;
    }

    input {
    width: calc(100% - 68px);
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
