import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const Rol = () => {
  // Datos de ejemplo, en un proyecto real vendrían de una API o base de datos
  const roles = [
    { id: 1, nombre: "Administrador" },
    { id: 2, nombre: "Cajero" },
    { id: 3, nombre: "Supervisor" },
  ];

  return (
    <Container className="mt-5">
      {/* Sección principal con título y descripción */}
      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">
            Gestión de Roles
          </h1>
          <p className="lead text-secondary">
            Visualiza, agrega o modifica los roles de los empleados.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nuevo Rol
          </Button>
        </Col>
      </Row>

      {/* Tabla de roles */}
      <Row>
        <Col>
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((rol) => (
                <tr key={rol.id}>
                  <td>{rol.id}</td>
                  <td>{rol.nombre}</td>
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

export default Rol;
