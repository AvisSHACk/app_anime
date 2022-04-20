import ContenedorCard from "./ContenedorCard";
import Cards from "./Cards";
import {ContenedorMensaje, Mensaje, ImagenMensaje} from "./AvisoCargando";
import chitoge from "../img/chitoge.png"


const ContenedorCards = ({resultados, loading}) => {
    // console.log(loading)
    return ( 
        <>
            <ContenedorCard>
                
                {loading && <Mensaje>Cargando</Mensaje>}
                {!loading && resultados.map(resultado => {
                    return !resultado.mensaje && <Cards key={resultado.mal_id} resultado={resultado}/>
                })}

            </ContenedorCard>
        
            {!loading && resultados.map(resultado => {
                    return resultado.mensaje && <ContenedorMensaje key={resultado.id}>
                                                    <Mensaje>{resultado.mensaje}</Mensaje>
                                                    <ImagenMensaje src={chitoge}/>
                                                </ContenedorMensaje>
            })}
        </>
     );
}

export default ContenedorCards;