import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import TablaEmpleados from "../components/Empleados/TablaEmpleados";"";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/empleados");
      if (!respuesta.ok) throw new Error("Error al obtener los empleados");

      const datos = await respuesta.json();
      setEmpleados(datos);
      setEmpleadosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = empleados.filter(
      (empleado) =>
        empleado.nombre.toLowerCase().includes(texto) ||
        empleado.apellido.toLowerCase().includes(texto) ||
        empleado.cedula.toLowerCase().includes(texto) ||
        (empleado.correo && empleado.correo.toLowerCase().includes(texto)) ||
        (empleado.telefono && empleado.telefono.toLowerCase().includes(texto)) ||
        (empleado.direccion && empleado.direccion.toLowerCase().includes(texto)) ||
        empleado.id_rol.toString().includes(texto)
    );
    setEmpleadosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <Container className="mt-5">

          <Row>
                    <Col lg={5} md={8} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>
                </Row>

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

      <TablaEmpleados
         empleados={empleadosFiltrados}
          cargando={cargando}
        />
    </Container>
  );
};

export default Empleados;
