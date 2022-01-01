import styled from "styled-components";

export const PrimaryBtn = styled.div`
  &.gifBtn {
    display: flex;
    justify-content: center;
    border-radius: 0;
    position: relative;
    width: 100px;
    align-items: center;
    &:hover {
      background: rgb(0, 255, 153);
      color: rgb(46, 46, 46);
    }
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
  a {
    text-decoration: none;
    color: #f8f8f8;
  }
  cursor: pointer;
  border: 2px solid black;
  text-align: center;
  width: 150px;
  height: 44px;
  border-radius: 8px;
  text-decoration: none;
  background: #222;
  color: #f8f8f8;
  border: none;
  padding: 10px;
  :hover {
    background: #111;
  }

  &#logout {
    border-radius: 0 0 0 8px;
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;
