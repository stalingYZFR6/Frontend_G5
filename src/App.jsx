import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext.jsx";

// Componentes
import Encabezado from "./components/navegacion/Encabezado";
import BotonTema from "./components/BotonTema.jsx";

// Vistas
import Login from "./views/Login.jsx";
import Inicio from "./views/Inicio";
import Empleados from "./views/Empleados";
import CatalogoEmpleados from "./views/CatalogoEmpleados.jsx";
import Incidencias from "./views/Incidencias";
import RegistroAsistencia from "./views/RegistroAsistencia";
import Rol from "./views/Rol";
import Turnos from "./views/Turnos";
import Usuarios from "./views/Usuarios";

// Rutas protegidas
import RutaProtegida from "./components/rutas/RutaProtegida.jsx";

import "./App.css";

const App = () => {
  const { modoOscuro } = useContext(ThemeContext);

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
          {/* Ruta pública */}
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />

          {/* Rutas protegidas */}
          <Route path="/empleados" element={<RutaProtegida vista={<Empleados />} />} />
          <Route path="/catalogo-empleados" element={<RutaProtegida vista={<CatalogoEmpleados />} />} />
          <Route path="/incidencias" element={<RutaProtegida vista={<Incidencias />} />} />
          <Route path="/registroAsistencia" element={<RutaProtegida vista={<RegistroAsistencia />} />} />
          <Route path="/rol" element={<RutaProtegida vista={<Rol />} />} />
          <Route path="/turnos" element={<RutaProtegida vista={<Turnos />} />} />
          <Route path="/usuarios" element={<RutaProtegida vista={<Usuarios />} />} />

          {/* Ruta comodín */}
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;


