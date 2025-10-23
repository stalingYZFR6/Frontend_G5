import { useState, useEffect } from "react"; 
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaRegistroAsistencia from "../components/RegistroAsistencia/TablaRegistroAsistencia";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";

const RegistroAsistencia = () => {
  const [registros, setRegistros] = useState([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerRegistros = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/registroasistencia");
      if (!respuesta.ok) throw new Error("Error al obtener los registros de asistencia");

      const datos = await respuesta.json();
      setRegistros(datos);
      setRegistrosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = registros.filter(
      (registro) =>
        registro.id_registro.toString().includes(texto) ||
        (registro.id_empleado && registro.id_empleado.toString().includes(texto)) ||
        (registro.id_turno && registro.id_turno.toString().includes(texto)) ||
        (registro.fecha && registro.fecha.toLowerCase().includes(texto)) ||
        (registro.hora_entrada && registro.hora_entrada.toLowerCase().includes(texto)) ||
        (registro.hora_salida && registro.hora_salida.toLowerCase().includes(texto)) ||
        (registro.horas_trabajadas && registro.horas_trabajadas.toString().includes(texto))
    );
    setRegistrosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  return (
    <Container className="mt-5">

      {/* Cuadro de búsqueda */}
      <Row>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      {/* Encabezado principal */}
      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Registro de Asistencia</h1>
          <p className="lead text-secondary">
            Visualiza y administra los registros de asistencia de los empleados.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nuevo Registro
          </Button>
        </Col>
      </Row>

      {/* Tabla con datos */}
      <TablaRegistroAsistencia
        registros={registrosFiltrados}
        cargando={cargando}
      />
    </Container>
  );
};

export default RegistroAsistencia;
