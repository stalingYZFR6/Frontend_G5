import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";

const Incidencias = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerIncidencias = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/incidencias");
      if (!respuesta.ok) throw new Error("Error al obtener las incidencias");

      const datos = await respuesta.json();
      setIncidencias(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerIncidencias();
  }, []);

  return (
    <Container className="mt-5">
      {/* Sección principal con título y descripción */}
      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Gestión de Incidencias</h1>
          <p className="lead text-secondary">
            Visualiza y administra las incidencias de los empleados de manera sencilla.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nueva Incidencia
          </Button>
        </Col>
      </Row>

      {/* Tabla de incidencias */}
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
                  <th>Empleado</th>
                  <th>Tipo de Incidencia</th>
                  <th>Descripción</th>
                  <th>Fecha de Incidencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {incidencias.map((incidencia) => (
                  <tr key={incidencia.id_incidencia}>
                    <td>{incidencia.id_incidencia}</td>
                    <td>{incidencia.id_empleado}</td>
                    <td>{incidencia.tipo_incidencia}</td>
                    <td>{incidencia.descripcion}</td>
                    <td>{incidencia.fecha_incidencia}</td>
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

export default Incidencias;
