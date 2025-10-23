import { useState, useEffect } from "react"; 
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaTurnos from "../components/Turnos/TablaTurnos";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [turnosFiltrados, setTurnosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerTurnos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/turnos");
      if (!respuesta.ok) throw new Error("Error al obtener los turnos");

      const datos = await respuesta.json();
      setTurnos(datos);
      setTurnosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = turnos.filter(
      (turno) =>
        turno.id_turno.toString().includes(texto) ||
        (turno.nombre && turno.nombre.toLowerCase().includes(texto)) ||
        (turno.hora_inicio && turno.hora_inicio.toLowerCase().includes(texto)) ||
        (turno.hora_fin && turno.hora_fin.toLowerCase().includes(texto)) ||
        (turno.descripcion && turno.descripcion.toLowerCase().includes(texto))
    );
    setTurnosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerTurnos();
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
          <h1 className="display-4 fw-bold text-primary">Gestión de Turnos</h1>
          <p className="lead text-secondary">
            Visualiza y administra los turnos de trabajo registrados en el sistema.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nuevo Turno
          </Button>
        </Col>
      </Row>

      <TablaTurnos
        turnos={turnosFiltrados}
        cargando={cargando}
      />
    </Container>
  );
};

export default Turnos;
