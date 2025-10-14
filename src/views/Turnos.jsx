import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const Turnos = () => {
  // Datos de ejemplo, en un proyecto real vendrían de una API o base de datos
  const turnos = [
    {
      id: 1,
      empleado: "Gerson Magdiel",
      fecha: "2025-10-14",
      hora_inicio: "08:00",
      hora_fin: "16:00",
      tipo_turno: "mañana",
    },
    {
      id: 2,
      empleado: "Staling",
      fecha: "2025-10-14",
      hora_inicio: "16:00",
      hora_fin: "00:00",
      tipo_turno: "tarde",
    },
    {
      id: 3,
      empleado: "Magdiel",
      fecha: "2025-10-14",
      hora_inicio: "00:00",
      hora_fin: "08:00",
      tipo_turno: "noche",
    },
  ];

  return (
    <Container className="mt-5">
      {/* Sección principal con título y descripción */}
      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Gestión de Turnos</h1>
          <p className="lead text-secondary">
            Visualiza y administra los turnos de los empleados de manera sencilla.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nuevo Turno
          </Button>
        </Col>
      </Row>

      {/* Tabla de turnos */}
      <Row>
        <Col>
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Empleado</th>
                <th>Fecha</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Tipo de Turno</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map((turno) => (
                <tr key={turno.id}>
                  <td>{turno.id}</td>
                  <td>{turno.empleado}</td>
                  <td>{turno.fecha}</td>
                  <td>{turno.hora_inicio}</td>
                  <td>{turno.hora_fin}</td>
                  <td>{turno.tipo_turno}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2">
                      Editar
                    </Button>
                    <Button variant="danger" size="sm">
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Turnos;
