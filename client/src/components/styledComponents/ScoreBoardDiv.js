import styled from "styled-components";

export const ScoreBoardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color:#ff7070;
  color: #f8f8f8;
  .score-header-container {
    width: 100%;
    font-size: 0.8rem;
    border-right: 2px solid #e4fa6650;
    border-bottom: 2px solid #e4fa6640;
  }

  @media (max-width: 800px) {
    align-items: center;
    flex-flow: wrap;

    .score-header-container {
      font-size: 0.7rem;
      padding: 0 10px;
      border-bottom: none;
      width: max-content;
    }
    border: 2px solid #e4fa6650;
  }
  @media (max-width: 650px) {
    .score-header-container {
      font-size: 0.4rem;
    }
  }
`;
