import {useState } from "react";
import styled from "styled-components";
const FormularioBuscar = ({cambiarResultados, setLoading}) => {
    const [buscar, cambiarBuscar] = useState("");

    const buscarAnime = async (e) => {
        setLoading(true)
        e.preventDefault();
        let peticion =  await fetch(`https://api.jikan.moe/v4/anime?q=${buscar}&order_by=title&sort=asc&limit=100`);
        // let peticion =  await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09J7y2eSWyYeAAa8Ne4mu3Wg4VAAMtzZXP&q=chiclayo&language=es&details=true`);
        
        let datos = await peticion.json()
        // console.log(datos);
        cambiarResultados(datos.data);
        setLoading(false)
    }

    // console.log(buscar)
    
    return ( 
        <ContenedorFormulario action="">
            <Input 
                type="text" 
                name="buscar"
                id="buscar"
                value={buscar}
                onChange={e => cambiarBuscar(e.target.value)}
                placeholder="Haz tu busquedad onichan"
            />
            <Button type="submit" onClick={e => buscarAnime(e)}>Buscar</Button>
        </ContenedorFormulario>
     );
}

const ContenedorFormulario = styled.form`
    display: flex;
    position: relative;

`

const Input = styled.input`
    width: 100%;
    padding:1rem .6rem;
    border-radius: 20px;
    border:2px solid #ccc;
    outline: 0;
    transition: border .2s;
    &:focus {
        border:2px solid #3a3a3a;
    }
`

const Button = styled.button`
    position: absolute;
    right: 0;
    padding:1rem .6rem;
    background:none;
    border: 0;
    cursor: pointer;
`
export default FormularioBuscar;