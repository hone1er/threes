import styled from "styled-components";

export const WinnerDiv = styled.div`
  overflow-x: hidden;
  img {
    width: 70%;
    position: relative;
    bottom: 60px;
    transition: bottom 0.5s;
    z-index: -1;

    @media (max-width: 800px) {
      width: 80%;
    }
  }
  .turn {
    font-size: 2.5rem;
  }
  .winner {
    position: relative;
    bottom: 20px;
    right: ${(props) => (props.position ? props.position : 0)};
    transition: right 0.5s;
    animation-name: bounce;
    animation-iteration-count: infinite;
    animation-duration: 1s;
  }

  .rainbow-text {
    font-size: 3rem;

    background-image: repeating-linear-gradient(
      45deg,
      violet,
      indigo,
      blue,
      green,
      yellow,
      orange,
      red,
      violet
    );
    text-align: center;
    background-size: 800% 800%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: rainbow 6s ease infinite;
  }
  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 25%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  

  @keyframes bounce {
    from,
    to {
      botttom: 0;
      animation-timing-function: ease-out;
    }
    50% {
      bottom: 10px;
      animation-timing-function: ease-in;
    }
  }
`;
