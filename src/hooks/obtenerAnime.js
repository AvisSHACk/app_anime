import { useState, useEffect } from "react";

const ObtenerAnime = (id) => {
    const [anime, cambiarAnime] = useState({});

    
    useEffect(() => {
        const buscarAnime = async () => {
            let peticion =  await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            let datos = await peticion.json()
            cambiarAnime({...datos.data})
            // console.log("hook obteneranime")
        }
        buscarAnime();

    }, [id])

    // if(anime.title) {
    //     console.log("el estado anime de la funcion obtener anime tiene valor")
    // } else {
    //     console.log("el estado anime de la funcion obtener anime no tiene valor")
    // }

    return anime;
}
 
export default ObtenerAnime;