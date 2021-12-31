import styled from "styled-components";
export const PlayerDiv = styled.div`
  width: 100%;
  .player {
    height: 100%;
    display: flex;
    padding: 0 20px;
    background-color: ${(props) =>
      props.current === "current" ? "#222" : "#333"};
    margin: 1px;
    align-items: center;
    .wrap {
      max-width: fit-content;
      display: flex;
    }
    h1 {
      font-size: 1.25rem;
      font-weight: 400;
    }
    p {
      white-space: nowrap;
    }
  }

  @media (max-width: 800px) {
    width: unset;
    height: 100%;

    .player {
      align-items: center;
      p {
        font-size: 1rem;
      }
      h1 {
        font-size: 1.25rem;
      }
    }
  }

  @media (max-width: 500px) {
    .player {
      p {
        font-size: 0.7rem;
      }
      h1 {
        font-size: 1.1rem;
      }
    }
  }
`;
