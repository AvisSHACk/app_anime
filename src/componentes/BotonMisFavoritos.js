import { useNavigate } from "react-router-dom";

const BotonMisFavoritos = () => {

    const history = useNavigate();

    return ( 
        <button onClick={() => history("/favoritos")}>Mis favoritos </button>
     );
}
 
export default BotonMisFavoritos;