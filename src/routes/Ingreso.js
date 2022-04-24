import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import { auth, signInWithEmailAndPassword } from "../firebase/firebaseConfig";
import Formulario from "../componentes/Formulario";
import Input from "../componentes/Input";
import Boton from "../componentes/Boton";
import EncabezadoFormulario from "../componentes/EncabezadoFormulario";
import Alerta from "../componentes/Alerta";

const Ingreso = () => {
    const history = useNavigate();
    const [email, cambiarEmail] = useState("");
    const [password, cambiarPassword] = useState("");
    const [alerta, cambiarAlerta] = useState();
    const {usuario} = useAuth();

    useEffect(() => {
        if(usuario) {
            history("/")
        }
    }, [usuario, history]) /*si no ponemos corchetes para que el useEffcet se ejecute en todas las reenderizaciones del componente*/

    const iniciarSesion = async (e) => {
        e.preventDefault();

        if(email !== "" && password !== "") {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                history("/")
            } catch (error) {
                console.log(error)
            }
        } else {
            cambiarAlerta("Los campos no pueden estar vacios");
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

            {alerta && <Alerta>{alerta}</Alerta>}
        </Formulario>
     );
}
 
export default Ingreso;