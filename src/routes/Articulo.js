import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {db, addDoc, collection, onSnapshot, query, where} from "./../firebase/firebaseConfig";
import ObtenerAnime from "../hooks/obtenerAnime";
import {useAuth} from "./../hooks/authContext";
import styled from "styled-components";

const Articulos = () => {
    const {id} = useParams();
    const anime = ObtenerAnime(id);
    const {usuario} = useAuth();
    const [yaEstaEnFavoritos, cambiarYaEstaEnFavoritos] = useState(false);
    const [loading, setLoading] = useState(true);

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
        where('titulo', '==', `${anime.title}${usuario.uid}` )),
        (snapshot) => {
            // cambiarAnime(snapshot.docs.map((anime) => {
            //     return anime.data()
            // }))
                snapshot.docs.map((anime) => {
                    cambiarYaEstaEnFavoritos(true);
                    return null;
                })
                setLoading(false);
                // console.log(anime)
                // cambiarTodosLosDatosObtenidos(true)


        })
        return onSuscribe;
        

        // return onSuscribe;
    }, [anime, usuario.uid])

    console.log(yaEstaEnFavoritos)

    return ( 
        <>  
            {/*Hacemos una comprobacion, si el objeto que devuelve no esta vacio, si lo esta no hace nada
            caso contrario me muestra la informacion, si no hago eso me saldra error y que detendra el programa*/}
            {anime.title && !loading ? 
                <>
                    <ContenedorArticulo>
                        <h1>{anime.title}</h1>
                        <ContenedorInformacion>
                            <ContenedorImagen>
                                <img src={anime.images.jpg.image_url} alt="" />
                            </ContenedorImagen>
                            <div>
                                <p>Publico: {anime.rating}</p>
                                <p>Año: {anime.year}</p>
                                <p>Calificacion: {anime.score}</p>
                                <p>Estado: {anime.status}</p>

                                {!yaEstaEnFavoritos && yaEstaEnFavoritos !== undefined ? 
                                    <button onClick={agregarFavoritos}>Agregar a favoritos</button>
                                :
                                <p>ya esta en favoritos</p>
                                }
                            </div>
                        </ContenedorInformacion>
                    </ContenedorArticulo>
                </>
            :
                <p>Cargando</p>
            }


        </>
    );
}

const ContenedorArticulo = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
`

const ContenedorImagen = styled.div`
    margin: 0;
`

const ContenedorInformacion = styled.div`
    display: flex;
`
 
export default Articulos;