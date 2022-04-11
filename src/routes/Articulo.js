import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
import ObtenerAnime from "../hooks/obtenerAnime";

const Articulos = () => {
    const {id} = useParams();
    const anime = ObtenerAnime(id);
    console.log(anime)
    // const [anime, cambiarAnime] = useState({});

    // useEffect(() => {
    //     const buscarAnime = async () => {
    //         console.log("buscando anime")
    //         let peticion =  await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    //         let datos = await peticion.json()
    //         cambiarAnime({...datos.data})
    //     }

    //     buscarAnime();
    // }, [id])
    // console.log(anime)

    return ( 
        <>  
            {/*Hacemos una comprobacion, si el objeto que devuelve no esta vacio, si lo esta no hace nada
            caso contrario me muestra la informacion, si no hago eso me saldra error y que detendra el programa*/}
            {anime.title ? 
                <>
                    <h1>{anime.title}</h1> 
                    <img src={anime.images.jpg.image_url} alt="" />
                    <p>Publico: {anime.rating}</p>
                    <p>Año: {anime.year}</p>
                    <p>Calificacion: {anime.score}</p>
                    <p>Estado: {anime.status}</p>
                    {/* <p>Estudio: {anime.studios[0].name}</p> */}
                    {/* <p>{anime.genres[0].name}</p> */}
                </>
            :
                <p>Cargando</p>
            }


        </>
    );
}
 
export default Articulos;