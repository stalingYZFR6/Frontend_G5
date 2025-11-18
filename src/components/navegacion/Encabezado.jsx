import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, Modal, Button } from "react-bootstrap";
import BotonTema from "../BotonTema.jsx";

const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarModalCerrar, setMostrarModalCerrar] = useState(false); // Estado del modal
  const navigate = useNavigate();

  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  // Abre el modal de confirmación
  const intentarCerrarSesion = () => {
    setMostrarModalCerrar(true);
  };

  // Confirma y cierra sesión
  const confirmarCerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contrasena");
    setMostrarModalCerrar(false);
    navigate("/"); // Redirige al login
  };

  const colorFondoNavbar = "#000000ff";
  const colorTextoNormal = "#ffbd08ff";
  const colorTextoActivo = "#ff0000ff";

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        expand="md"
        fixed="top"
        style={{
          backgroundColor: colorFondoNavbar,
          boxShadow: "0 2px 8px rgba(68, 13, 105, 1)",
          zIndex: 10,
        }}
      >
        <Container>
          <Navbar.Brand
            onClick={() => manejarNavegacion("/")}
            style={{
              color: colorTextoActivo,
              fontSize: "1.8rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sistema Gestor De Empleados
          </Navbar.Brand>

          {/* Botón para cambiar tema */}
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
              <Offcanvas.Title style={{ color: colorTextoNormal }}>
                Menú principal
              </Offcanvas.Title>
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

                {/* Ícono de Cerrar Sesión que abre modal */}
                <Nav.Link
                  onClick={intentarCerrarSesion}
                  style={{
                    color: "red",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    marginTop: "-0.2rem",
                  }}
                >
                  <i className="bi-door-open-fill"></i>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* BARRA NEÓN INFERIOR */}
      <div
        style={{
          height: "4px",
          width: "100%",
          background: "#ff00ff",
          boxShadow: "0 0 8px #ff00ff, 0 0 15px #ff00ff, 0 0 25px #ff00ff",
          position: "fixed",
          top: "64px",
          left: 0,
          zIndex: 9,
        }}
      ></div>

      {/* MODAL DE CONFIRMACIÓN DE CIERRE DE SESIÓN */}
      <Modal
        show={mostrarModalCerrar}
        onHide={() => setMostrarModalCerrar(false)}
        centered
        backdrop="static"
        keyboard={false}
        className="text-center"
      >
        <Modal.Dialog style={{ maxWidth: "350px", margin: "0 auto" }}>
          <Modal.Header
            closeButton
            style={{ borderBottom: "none", justifyContent: "center", padding: "1rem" }}
          >
            <i
              className="bi bi-exclamation-triangle-fill"
              style={{ fontSize: "2rem", color: "#ff4d4f" }}
            ></i>
          </Modal.Header>

          <Modal.Body style={{ padding: "0 1.5rem 1rem 1.5rem" }}>
            <h6 style={{ marginBottom: "0.5rem" }}>¿Estás seguro que quieres salir?</h6>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>
              Esta acción cerrará tu sesión actual.
            </p>
          </Modal.Body>

          <Modal.Footer style={{ justifyContent: "center", borderTop: "none", padding: "0.5rem 1rem 1rem 1rem" }}>
            <Button
              variant="outline-secondary"
              onClick={() => setMostrarModalCerrar(false)}
              style={{ minWidth: "80px", fontSize: "0.85rem" }}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmarCerrarSesion}
              style={{ minWidth: "80px", fontSize: "0.85rem" }}
            >
              Salir
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>


    </>
  );
};

export default Encabezado;

