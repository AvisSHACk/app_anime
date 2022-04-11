import styled from "styled-components";
import Cards from "./Cards";
const ContenedorCards = ({resultados, loading}) => {
    // console.log(loading)
    return ( 
        <ContenedorCard className="contenedor">
            {loading && <p>Cargando</p>}
            {!loading && resultados.map(resultado => (
                <Cards key={resultado.mal_id} resultado={resultado}/>
            )) }
        </ContenedorCard>
     );
}

const ContenedorCard = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`




 
export default ContenedorCards;