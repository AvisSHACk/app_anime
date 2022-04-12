import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {db, addDoc, collection, onSnapshot, query, where, limit} from "./../firebase/firebaseConfig";
import ObtenerAnime from "../hooks/obtenerAnime";
import {useAuth} from "./../hooks/authContext";

const Articulos = () => {
    const {id} = useParams();
    const anime = ObtenerAnime(id);
    const {usuario} = useAuth();
    const [yaEstaEnFavoritos, cambiarYaEstaEnFavoritos] = useState(false);
    const [todosLosDatosObtenidos, cambiarTodosLosDatosObtenidos] = useState(false);
    ;
    // console.log(anime)
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

    const agregarFavoritos = (e) => {

        if(!yaEstaEnFavoritos) {
            addDoc(collection(db, "favoritos"), {
                titulo: `${anime.title}${usuario.uid}`,
                anime: anime,
                uidUsuario: usuario.uid
            }).then(() => {
                console.log("se ha agregado la coleccion")
            }).catch((e) => {
                console.log("Hubo un error" + e)
            })
        } else {
            console.log("No se puede agregar un campo repetido")
        }
    }

    useEffect(() => {
        const onSuscribe = onSnapshot(query(collection(db, "favoritos"),
        where('titulo', '==', `${anime.title}${usuario.uid}` ),
        limit(10)),
        (snapshot) => {
            // cambiarAnime(snapshot.docs.map((anime) => {
            //     return anime.data()
            // }))
            snapshot.docs.map((anime) => {
                if(anime) {
                    cambiarYaEstaEnFavoritos(true);
                }

                return null;
            })

            cambiarTodosLosDatosObtenidos(true)

        })
        return onSuscribe;


        // return onSuscribe;
    }, [usuario, anime])

    return ( 
        <>  
            {/*Hacemos una comprobacion, si el objeto que devuelve no esta vacio, si lo esta no hace nada
            caso contrario me muestra la informacion, si no hago eso me saldra error y que detendra el programa*/}
            {anime.title && todosLosDatosObtenidos? 
                <>
                    {console.log("dadaws")}
                    <h1>{anime.title}</h1> 
                    <img src={anime.images.jpg.image_url} alt="" />
                    <p>Publico: {anime.rating}</p>
                    <p>Año: {anime.year}</p>
                    <p>Calificacion: {anime.score}</p>
                    <p>Estado: {anime.status}</p>

                    {!yaEstaEnFavoritos ? 
                        <button onClick={agregarFavoritos}>Agregar a favoritos</button>

                    :
                    <p>ya esta en favoritos</p>
                    }

                    
                    {/* {yaEstaEnFavoritos ? 
                        <p>No se puede agregar dos veces un mismo anime a favoritos</p>
                    :
                    <p></p> */}
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