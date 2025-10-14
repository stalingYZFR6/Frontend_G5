import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const Incidencias = () => {
  // Datos de ejemplo, luego los obtendrás de la base de datos
  const incidencias = [
    {
      id_incidencia: 1,
      empleado: "Gerson Magdiel",
      tipo_incidencia: "retraso",
      descripcion: "Llegó 30 minutos tarde",
      fecha_incidencia: "2025-10-14",
    },
    {
      id_incidencia: 2,
      empleado: "Staling Gosling",
      tipo_incidencia: "permiso",
      descripcion: "Permiso por cita médica",
      fecha_incidencia: "2025-10-12",
    },
  ];

  return (
    <Container className="mt-5">
      {/* Título */}
      <Row className="text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">
            Registro de Incidencias
          </h1>
          <p className="lead text-secondary">
            Aquí puedes visualizar y gestionar las incidencias de los empleados.
          </p>
          <Button variant="primary" size="lg">
            Nueva Incidencia
          </Button>
        </Col>
      </Row>

      {/* Tabla de Incidencias */}
      <Row>
        <Col>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Empleado</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {incidencias.map((inc) => (
                <tr key={inc.id_incidencia}>
                  <td>{inc.id_incidencia}</td>
                  <td>{inc.empleado}</td>
                  <td>{inc.tipo_incidencia}</td>
                  <td>{inc.descripcion}</td>
                  <td>{inc.fecha_incidencia}</td>
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

export default Incidencias;
