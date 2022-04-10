import ContenedorCards from "../componentes/ContenedorCards";
import FormularioBuscar from "../componentes/FormularioBuscar";
const Inicio = ({resultados, cambiarResultados}) => {
    return ( 
        <>
            <FormularioBuscar cambiarResultados={cambiarResultados}/>
            <ContenedorCards resultados={resultados}/>
        </>
     );
}
 
export default Inicio;