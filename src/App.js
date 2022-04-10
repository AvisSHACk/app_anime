import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./routes/inicio";
import Articulo from "./routes/Articulo";

const App = () => {
  const [resultados, cambiarResultados] = useState([]);

  return (

    <Routes>
      <Route path="/" exact="true" element={<Inicio resultados={resultados} cambiarResultados={cambiarResultados}/>}/>
      <Route path="/articulo/:id" element={<Articulo />}/>
    </Routes>
  );
}

export default App;
