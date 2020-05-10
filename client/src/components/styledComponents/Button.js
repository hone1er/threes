import styled from "styled-components";

export const Button = styled.button`

  font-size: 1.25rem;
  text-transform: capitalize;
  cursor: pointer;
  border-radius: 8px;
  min-width: 200px;
  min-height: 2.5rem;
  margin: 10px;
  color: ${(props) =>
    props.reset === true
      ? "#ff7070;"
      : props.disabled
      ? "#ff7070;"
      : "#e4fa66"};
  background: ${(props) =>
    props.disabled ? " 	#444" : props.reset ? "#222" : "#222"};
  border: none;
  max-width: 130px;
  align-self: center;

  &:hover {
    background: ${(props) =>
      props.disabled ? " 	#444" : props.reset ? "#111" : "#111"};
  }

  @media (max-media: 800px) {
    &:hover {
    }
  }

  @media (max-width: 500px) {
    font-size: 1.25rem;
  }
`;
