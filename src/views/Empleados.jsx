import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const Empleados = () => {
  // Datos de ejemplo, luego podrás traerlos de la base de datos
  const empleados = [
    {
      id_empleado: 1,
      nombre: "Gerson",
      apellido: "Magdiel",
      cedula: "123456789",
      correo: "gerson@example.com",
      telefono: "55512345",
      direccion: "Calle Principal #123",
      rol: "Administrador",
    },
    {
      id_empleado: 2,
      nombre: "Staling",
      apellido: "Gosling",
      cedula: "987654321",
      correo: "staling@example.com",
      telefono: "55567890",
      direccion: "Avenida Secundaria #456",
      rol: "Empleado",
    },
  ];

  return (
    <Container className="mt-5">
      {/* Título */}
      <Row className="text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">
            Gestión de Empleados
          </h1>
          <p className="lead text-secondary">
            Aquí puedes visualizar y administrar todos los empleados.
          </p>
          <Button variant="primary" size="lg">
            Agregar Empleado
          </Button>
        </Col>
      </Row>

      {/* Tabla de Empleados */}
      <Row>
        <Col>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <tr key={emp.id_empleado}>
                  <td>{emp.id_empleado}</td>
                  <td>{emp.nombre}</td>
                  <td>{emp.apellido}</td>
                  <td>{emp.cedula}</td>
                  <td>{emp.correo}</td>
                  <td>{emp.telefono}</td>
                  <td>{emp.direccion}</td>
                  <td>{emp.rol}</td>
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

export default Empleados;
