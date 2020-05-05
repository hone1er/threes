import styled from 'styled-components'
export const PlayerDiv = styled.div`
.player {
    display: flex;
    align-items: end;

    p {
        padding: 10px;
        font-size: 1.25rem;
        color: #222
    }
    h1 {
        font-size: 2.25rem;
    }
}

@media (max-width: 800px) {
    .player {
        padding: 0 20px;
        align-items: center;
        p {
            font-size: 1rem;
        }
        h1{
            font-size: 1.5rem;
        }
    }
}

@media (max-width: 500px) {
    .player{
    p {
        font-size: .7rem;
    }
    h1 {
        font-size: 1.1rem;
    }
}
}

`