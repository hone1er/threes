import styled from "styled-components";

export const Die = styled.button`
    width: 100px;
    height: 100px;
    background: ${props => props.disabled ? "#444" : "#f8f8f8"};
    color: ${props => props.disabled ? "#f8f8f8" : "#444"};

`