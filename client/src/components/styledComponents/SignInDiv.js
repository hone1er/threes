import styled from "styled-components";

export const SignInDiv = styled.div`
position: relative;
top: 20vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;

h1 {
  font-size: 3rem;
}
  a {
    border: 2px solid black;
    text-align: center;
    width: 150px;
    heigth: 60px;
    border-radius: 8px;
    text-decoration: none;
    color: #444;
    background: #f8f8f8;

    :hover{
      background: #e4e4e4;
  
    }
}

input {
  width: 250px;
  height: 40px;
  margin: 1.5rem;
  font-size: 1.5rem;
}

a, input{
padding: 10px;
}
`;
