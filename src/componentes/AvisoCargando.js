import styled from "styled-components";

const ContenedorMensaje = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Mensaje = styled.p`
    font-size:2rem;
    place-self: center stretch;
`

const ImagenMensaje = styled.img`
    width:26%;
    filter: grayscale(100%);
`

export {ContenedorMensaje, Mensaje,ImagenMensaje};