import { useState, useEffect } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebase/firebaseConfig";
import {useNavigate } from "react-router-dom";
import {useAuth} from "./../hooks/authContext";
import ContenedorFormulario from "../componentes/ContenedorFormulario";
import Formulario from "../componentes/Formulario";
import Input from "../componentes/Input";
import Boton from "../componentes/Boton";
import EncabezadoFormulario from "../componentes/EncabezadoFormulario";

const Registro = () => {

    const history = useNavigate();
    const [email, cambiarEmail] = useState("");
    const [password, cambiarPassword] = useState("");
    const {usuario} = useAuth();

    useEffect(() => {
        if(usuario) {
            history("/")
        }
    }, [usuario, history]) /*si no ponemos corchetes para que el useEffcet se ejecute en todas las reenderizaciones del componente*/

    const registrarUsuario = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("usuario registrado con exito");
            history("/")
        } catch (error) {
            console.log(error.code)
        }


    }

    return ( 
        // <ContenedorFormulario>
            <Formulario action="">
                <EncabezadoFormulario>Registrate</EncabezadoFormulario>
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
                    onClick={registrarUsuario}
                    registerLogin
                >
                    Registrar usuario
                </Boton>
        </Formulario>
        // </ContenedorFormulario>
     );
}
 
export default Registro;