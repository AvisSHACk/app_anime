import {useState } from "react";
import { ContenedorSearch, InputSearch, ButtonSearch } from "./ElementosSearch";
const FormularioBuscar = ({cambiarResultados, setLoading}) => {
    const [buscar, cambiarBuscar] = useState("");

    const fetchData = async (e) => {
        setLoading(true)
        let peticion =  await fetch(`https://api.jikan.moe/v4/anime?q=${buscar}&order_by=title&sort=asc&limit=100`);
        // let peticion =  await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09J7y2eSWyYeAAa8Ne4mu3Wg4VAAMtzZXP&q=chiclayo&language=es&details=true`);
        
        let datos = await peticion.json();
        console.log(datos.data.length);

        if(datos.data.length) {
            cambiarResultados(datos.data);
        } else {
            cambiarResultados([{id: 1, mensaje: "Sin resultados"}]);
        }
        setLoading(false);
    }

    const buscarAnime = (e) => {
        e.preventDefault();

        if(buscar !== "") {
            fetchData(e);
        } else {
            setLoading(true)
            cambiarResultados([{id:2, mensaje: "Por favor llena el formulario"}]);
            setLoading(false);
        }
    }

    // console.log(buscar)
    
    return ( 
        <ContenedorSearch onSubmit={buscarAnime}>
            <InputSearch 
                type="text" 
                name="buscar"
                id="buscar"
                value={buscar}
                onChange={e => cambiarBuscar(e.target.value)}
                placeholder="Haz tu busquedad onichan"
            />
            <ButtonSearch type="submit">Buscar</ButtonSearch>
        </ContenedorSearch>
     );
}

export default FormularioBuscar;