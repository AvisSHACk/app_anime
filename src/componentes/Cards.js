import { Link } from "react-router-dom";
import styled from "styled-components";
const Cards = ({resultado}) => {
    return (
        <Card>
            <Link to={`/articulo/${resultado.mal_id}`}>
                <Portada src={resultado.images.jpg.image_url} alt="" />
                <Titulo>{resultado.title}</Titulo>
            </Link>
        </Card>
    );
}

const Card = styled.article`
    width: 19%;
`

const Portada = styled.img`
    width: 100%;
    height: 350px;
    object-fit: cover;
`

const Titulo = styled.h2`
    margin: 0;
    font-size:1rem;
`
 
export default Cards;