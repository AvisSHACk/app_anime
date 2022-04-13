import ContenedorCards from "../componentes/ContenedorCards";
import FormularioBuscar from "../componentes/FormularioBuscar";
import BotonCerrarSesion from "../componentes/BotonCerrarSesion";
import BotonMisFavoritos from "../componentes/BotonMisFavoritos";
import ContenedorButtons from "../componentes/ContenedorButtons";
import Header from "../componentes/Header";
const Inicio = ({resultados, cambiarResultados, loading, setLoading}) => {
    return (
        <>  
            <Header />
            <ContenedorButtons>
                <BotonMisFavoritos cambiarResultados={cambiarResultados}/>
                <BotonCerrarSesion cambiarResultados={cambiarResultados}/>
            </ContenedorButtons>
            <FormularioBuscar cambiarResultados={cambiarResultados} setLoading={setLoading}/>
            <ContenedorCards resultados={resultados} loading={loading}/>
        </>
     );
}


 
export default Inicio;