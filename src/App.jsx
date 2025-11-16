import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext.jsx"; // <-- importar el contexto

// Importar componente Encabezado
import Encabezado from "./components/navegacion/Encabezado";

// Importar las vistas
import Inicio from "./views/Inicio";
import Empleados from "./views/Empleados"; 
import Incidencias from "./views/Incidencias";
import RegistroAsistencia from "./views/RegistroAsistencia";
import Rol from "./views/Rol";
import Turnos from "./views/Turnos";
import Usuarios from "./views/Usuarios";
import CatalogoEmpleados from "./views/CatalogoEmpleados.jsx";

// Importar botón de modo oscuro
import BotonTema from "./components/BotonTema.jsx";

// Importar archivo de estilos
import "./App.css";

const App = () => {
  const { modoOscuro } = useContext(ThemeContext);

  // Aplicar clase al body según el tema
  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [modoOscuro]);

  return (
    <Router>
      <Encabezado />
      <header className="d-flex justify-content-end p-2">
        <BotonTema />
      </header>
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/catalogo-empleados" element={<CatalogoEmpleados />} />
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/registroAsistencia" element={<RegistroAsistencia />} />
          <Route path="/rol" element={<Rol />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

