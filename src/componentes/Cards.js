import { Link } from "react-router-dom";
import styled from "styled-components";
const Cards = ({resultado}) => {
    return (
        <Card>
            <Link to={`/articulo/${resultado.mal_id}`}>
                <PortadaCard src={resultado.images.jpg.image_url} alt="" />
                <TituloCard>{resultado.title}</TituloCard>
            </Link>
        </Card>
    );
}

const Card = styled.article`
    width: 19%;
    margin-top:1rem;
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