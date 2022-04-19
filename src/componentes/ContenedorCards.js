import ContenedorCard from "./ContenedorCard";
import Cards from "./Cards";
import Mensaje from "./AvisoCargando";
const ContenedorCards = ({resultados, loading}) => {
    // console.log(loading)
    return ( 
        <ContenedorCard className="contenedor">
            
            {loading && <Mensaje>Cargando</Mensaje>}
            {!loading && resultados.map(resultado => {
                console.log(resultado)
                return resultado.mensaje ? 
                            <Mensaje key={resultado.id}>{resultado.mensaje}</Mensaje>
                        : 
                            <Cards key={resultado.mal_id} resultado={resultado}/>
            })}
        </ContenedorCard>
     );
}

export default ContenedorCards;