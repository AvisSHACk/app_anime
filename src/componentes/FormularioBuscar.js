import {useState } from "react";
import { ContenedorSearch, InputSearch, ButtonSearch } from "./ElementosSearch";
const FormularioBuscar = ({cambiarResultados, setLoading}) => {
    const [buscar, cambiarBuscar] = useState("");

    const buscarAnime = async (e) => {
        setLoading(true)
        e.preventDefault();
        let peticion =  await fetch(`https://api.jikan.moe/v4/anime?q=${buscar}&order_by=title&sort=asc&limit=100`);
        // let peticion =  await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09J7y2eSWyYeAAa8Ne4mu3Wg4VAAMtzZXP&q=chiclayo&language=es&details=true`);
        
        let datos = await peticion.json();
        // console.log(datos);
        cambiarResultados(datos.data);
        setLoading(false);
    }

    // console.log(buscar)
    
    return ( 
        <ContenedorSearch action="">
            <InputSearch 
                type="text" 
                name="buscar"
                id="buscar"
                value={buscar}
                onChange={e => cambiarBuscar(e.target.value)}
                placeholder="Haz tu busquedad onichan"
            />
            <ButtonSearch type="submit" onClick={e => buscarAnime(e)}>Buscar</ButtonSearch>
        </ContenedorSearch>
     );
}

export default FormularioBuscar;