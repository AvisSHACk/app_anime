import { useState } from "react";
import ContenedorCards from "./componentes/ContenedorCards";
import FormularioBuscar from "./componentes/FormularioBuscar";

const App = () => {
  const [resultados, cambiarResultados] = useState([]);

  return (
    <>
      <FormularioBuscar cambiarResultados={cambiarResultados}/>
      <ContenedorCards resultados={resultados}/>
    </>
  );
}

export default App;
