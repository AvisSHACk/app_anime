import { Link } from "react-router-dom";
import styled from "styled-components";
const Cards = ({resultado}) => {
    return (
        <Card>
            <Link to={`/articulo/${resultado.mal_id}`}>
                <PortadaCard src={resultado.images.jpg.image_url} alt="" />
                <Mask><TituloCard>{resultado.title}</TituloCard></Mask>
            </Link>
        </Card>
    );
}

const Card = styled.article`
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    transform: scale(1, 1);
    transition: all .2s;

    &:hover {
        transform: scale(1.1, 1.1);
    }
`

const Mask = styled.span`
    padding:.8rem;
    background: linear-gradient(0, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
    position: absolute;
    top:0%;
    width:100%;
    height: 100%;
    display: flex;
    align-items:flex-end;
`

const PortadaCard = styled.img`
    width: 100%;
    height: 350px;
    object-fit: cover;
`

const TituloCard = styled.h2`
    margin: 0;
    font-size:1rem;
    color:#fff;
`
 
export default Cards;