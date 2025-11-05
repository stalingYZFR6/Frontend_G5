import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pp from "../assets/pp.jpeg";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Inicio = () => {
  const navigate = useNavigate();
  const { modoOscuro } = useContext(ThemeContext);

  const manejarComenzar = () => {
    navigate("/registroasistencia");
  };

  return (
    <Container className={`mt-5 ${modoOscuro ? "text-light" : "text-dark"}`}>
      {/* Sección principal con título y subtítulo */}
      <Row className="align-items-center text-center text-md-start mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <h1 className={`display-4 fw-bold ${modoOscuro ? "text-light" : "text-dark"}`}>
            Bienvenido al Sistema Gestor de Empleados
          </h1>
          <p className={`lead ${modoOscuro ? "text-secondary" : "text-muted"}`}>
            Gestiona tus empleados, turnos e incidencias de manera fácil y rápida.
          </p>
          <Button 
            variant={modoOscuro ? "light" : "primary"} 
            size="lg" 
            onClick={manejarComenzar}
          >
            Comenzar
          </Button>
        </Col>

        {/* Imagen decorativa */}
        <Col md={6} className="text-center">
          <img
            src={pp}
            alt="Gestión de empleados"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "100px", objectFit: "cover" }}
          />
        </Col>
      </Row>

      {/* Sección de Funciones principales más abajo */}
      <Row className="mt-5 pt-5 text-center">
        <Col>
          <h3 className={`fw-bold ${modoOscuro ? "text-light" : ""}`}>Funciones principales</h3>
          <p className={`${modoOscuro ? "text-secondary" : "text-muted"}`}>
            - Registro de asistencia <br />
            - Gestión de turnos <br />
            - Control de incidencias
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Inicio;

