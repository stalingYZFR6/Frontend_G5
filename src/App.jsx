import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// Importar archivo de estilos
import "./App.css";


const App = () => {
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/registroAsistencia" element={<RegistroAsistencia />} />
          <Route path="/rol" element={<Rol />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          {/* Opcional: ruta para 404 */}
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
