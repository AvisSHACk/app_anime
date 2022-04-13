import { useNavigate } from "react-router-dom";
import Boton from "../componentes/Boton";
const BotonMisFavoritos = () => {

    const history = useNavigate();

    return ( 
        <Boton independiente onClick={() => history("/favoritos")}>Mis favoritos </Boton>
     );
}
 
export default BotonMisFavoritos;