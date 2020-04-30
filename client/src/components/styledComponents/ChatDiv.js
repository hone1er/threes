import styled from "styled-components";

export const ChatDiv = styled.div`
    width: 775px;
    margin: auto;
    margin-top: 25px;

    #chat-input-div {
        width: 100%
        margin: auto;
    }
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
    font-size: 1.15rem;
    font-weight: 500;
    border: 1px solid #e4e4e4;
    line-height: 2.5rem;
  }
  input {
      width: 628px;
      margin: auto;
      height: 2rem;
      font-size: 1rem;
      font-weight: 400;
      padding-left: 10px;
  }
  button {
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
      margin-bottom: 100px;

      :hover {
          background: #286090;
      }
  }

  @media (max-width: 800px) {
      width: 450px;
      
      input {
          width: 335px;
        }
    }

  @media (max-width: 460px) {
    width: 350px;
    
    input {
        width: 246px;
    }
    
    li {
        font-size: 1.1rem;
    }
}
    `;
