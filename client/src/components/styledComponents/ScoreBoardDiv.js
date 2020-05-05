import styled from "styled-components";

export const ScoreBoardDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: rgba(115, 189, 130, 0.30);
.score-header-container {
    width: 100%;
    border-right: 2px solid rgba(88, 185, 108, 0.30);;
    border-bottom: 2px solid rgba(88, 185, 108, 0.30);;
}


    @media (max-width: 800px){
        align-items: center;

        .score-header-container{
            font-size: .7rem;
            padding: 0 10px;
            border-bottom: none;
            width: max-content;
        }
        border: 2px solid rgba(88, 185, 108, 0.30);;
    }
`