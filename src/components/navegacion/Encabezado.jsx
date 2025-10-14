import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  // Alternar visibilidad del menú
  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  // Navegar y cerrar menú
  const manejarNavegacion = (ruta) => {
    navigate(ruta);

    setMostrarMenu(false);
  };

  return (
    <Navbar expand="md" fixed="top" className="bg-primary">
      <Container>
       <Navbar.Brand
  onClick={() => manejarNavegacion("/inicio")}
  className="fw-bold"
  style={{
    color: "black",          // 🔹 color del texto
    fontSize: "1.8rem",      // 🔹 tamaño de la letra (puedes ajustar a tu gusto)
    fontWeight: "bold",      // 🔹 texto en negrita
  }}
>
  Sistema Gestor De Empleados
</Navbar.Brand>

        <Navbar.Toggle
          aria-controls="menu-offcanvas"
          onClick={manejarToggle}
          className="bg-light"
        />
        <Navbar.Offcanvas
          id="menu-offcanvas"
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
     
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú principal</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              
              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                 onClick={() => manejarNavegacion("/")}
                >
                  {mostrarMenu ? <i className="bi-house-fill me-2"></i> : null} Inicio
                </Nav.Link>

              <Nav.Link 
               className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/empleados")}
               >
                {mostrarMenu ? <i className="bi-person-vcard-fill me-2"></i> : null} Empleados
                </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                 onClick={() => manejarNavegacion("/incidencias")}
                >
                  {mostrarMenu ? <i className="bi bi-exclamation-triangle"></i> : null} Incidencias
                  </Nav.Link>

              <Nav.Link
               className={mostrarMenu ? "texto-marca" : "text-white"} 
               onClick={() => manejarNavegacion("/registroasistencia")}
               >
                {mostrarMenu ? <i className="bi bi-card-checklist"></i> : null} RegistroAsistencia
                </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                 onClick={() => manejarNavegacion("/rol")}
                >
                  {mostrarMenu ? <i className="bi-person-badge-fill me-2"></i> : null} Rol
                  </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                 onClick={() => manejarNavegacion("/turnos")}
                >
                  {mostrarMenu ? <i className="bi bi-front"></i> : null} Turnos
                  </Nav.Link>

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;