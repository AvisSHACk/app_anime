import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import { auth, signInWithEmailAndPassword } from "../firebase/firebaseConfig";
import Formulario from "../componentes/Formulario";
import Input from "../componentes/Input";
import Boton from "../componentes/Boton";
import EncabezadoFormulario from "../componentes/EncabezadoFormulario";

const Ingreso = () => {
    const history = useNavigate();
    const [email, cambiarEmail] = useState("");
    const [password, cambiarPassword] = useState("");
    const {usuario} = useAuth();

    useEffect(() => {
        if(usuario) {
            history("/")
        }
    }, [usuario, history]) /*si no ponemos corchetes para que el useEffcet se ejecute en todas las reenderizaciones del componente*/

    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            history("/")
        } catch (error) {
            console.log(error)
        }
    }   

    return ( 
        <Formulario action="">
            <EncabezadoFormulario>Ingreso</EncabezadoFormulario>
            <Input 
                type="email" 
                name="correo"
                id="email"
                value={email}
                onChange={e => cambiarEmail(e.target.value)}
                placeholder="Email"
            />

            <Input 
                type="password" 
                name="password"
                id="password"
                value={password}
                onChange={e => cambiarPassword(e.target.value)}
                placeholder="Contraseña"
            />

            <Boton 
                type="submit"
                onClick={iniciarSesion}
                registerLogin
            >
                Iniciar Sesion
            </Boton>
        </Formulario>
     );
}
 
export default Ingreso;