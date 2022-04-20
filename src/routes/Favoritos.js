import { useState, useEffect } from "react";
import {db, collection, onSnapshot, query, where, limit} from './../firebase/firebaseConfig';
import Cards from "../componentes/Cards";
import ContenedorCard from "./../componentes/ContenedorCard";
import {useAuth} from "./../hooks/authContext";
import BotonCerrarSesion from "../componentes/BotonCerrarSesion";
import ContenedorButtons from "../componentes/ContenedorButtons";
import Header from "../componentes/Header";
import BotonVolver from "../componentes/BotonVolver";
import {ContenedorMensaje, Mensaje, ImagenMensaje} from "../componentes/AvisoCargando";
import kanna from "../img/kanna.png"
const Favoritos = ({cambiarResultados}) => {

    const [animes, cambiarAnime] = useState([]);
    const {usuario} = useAuth();
    const [loading, cambiarLoading] = useState(false);

    useEffect(() => {
        cambiarLoading(true)
        const onSuscribe = onSnapshot(query(collection(db, "favoritos"),
        where('uidUsuario', '==', usuario.uid ),
        limit(10)),
        (snapshot) => {
            cambiarLoading(true)
            cambiarAnime(snapshot.docs.map((anime) => {
                return anime.data()
            }))
            cambiarLoading(false)
        })
        // cambiarTodosLosDatosObtenidos(true)
        return onSuscribe;
        
        
        // return onSuscribe;
    }, [usuario])
    
    // console.log(todosLosDatosObtenidos)
    
    return ( 
        <>
            {/* {anime[0] && <Cards resultado={anime[0].anime}/>} */}
            <Header />
            <ContenedorButtons>
                <BotonVolver/>
                <BotonCerrarSesion cambiarResultados={cambiarResultados}/>
            </ContenedorButtons>
            <h2>Mis favoritos</h2>
            <ContenedorCard>
                {loading && <p>Cargando</p>}
                {animes.map((anime) => {
                        // console.log(anime.anime)
                        return <Cards key={anime.anime.mal_id} resultado={anime.anime}/>
                    })
                }

            </ContenedorCard>
            {!loading && animes.length === 0 &&
                <ContenedorMensaje>
                    <Mensaje>No hay favoritos</Mensaje>
                    <ImagenMensaje src={kanna} alt="" />
                </ContenedorMensaje>
            }
        </>
        
     );
}
 
export default Favoritos;