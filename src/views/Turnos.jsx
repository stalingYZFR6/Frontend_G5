import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaIncidencias from "../components/Incidencias/TablaIncidencias";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroTurno from "../components/Turnos/ModalRegistroTurno";

const Incidencias = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState([]);
  
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoTurno, setNuevoTurno] = useState({
    id_empleado: "",
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    tipo_turno: ""
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoTurno(prev => ({ ...prev, [name]: value }));
  };

  const agregarTurno = async () => {
    if (!nuevoTurno.id_empleado || !nuevoTurno.fecha || !nuevoTurno.hora_inicio || !nuevoTurno.hora_fin || !nuevoTurno.tipo_turno) return;

    try {
      const respuesta = await fetch("http://localhost:3000/api/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoTurno)
      });

      if (!respuesta.ok) throw new Error("Error al guardar el turno");

      setNuevoTurno({
        id_empleado: "",
        fecha: "",
        hora_inicio: "",
        hora_fin: "",
        tipo_turno: ""
      });
      setMostrarModal(false);

      // Refrescar lista de turnos si tienes función
      await obtenerTurnos();
    } catch (error) {
      console.error("Error al agregar turno:", error);
      alert("No se pudo guardar el turno. Revisa la consola.");
    }
  };

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
        incidencia.tipo_incidencia.toLowerCase().includes(texto) ||
        (incidencia.descripcion &&
          incidencia.descripcion.toLowerCase().includes(texto)) ||
        incidencia.fecha_incidencia.toLowerCase().includes(texto) ||
        incidencia.id_empleado.toString().includes(texto)
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
            Visualiza y administra las incidencias de los empleados fácilmente.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nueva Incidencia
          </Button>
        </Col>

        <Col className="text-end">
          <Button
            className="color-boton-registro"
            onClick={() => setMostrarModal(true)}
          >
            + Nuevo Turno
          </Button>
        </Col>
      </Row>

      <TablaIncidencias incidencias={incidenciasFiltradas} cargando={cargando} />

      <ModalRegistroTurno
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoTurno={nuevoTurno}
        manejarCambioInput={manejarCambioInput}
        agregarTurno={agregarTurno}
      />
    </Container>
  );
};

export default Incidencias;