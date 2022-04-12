import ContenedorCard from "./ContenedorCard";
import Cards from "./Cards";
const ContenedorCards = ({resultados, loading}) => {
    // console.log(loading)
    return ( 
        <ContenedorCard className="contenedor">
            {loading && <p>Cargando</p>}
            {!loading && resultados.map(resultado => (
                <Cards key={resultado.mal_id} resultado={resultado}/>
            )) }

            {!loading && resultados.length === 0 &&
                <p>Haz tu busquedad desde el formulario =)</p>
            }
        </ContenedorCard>
     );
}

export default ContenedorCards;