import { useState } from "react";
const FormularioBuscar = ({cambiarResultados}) => {
    const [buscar, cambiarBuscar] = useState("");

    const buscarAnime = async (e) => {
        e.preventDefault();
        let peticion =  await fetch(`https://api.jikan.moe/v4/anime?q=${buscar}&order_by=title&sort=asc&limit=100`);
        let datos = await peticion.json()
        console.log(datos);
        cambiarResultados(datos.data.slice(0));
    }
    
    return ( 
        <form action="">
            <input 
                type="text" 
                name="buscar"
                id="buscar"
                value={buscar}
                onChange={e => cambiarBuscar(e.target.value)}
            />
            <button type="submit" onClick={e => buscarAnime(e)}>Buscar</button>
        </form>
     );
}
 
export default FormularioBuscar;