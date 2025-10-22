import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/empleados");
      if (!respuesta.ok) throw new Error("Error al obtener los empleados");

      const datos = await respuesta.json();
      setEmpleados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <Container className="mt-5">
      {/* Sección principal con título y descripción */}
      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Gestión de Empleados</h1>
          <p className="lead text-secondary">
            Visualiza y administra los empleados de manera sencilla.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nuevo Empleado
          </Button>
        </Col>
      </Row>

      {/* Tabla de empleados */}
      <Row>
        <Col>
          {cargando ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          ) : (
            <Table striped bordered hover responsive className="text-center">
              <thead>
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
                {empleados.map((empleado) => (
                  <tr key={empleado.id_empleado}>
                    <td>{empleado.id_empleado}</td>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.apellido}</td>
                    <td>{empleado.cedula}</td>
                    <td>{empleado.correo}</td>
                    <td>{empleado.telefono}</td>
                    <td>{empleado.direccion}</td>
                    <td>{empleado.id_rol}</td>
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
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Empleados;
