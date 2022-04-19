import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/firebaseConfig";
import Boton from "../componentes/Boton";
const BotonCerrarSesion = ({cambiarResultados}) => {

    const history = useNavigate();

    const cerrarSesion = async () => {
        try {
            await signOut(auth)
            cambiarResultados([{id: 3, mensaje: "Haz tu busquedad desde el formulario"}])
            history("/ingreso")
        } catch (e) {
            console.log(e)
        }
    }

    return ( 
        <Boton onClick={cerrarSesion}>Cerrar sesion </Boton>
     );
}
 
export default BotonCerrarSesion;