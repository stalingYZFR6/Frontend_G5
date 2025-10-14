import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // <-- Importar useNavigate
import pp from "../assets/pp.jpeg"; // <-- importa la imagen desde src/assets

const Inicio = () => {
  const navigate = useNavigate(); // <-- Inicializar useNavigate

  const manejarComenzar = () => {
    navigate("/registroasistencia"); // <-- Redirige a Registro de Asistencias
  };

  return (
    <Container className="mt-5">
      {/* Sección principal con título y subtítulo */}
      <Row className="align-items-center text-center text-md-start">
        <Col md={6} className="mb-4 mb-md-0">
          <h1 className="display-4 fw-bold text-dark">
            Bienvenido al Sistema Gestor de Empleados
          </h1>
          <p className="lead text-secondary">
            Gestiona tus empleados, turnos e incidencias de manera fácil y rápida.
          </p>
          <Button variant="primary" size="lg" onClick={manejarComenzar}>
            Comenzar
          </Button>
        </Col>

        {/* Imagen decorativa */}
        <Col md={6} className="text-center">
          <img
            src={pp}  // <-- usa la variable importada
            alt="Gestión de empleados"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "100px", objectFit: "cover" }}
          />
        </Col>
      </Row>

      {/* Sección adicional */}
      <Row className="mt-5 text-center">
        <Col>
          <h3 className="fw-bold">Funciones principales</h3>
          <p className="text-muted">
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
