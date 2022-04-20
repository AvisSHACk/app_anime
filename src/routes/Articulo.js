import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {db, addDoc, collection, query, where, deleteDoc, doc, getDocs} from "./../firebase/firebaseConfig";
import ObtenerAnime from "../hooks/obtenerAnime";
import {useAuth} from "./../hooks/authContext";
import BotonCerrarSesion from "../componentes/BotonCerrarSesion";
import BotonMisFavoritos from "../componentes/BotonMisFavoritos";
import ContenedorButtons from "../componentes/ContenedorButtons";
import Header from "../componentes/Header";
import BotonVolver from "../componentes/BotonVolver";
import styled from "styled-components";

const Articulos = ({cambiarResultados}) => {
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

        cambiarYaEstaEnFavoritos(true);
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
            <Header />
            <ContenedorButtons>
                <BotonVolver/>
                <BotonCerrarSesion cambiarResultados={cambiarResultados}/>
            </ContenedorButtons>
            {/*Hacemos una comprobacion, si el objeto que devuelve no esta vacio, si lo esta no hace nada
            caso contrario me muestra la informacion, si no hago eso me saldra error y que detendra el programa*/}
            {anime.title && !loading ? 
                <>
                    <ContenedorAnime>
                        <ContenedorImagen>
                            <ImagenArticulo src={anime.images.jpg.image_url} alt="" />
                            {!yaEstaEnFavoritos ? 
                                <ButtonFavoritos onClick={agregarFavoritos}>Agregar a favoritos</ButtonFavoritos>
                            :
                            <ButtonFavoritos onClick={borrarFavoritos}>Quitar de favoritos</ButtonFavoritos>
                            }
                        </ContenedorImagen>
                        <ContenedorInformacion>
                            <TituloArticulo><b>Titulo: </b>{anime.title}</TituloArticulo>
                            <p><b>Sipnosis:</b> {anime.synopsis}</p>
                            <p><b>Publico:</b> {anime.rating}</p>
                            <ContenedorGenero>
                                <b>Generos:</b> 
                                {anime.genres && anime.genres.map(genre => <Genero key={genre.mal_id}>{genre.name}</Genero>)}
                            </ContenedorGenero>
                            <p><b>Rating:</b> {anime.rating}</p>
                            <p><b>Tipo:</b> {anime.type}</p>

                            <ContenedorRanked>
                                <Ranked>
                                    <p>Score</p>
                                    {anime.score}
                                </Ranked>
                                <Ranked>
                                    <p>Ranked</p>
                                    {anime.rank}
                                </Ranked>
                                <Ranked>
                                    <p>Popularity</p>
                                    {anime.popularity}
                                </Ranked>
                            </ContenedorRanked>

                            
                        </ContenedorInformacion>
                    </ContenedorAnime>
                </>
            :
                <p>Cargando</p>
            }


        </>
    );
}

const ContenedorArticulo = styled.div`
    /* width:100%;
    display: flex;
    flex-direction: column; */
`

const TituloArticulo = styled.h4`
    margin-bottom: 8px;
`

const ContenedorImagen = styled.div`
    margin: 0;
`

const ImagenArticulo = styled.img`
    border: 2px solid #fff;
    border-radius: 12px;
    overflow: hidden;
`

const ContenedorAnime = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap:20px;
`

const ButtonFavoritos = styled.button`
    width:100%;
    padding:.6rem;
    text-align: center;
    background:#CD4C82;
    margin-top:1rem;
    cursor:pointer;
    border-radius:12px;
`;

const ContenedorInformacion = styled.div`
    p {
        margin-bottom:8px;
    }
`

const ContenedorGenero = styled.ul`
    margin-top: 8px;
    margin-bottom:8px;
    display: flex;
`

const Genero = styled.ul`
    background: #CD4C82;
    margin-left:.6rem;
    padding:0 1rem;
`

const ContenedorRanked = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 1rem;
`

const Ranked = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
    background:#363636;
    font-size:1.4rem;
    color:#7C7C7C;
`
 
export default Articulos;