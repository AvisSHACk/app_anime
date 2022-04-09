const ContenedorCards = ({resultados}) => {
    return ( 
        <div className="contenedor">
            {resultados.map(resultado => (
                <article>
                    <h2>{resultado.title}</h2>
                    <img src={resultado.images.jpg.large_image_url} alt="" />
                </article>
            ))}
        </div>
     );
}
 
export default ContenedorCards;