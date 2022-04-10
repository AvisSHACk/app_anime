import { useState, useEffect } from "react";

const ObtenerAnime = (id) => {
    const [anime, cambiarAnime] = useState({});

    useEffect(() => {
        const buscarAnime = async () => {
            let peticion =  await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            let datos = await peticion.json()
            cambiarAnime({...datos.data})
        }

        buscarAnime();
    }, [id])
    console.log(anime)
    return anime;
}
 
export default ObtenerAnime;