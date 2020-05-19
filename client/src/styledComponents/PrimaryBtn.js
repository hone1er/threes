import styled from "styled-components";

export const PrimaryBtn = styled.div`
&.gifBtn {
  border-radius: 0;
  position: relative;
  width: 100px;
  &:hover {
    background: rgb(0, 255, 153);
    color: rgb(46, 46, 46);
}
}
  &:focus {
    outline: 5px auto rgba(0, 150, 255, 1);
    -webkit-outline: 5px auto rgba(0, 150, 255, 1);
    -moz-outline: 5px auto rgba(0, 150, 255, 1);
    -ms-outline: 5px auto rgba(0, 150, 255, 1);
    -o-outline: 5px auto rgba(0, 150, 255, 1);
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
  heigth: 60px;
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
    border-radius: 0;
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;
