import styled from "styled-components";

export const Button = styled.button`
        padding: 1rem;
        margin: 10px;
        box-shadow: ${props => props.disabled ? "0 0 5px 3px red" : props.reset ? "none" : "0 0 5px 3px green"};
        font-family: cursive;
`