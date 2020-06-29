import styled from "styled-components";
export const PlayerDiv = styled.div`
  width: 100%;
  .player {
    display: flex;
    align-items: end;
    padding: 0 20px;
    background-color: ${(props) =>
      props.current === "current" ? "#333" : "#111"};
    margin: 1px;
    h1 {
      font-size: 1.25rem;
      font-weight: 400;
    }
  }

  @media (max-width: 800px) {
    width: unset;
    .player {
      align-items: center;
      p {
        font-size: 1rem;
      }
      h1 {
        font-size: 1.5rem;
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
