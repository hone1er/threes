import styled from "styled-components";

export const PrimaryBtn = styled.div`
a{
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
    background: #337ab7;
    color: #f8f8f8;
    border: none;
    padding: 10px;
    :hover {
      background: #286090;
    }


    &.rules {
        position: relative;
        top: 2vh;
    }
`