import { useState, useEffect } from "react"; 
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaIncidencias from "../components/Incidencias/TablaIncidencias";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";

const Incidencias = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerIncidencias = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/incidencias");
      if (!respuesta.ok) throw new Error("Error al obtener las incidencias");

      const datos = await respuesta.json();
      setIncidencias(datos);
      setIncidenciasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = incidencias.filter(
      (incidencia) =>
        incidencia.id_incidencia.toString().includes(texto) ||
        (incidencia.descripcion && incidencia.descripcion.toLowerCase().includes(texto)) ||
        (incidencia.tipo && incidencia.tipo.toLowerCase().includes(texto)) ||
        (incidencia.estado && incidencia.estado.toLowerCase().includes(texto)) ||
        (incidencia.fecha && incidencia.fecha.toLowerCase().includes(texto)) ||
        (incidencia.id_empleado && incidencia.id_empleado.toString().includes(texto))
    );
    setIncidenciasFiltradas(filtradas);
  };

  useEffect(() => {
    obtenerIncidencias();
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
          <h1 className="display-4 fw-bold text-primary">Gestión de Incidencias</h1>
          <p className="lead text-secondary">
            Visualiza y administra las incidencias de manera sencilla.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nueva Incidencia
          </Button>
        </Col>
      </Row>

      <TablaIncidencias
        incidencias={incidenciasFiltradas}
        cargando={cargando}
      />
    </Container>
  );
};

export default Incidencias;
