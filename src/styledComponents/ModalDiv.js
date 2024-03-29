import styled from "styled-components";
export const ModalDiv = styled.div`
  #gifBtn {
    border-radius: 8px;
  }
  .gifContent {
    top: 20vh;
    -webkit-animation-name: gifanimatetop !important;
    -webkit-animation-duration: 0.4s;
    animation-name: gifanimatetop !important;
    animation-duration: 0.4s;
    width: max-content !important;

    button {
      background-color: transparent;
    }
  }
  &.game-room-rules {
    width: unset;
  }
  .rules {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  display: flex;
  justify-self: end;
  #rulesModal #myModal {
    display: ${(props) => (props.modal === false ? "block" : "none")};
  }
  .sign-in-rules {
    border-radius: 8px;
  }
  .game-room-rules {
    border-radius: 8px 0 0 0;
    height: fit-content;
    position: absolute;
    bottom: 0;
  }
  #rulesModal,
  #myModal,
  #publicModal {
    display: ${(props) => (props.modal === false ? "block" : "none")};
  }
  #rulesModal {
    ul {
      border: none;
      list-style: dotted;
      li {
        border: none;
        margin: 10px;
      }
    }
  }

  #publicModal {
    .modal-content {
      width: max-content;
      input {
        max-height: auto !important;
        width: min-content !important;
        height: min-content !important;
        margin: 0;
        padding: 0;
        max-width: 10px !important;
      }
    }
  }

  .radio-btns-outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 35px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content {
    img {
      display: flex;
      align-self: center;
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
    }

    ul {
      padding: 5%;
      padding-top: 2%;
    }
    li {
      padding: 0.5rem;
      font-size: 1.5rem;
      text-align: left;

      @media (max-width: 800px) {
        font-size: 1rem;
      }
    }
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
  }

  /* Add GIPHY Animation */
  @-webkit-keyframes gifanimatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 150px;
      opacity: 1;
    }
  }

  @keyframes gifanimatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 150px;
      opacity: 1;
    }
  }

  /* Add Animation */
  @-webkit-keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }

  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }

  /* The Close Button */
  .close {
    color: #000;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    text-decoration: none;
    cursor: pointer;
  }

  .modal-header {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
  }

  .modal-body {
    padding: 2px 16px;
  }

  .modal-footer {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
  }
`;
