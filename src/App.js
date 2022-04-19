import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./routes/inicio";
import Articulo from "./routes/Articulo";
import styled from "styled-components";
import Registro from "./routes/Registro";
import Ingreso from "./routes/Ingreso";
import Favoritos from "./routes/Favoritos";
import {AuthProvider} from "./hooks/authContext";
import RutaProtegida from "./componentes/RutaPrivada";

const App = () => {
  const [resultados, cambiarResultados] = useState([{id: 3, mensaje: "Haz tu busquedad desde el formulario"}]);
  const [loading, setLoading] = useState(false);

  return (
    <AuthProvider>
      <ContenedorApp>
        <Routes>

          <Route path="/registro" element={<Registro />}/>
          <Route path="/ingreso" element={<Ingreso />}/>
          <Route element={<RutaProtegida />}>
            <Route path="/" exact="true" element={<Inicio resultados={resultados} cambiarResultados={cambiarResultados} loading={loading} setLoading={setLoading}/> }/>
            <Route path="/articulo/:id" element={<Articulo />}/>
            <Route path="/favoritos" element={<Favoritos/>}/>
          </Route>
        </Routes>
      </ContenedorApp>
    </AuthProvider>
  );
}

const ContenedorApp = styled.div`
    width:70%;
    margin-left:auto;
    margin-right:auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

export default App;
