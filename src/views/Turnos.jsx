import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaTurnos from "../components/Turnos/TablaTurnos";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroTurno from "../components/Turnos/ModalRegistroTurno";
import ModalEditarTurno from "../components/Turnos/ModalEditarTurno";
import ModalEliminarTurno from "../components/Turnos/ModalEliminarTurno";

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [turnosFiltrados, setTurnosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [empleados, setEmpleados] = useState([]);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [nuevoTurno, setNuevoTurno] = useState({
    id_empleado: "",
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    tipo_turno: ""
  });

  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  // Obtener empleados para combo
  const obtenerEmpleados = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/empleados");
      if (!res.ok) throw new Error("Error al obtener empleados");
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    }
  };

  // Obtener turnos
  const obtenerTurnos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/turnos");
      if (!res.ok) throw new Error("Error al obtener turnos");
      const data = await res.json();
      setTurnos(data);
      setTurnosFiltrados(data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar turnos:", error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
    obtenerTurnos();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoTurno(prev => ({ ...prev, [name]: value }));
  };

  const agregarTurno = async () => {
    if (!nuevoTurno.id_empleado || !nuevoTurno.fecha || !nuevoTurno.hora_inicio || !nuevoTurno.hora_fin || !nuevoTurno.tipo_turno) return;
    try {
      const res = await fetch("http://localhost:3000/api/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoTurno)
      });
      if (!res.ok) throw new Error("Error al guardar el turno");

      setNuevoTurno({ id_empleado: "", fecha: "", hora_inicio: "", hora_fin: "", tipo_turno: "" });
      setMostrarModalAgregar(false);
      await obtenerTurnos();
    } catch (error) {
      console.error("Error al agregar turno:", error);
      alert("No se pudo guardar el turno. Revisa la consola.");
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = turnos.filter(
      (turno) =>
        turno.tipo_turno.toLowerCase().includes(texto) ||
        turno.fecha.includes(texto) ||
        turno.hora_inicio.includes(texto) ||
        turno.hora_fin.includes(texto) ||
        turno.id_empleado.toString().includes(texto) ||
        (turno.nombre_empleado && turno.nombre_empleado.toLowerCase().includes(texto))
    );
    setTurnosFiltrados(filtrados);
  };

  return (
    <Container className="mt-5">

      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Gestión de Turnos</h1>
          <p className="lead text-secondary">
            Visualiza y administra los turnos de los empleados fácilmente.
          </p>
        </Col>

        <Col className="text-end">
          <Button
            className="color-boton-registro"
            onClick={() => setMostrarModalAgregar(true)}
          >
            + Agregar Turno
          </Button>
        </Col>
      </Row>

      <TablaTurnos
        turnos={turnosFiltrados}
        cargando={cargando}
        setMostrarModalEditar={setMostrarModalEditar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        setTurnoSeleccionado={setTurnoSeleccionado}
      />

      <ModalRegistroTurno
        mostrarModal={mostrarModalAgregar}
        setMostrarModal={setMostrarModalAgregar}
        nuevoTurno={nuevoTurno}
        manejarCambioInput={manejarCambioInput}
        agregarTurno={agregarTurno}
        empleados={empleados}
      />

      {turnoSeleccionado && (
        <>
          <ModalEditarTurno
            mostrarModal={mostrarModalEditar}
            setMostrarModal={setMostrarModalEditar}
            turnoSeleccionado={turnoSeleccionado}
            setTurnoSeleccionado={setTurnoSeleccionado}
            empleados={empleados}
            obtenerTurnos={obtenerTurnos}
          />

          <ModalEliminarTurno
            mostrarModal={mostrarModalEliminar}
            setMostrarModal={setMostrarModalEliminar}
            turnoSeleccionado={turnoSeleccionado}
            setTurnoSeleccionado={setTurnoSeleccionado}
            obtenerTurnos={obtenerTurnos}
          />
        </>
      )}

    </Container>
  );
};

export default Turnos;
