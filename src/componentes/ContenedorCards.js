import ContenedorCard from "./ContenedorCard";
import Cards from "./Cards";
import Mensaje from "./AvisoCargando";
const ContenedorCards = ({resultados, loading}) => {
    // console.log(loading)
    return ( 
        <ContenedorCard className="contenedor">
            {loading && <Mensaje>Cargando</Mensaje>}
            {!loading && resultados.map(resultado => (
                <Cards key={resultado.mal_id} resultado={resultado}/>
            )) }

            {!loading && resultados.length === 0 &&
                <Mensaje>Haz tu busquedad desde el formulario =)</Mensaje>
            }
        </ContenedorCard>
     );
}

export default ContenedorCards;