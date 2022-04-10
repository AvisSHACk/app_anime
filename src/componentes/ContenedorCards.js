import { Link } from "react-router-dom";

const ContenedorCards = ({resultados}) => {
    return ( 
        <div className="contenedor">
            {resultados.map(resultado => (
                <article>
                    <h2>{resultado.title}</h2>
                    <img src={resultado.images.jpg.large_image_url} alt="" />
                    <Link to={`/articulo/${resultado.mal_id}`}>Ver mas informacion</Link>
                </article>
            ))}
        </div>
     );
}
 
export default ContenedorCards;