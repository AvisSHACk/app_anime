import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {db, addDoc, collection, query, where, deleteDoc, doc, getDocs} from "./../firebase/firebaseConfig";
import ObtenerAnime from "../hooks/obtenerAnime";
import {useAuth} from "./../hooks/authContext";
import styled from "styled-components";

const Articulos = () => {
    // console.log("primea linea del componente")
    const {id} = useParams();
    const anime = ObtenerAnime(id);
    const [animeFirebase, cambiarAnimeFirebase] = useState({})
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

    const borrarFavoritos = (e) => {
        deleteDoc(doc(db, "favoritos", animeFirebase.id))
        .then(()=>{
            console.log("se ha quitado la coleccion")
        });
        cambiarYaEstaEnFavoritos(false);
    }

    useEffect(() => {
        // const onSuscribe = onSnapshot(query(collection(db, "favoritos"),
        // where('titulo', '==', `${anime.title}${usuario.uid}` )),
        // (snapshot) => {
        //     // cambiarAnime(snapshot.docs.map((anime) => {
        //     //     return anime.data()
        //     // }))
        //         snapshot.docs.map((anime) => {
        //             cambiarAnimeFirebase({...anime, id:anime.id})
        //             cambiarYaEstaEnFavoritos(true);
        //             return null;
        //         })
        //         console.log("seteando loading")
        //         setLoading(false);
        //         // console.log(anime)
        //         // cambiarTodosLosDatosObtenidos(true)
                
        
        // })
        // return onSuscribe;
        // console.log("dasda")
        const consultaFuncion = async () => {
            const q = query(collection(db, "favoritos"),where('titulo', '==', `${anime.title}${usuario.uid}` ));
            const consulta = await getDocs(q)
    
            consulta.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.data());
                cambiarAnimeFirebase({...doc.data(), id:doc.id})
                // console.log(doc.id, " => ", doc.data());
                cambiarYaEstaEnFavoritos(true);
            });
            
        }
        setLoading(false);
        
            consultaFuncion()
        // return onSuscribe;
    }, [anime.title, usuario.uid])
    
    // if(anime.title) {
    //     console.log("la variable anime tiene valor")
    // } else {
    //     console.log("la variable anime no tiene valor")
    // }

    // if(yaEstaEnFavoritos) {
    //     console.log("El estado yaEstaEnFavoritos cambio")
    // } else {
    //     console.log("El estado yaEstaEnFavoritos aun no ha cambiado")
    // }

    // if(!loading) {
    //     console.log("El estado loading es false")
    // } else {
    //     console.log("loading sigue en true")
    // }

    // console.log(yaEstaEnFavoritos)

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

                                {!yaEstaEnFavoritos ? 
                                    <ButtonFavoritos onClick={agregarFavoritos}>Agregar a favoritos</ButtonFavoritos>
                                :
                                <ButtonFavoritos onClick={borrarFavoritos}>Quitar de favoritos</ButtonFavoritos>
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

const ButtonFavoritos = styled.button`
    color:#000;
`;
 
export default Articulos;