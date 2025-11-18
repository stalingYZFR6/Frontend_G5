import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import BotonTema from "../BotonTema.jsx";

const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  const colorFondoNavbar = "#000000ff"; // Gris oscuro
  const colorTextoNormal = "#ffbd08ff"; // Gris claro
  const colorTextoActivo = "#ff0000ff"; // Dorado

  return (
    <Navbar
      expand="md"
      fixed="top"
      style={{ backgroundColor: colorFondoNavbar, boxShadow: "0 2px 8px rgba(68, 13, 105, 1)" }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/")}
          style={{ color: colorTextoActivo, fontSize: "1.8rem", fontWeight: "bold", cursor: "pointer" }}
        >
          Sistema Gestor De Empleados
        </Navbar.Brand>

        <header className="d-flex justify-content-end p-2">
          <BotonTema />
        </header>

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
          style={{ backgroundColor: "#111147ff" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title style={{ color: colorTextoNormal }}>Menú principal</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              {[
                { ruta: "/", icon: "bi-house-fill", label: "Inicio" },
                { ruta: "/empleados", icon: "bi-person-vcard-fill", label: "Empleados" },
                { ruta: "/catalogo-empleados", icon: "bi-card-image", label: "Catálogo Empleados" },
                { ruta: "/incidencias", icon: "bi-exclamation-triangle", label: "Incidencias" },
                { ruta: "/registroasistencia", icon: "bi-card-checklist", label: "Registro Asistencia" },
                { ruta: "/rol", icon: "bi-person-badge-fill", label: "Rol" },
                { ruta: "/turnos", icon: "bi-front", label: "Turnos" },
                { ruta: "/usuarios", icon: "bi-people-fill", label: "Usuarios" },
              ].map((item) => (
                <Nav.Link
                  key={item.ruta}
                  onClick={() => manejarNavegacion(item.ruta)}
                  style={{
                    color: mostrarMenu ? colorTextoActivo : colorTextoNormal,
                    marginBottom: "0.3rem",
                    fontWeight: "500",
                  }}
                >
                  {mostrarMenu ? <i className={`${item.icon} me-2`}></i> : null} {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
