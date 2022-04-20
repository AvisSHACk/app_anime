import styled from "styled-components";
import { css } from "styled-components";

const Boton = styled.button`
    ${({registerLogin}) => registerLogin && css`
        width: 100%;
        padding:1rem .8rem;
        margin-bottom:1rem;
    `}

    ${({independiente}) => independiente && css`
        margin-right: 1rem;
    `}
    padding:1rem .8rem;
    border-radius: 12px;
    /* background:#ef5777 ; */
    background: #CD4C82;
    cursor: pointer;
`

export default Boton;