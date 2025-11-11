import React, { useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
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
    <>
      <Container
        fluid
        className={`p-5 min-vh-100 d-flex flex-column justify-content-center ${
          modoOscuro ? "bg-dark text-light" : "bg-light text-dark"
        }`}
        style={{ background: modoOscuro ? "#121212" : "#f8f9fa" }}
      >
        {/* Hero Section */}
        <Row className="align-items-center mb-5">
          <Col md={6} className="mb-4 mb-md-0 text-center text-md-start">
            <h1 className="display-3 fw-bold mb-3">
              Bienvenido al <span className="text-primary">Sistema Gestor</span>
            </h1>
            <p className="lead mb-4">
              Gestiona tus empleados, turnos e incidencias de manera fácil y rápida.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="shadow-lg"
              onClick={manejarComenzar}
              style={{
                borderRadius: "50px",
                padding: "0.75rem 2.5rem",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Comenzar
            </Button>
          </Col>

          <Col md={6} className="text-center">
            <img
              src={pp}
              alt="Gestión de empleados"
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
          </Col>
        </Row>

        {/* Funciones principales */}
        <Row className="mt-5 g-4 justify-content-center">
          <Col md={4}>
            <Card
              className={`h-100 text-center p-3 shadow-lg ${
                modoOscuro ? "bg-secondary text-light" : "bg-white text-dark"
              }`}
              style={{ borderRadius: "20px", transition: "transform 0.3s" }}
            >
              <Card.Body>
                <Card.Title className="fw-bold mb-3">Registro de Asistencia</Card.Title>
                <Card.Text>Marca entradas y salidas de tus empleados fácilmente.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className={`h-100 text-center p-3 shadow-lg ${
                modoOscuro ? "bg-secondary text-light" : "bg-white text-dark"
              }`}
              style={{ borderRadius: "20px", transition: "transform 0.3s" }}
            >
              <Card.Body>
                <Card.Title className="fw-bold mb-3">Gestión de Turnos</Card.Title>
                <Card.Text>Organiza los horarios y turnos de tus empleados con facilidad.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className={`h-100 text-center p-3 shadow-lg ${
                modoOscuro ? "bg-secondary text-light" : "bg-white text-dark"
              }`}
              style={{ borderRadius: "20px", transition: "transform 0.3s" }}
            >
              <Card.Body>
                <Card.Title className="fw-bold mb-3">Control de Incidencias</Card.Title>
                <Card.Text>Registra y gestiona incidencias y reportes de manera rápida.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer
        className={`py-3 mt-auto text-center ${
          modoOscuro ? "bg-dark text-light" : "bg-light text-muted"
        }`}
        style={{ borderTop: modoOscuro ? "1px solid #444" : "1px solid #ddd" }}
      >
        © 2025 Grupo_5 
      </footer>
    </>
  );
};

export default Inicio;
