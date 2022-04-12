import ContenedorCards from "../componentes/ContenedorCards";
import FormularioBuscar from "../componentes/FormularioBuscar";
import BotonCerrarSesion from "../componentes/BotonCerrarSesion";
import BotonMisFavoritos from "../componentes/BotonMisFavoritos";
const Inicio = ({resultados, cambiarResultados, loading, setLoading}) => {
    return ( 
        <>  
            <BotonCerrarSesion cambiarResultados={cambiarResultados}/>
            <BotonMisFavoritos cambiarResultados={cambiarResultados}/>
            <FormularioBuscar cambiarResultados={cambiarResultados} setLoading={setLoading}/>
            <ContenedorCards resultados={resultados} loading={loading}/>
        </>
     );
}


 
export default Inicio;