import ErrorImagen from "../img/404.png";
import styled from "styled-components";
const Error404 = () => {
    return ( 
        <Imagen404 src={ErrorImagen} alt="Error404"/>
     );
}

const Imagen404 = styled.img`
    filter: grayscale(100%);
`
 
export default Error404;