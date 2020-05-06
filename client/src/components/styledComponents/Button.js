import styled from "styled-components";

export const Button = styled.button`
  font-size: 1.25rem;
  text-transform: capitalize;
  cursor: pointer;
  border-radius: 8px;
  min-width: 200px;
  min-height: 2.5rem;
  margin: 10px;
  color: ${(props) => (props.reset ? "#ff7070;" : props.disabled ? "#e4fa6660" : "#e4fa66")};
  background: ${(props) =>
    props.disabled ? " 	#444" : props.reset ? "#222" : "#222"};
    border:none;
  max-width: 130px;
  align-self: center;
  zoom: 1; /* IE */
  -moz-transform: scale(1); /* Firefox */
  -o-transform: scale(1); /* Opera */
  -webkit-transform: scale(1); /* Safari And Chrome */
  transform: scale(1); /* Standard Property */

  &:hover {
    zoom: 1.1; /* IE */
    -moz-transform: scale(1.1); /* Firefox */
    -o-transform: scale(1.1); /* Opera */
    -webkit-transform: scale(1.1); /* Safari And Chrome */
    transform: scale(1.1); /* Standard Property */
  }

  @media (max-media: 800px) {
    &:hover {
      zoom: none;
      -moz-transform: none;
      -o-transform: none;
      -webkit-transform: none;
      transform: none;
    }
  }

  @media (max-width: 500px) {
    font-size: 1.25rem;
  }
`;
