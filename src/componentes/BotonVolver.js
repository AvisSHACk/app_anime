import Boton from "../componentes/Boton";
const BotonVolver = () => {
    return ( 
        <Boton independiente onClick={() => window.history.back()}>Volver</Boton>
     );
}
 
export default BotonVolver;