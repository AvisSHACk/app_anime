import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/firebaseConfig";

const BotonCerrarSesion = ({cambiarResultados}) => {

    const history = useNavigate();

    const cerrarSesion = async () => {
        try {
            await signOut(auth)
            cambiarResultados([])
            history("/ingreso")
        } catch (e) {
            console.log(e)
        }
    }

    return ( 
        <button onClick={cerrarSesion}>Cerrar sesion </button>
     );
}
 
export default BotonCerrarSesion;