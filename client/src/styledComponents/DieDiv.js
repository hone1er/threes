import styled from "styled-components";

export const DieDiv = styled.button`
  position: relative;
  left: ${(props) => props.diePosition};
  top: 15px;
  transition: left 1s;
  width: 6rem;
  height: 6rem;
  border: none;
  img {
    width: 6rem;
  }
  cursor: pointer;
  background: #f8f8f8;
  color: #444;
  margin: 10px;
  padding: 0 !important;
  zoom: 1; /* IE */
  -moz-transform: scale(1); /* Firefox */
  -moz-transform-origin: 0 0;
  -o-transform: scale(1); /* Opera */
  -o-transform-origin: 0 0;
  -webkit-transform: scale(1); /* Safari And Chrome */
  -webkit-transform-origin: 0 0;
  transform: scale(1); /* Standard Property */
  transform-origin: 0 0; /* Standard Property */

  &:hover {
    zoom: 1.00001; /* IE */
    -moz-transform: scale(1.025); /* Firefox */
    -moz-transform-origin: 0 0;
    -o-transform: scale(1.025); /* Opera */
    -o-transform-origin: 0 0;
    -webkit-transform: scale(1.025); /* Safari And Chrome */
    -webkit-transform-origin: 0 0;
    transform: scale(1.025); /* Standard Property */
    transform-origin: 0 0; /* Standard Property */
  }
  &:focus {
    outline: none !important;
    -webkit-outline: none !important;
    -moz-outline: none !important;
    -ms-outline: none !important;
    -o-outline: none !important;
    /* Use a border to apply the outline */
    border: 1px solid rgba(0, 0, 0, 0);
  }

  &.rolling:nth-child(odd) {
    animation: rolling 0.25s 2;
  }
  &.rolling:nth-child(even) {
    animation: reverse-rolling 0.25s 2;
  }

  @keyframes rolling {
    from {
      transform-origin: 40% 55%;
      transform: rotate(0deg);
    }
    to {
      transform-origin: 55% 40%;
      transform: rotate(360deg);
    }
  }
  @keyframes reverse-rolling {
    from {
      transform-origin: 40% 55%;
      transform: rotate(0deg);
    }
    to {
      transform-origin: 55% 40%;
      transform: rotate(-360deg);
    }
  }

  @media (max-width: 800px) {
    width: 3.75rem;
    height: 3.75rem;
    img {
      width: 3.75rem;
    }
  }
`;
