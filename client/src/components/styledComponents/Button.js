import styled from "styled-components";

export const Button = styled.button`
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 200px;
  margin: 10px;
  color: #f8f8f8;
  background: ${(props) =>
    props.disabled
      ? "red"
      : props.reset
      ? "#333"
      : "green"};
  max-width: 130px;
  align-self: center;
`;
