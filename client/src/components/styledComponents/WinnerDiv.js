import styled from "styled-components";

export const WinnerDiv = styled.div`
  overflow-x: hidden;
  img {
    width: 70%;
    position: relative;
    bottom: ${(props) => (props.imagePosition ? props.imagePosition : 0)};
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
    font-size: 3rem;
    position: relative;
    bottom: 20px;
    right: ${(props) => (props.position ? props.position : 0)};
    transition: right 0.5s;
    -webkit-animation-name: bounce;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-duration: 1s;

    animation-name: bounce;
    animation-iteration-count: infinite;
    animation-duration: 1s;
  }


  @-webkit-keyframes bounce {
    from, to  {
      bottom: 0;
      -webkit-animation-timing-function: ease-out;
    }
    50% {
      bottom: 5px;
      -webkit-animation-timing-function: ease-in;
    }
  }
  @keyframes bounce {
    from, to  {
      botttom: 0;
      animation-timing-function: ease-out;
    }
    50% {
      bottom: 5px;
      animation-timing-function: ease-in;
    }
  }
`;
