import styled from "styled-components";

export const CurrentPlayerDiv = styled.div`
overflow-x: hidden;
img {
    width: 70%;
    position: relative;
    bottom: ${(props) => ( props.imagePosition ? props.imagePosition : 0)};
    transition: bottom .5s;
    
}
.turn {
    font-size: 2.5rem;
}
.winner {
    font-size: 3rem;
    position: relative;
    right: ${(props) => ( props.position ? props.position : 0)};
    transition: right .5s;
  }
`;
