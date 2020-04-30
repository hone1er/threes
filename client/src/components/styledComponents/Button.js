import styled from "styled-components";

export const Button = styled.button`
  padding: 1.25rem;
  font-size: 1.5rem;
  text-transform: capitalize;
  cursor: pointer;
  border-radius: 8px;
  min-width: 200px;
  margin: 10px;
  color: ${(props) =>
    props.disabled
      ? "#333"
      : "#f8f8f8"};
  background: ${(props) =>
    props.disabled
      ? " 	#cc330090"
      : props.reset
      ? "#333"
      : "#339900"};
  max-width: 130px;
  align-self: center;
  scale: 1;

  :hover {
    scale: 1.1;
  }
`;
