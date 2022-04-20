import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./routes/inicio";
import Articulo from "./routes/Articulo";
import styled from "styled-components";
import Registro from "./routes/Registro";
import Ingreso from "./routes/Ingreso";
import Favoritos from "./routes/Favoritos";
import Error404 from "./routes/Error404";
import {AuthProvider} from "./hooks/authContext";
import RutaProtegida from "./componentes/RutaPrivada";

const App = () => {
  const [resultados, cambiarResultados] = useState([{id: 3, mensaje: "Haz tu busquedad"}]);
  const [loading, setLoading] = useState(false);

  return (
    <AuthProvider>
      <ContenedorApp>
        <Routes>

          <Route path="/registro" element={<Registro />}/>
          <Route path="/ingreso" element={<Ingreso />}/>
          <Route element={<RutaProtegida />}>
            <Route path="/" exact="true" element={<Inicio resultados={resultados} cambiarResultados={cambiarResultados} loading={loading} setLoading={setLoading}/> }/>
            <Route path="/articulo/:id" element={<Articulo cambiarResultados={cambiarResultados}/>}/>
            <Route path="/favoritos" element={<Favoritos cambiarResultados={cambiarResultados}/>}/>
          </Route>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </ContenedorApp>
    </AuthProvider>
  );
}

const ContenedorApp = styled.div`
    width:70%;
    max-width: 780px;
    margin-left:auto;
    margin-right:auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

export default App;
