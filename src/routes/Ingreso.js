import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import { auth, signInWithEmailAndPassword } from "../firebase/firebaseConfig";

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
        <form action="">
            <input 
                type="email" 
                name="correo"
                id="email"
                value={email}
                onChange={e => cambiarEmail(e.target.value)}
                placeholder="Email"
            />

            <input 
                type="password" 
                name="password"
                id="password"
                value={password}
                onChange={e => cambiarPassword(e.target.value)}
                placeholder="Contraseña"
            />

            <button 
                type="submit"
                onClick={iniciarSesion}
            >
                Registrar usuario
            </button>
        </form>
     );
}
 
export default Ingreso;