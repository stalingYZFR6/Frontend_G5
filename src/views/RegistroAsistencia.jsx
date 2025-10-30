import { useState, useEffect } from "react"; 
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaRegistroAsistencia from "../components/RegistroAsistencia/TablaRegistroAsistencia";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroAsistencia from "../components/RegistroAsistencia/ModalRegistroAsistencia";

const RegistroAsistencia = () => {
  const [registros, setRegistros] = useState([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    id_empleado: "",
    id_turno: "",
    fecha: "",
    hora_entrada: "",
    hora_salida: "",
  });

  const [empleados, setEmpleados] = useState([]);
  const [turnos, setTurnos] = useState([]);

  // Obtener registros de asistencia
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

  // Obtener empleados para el combobox del modal
  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/empleados");
      if (!respuesta.ok) throw new Error("Error al obtener los empleados");
      const datos = await respuesta.json();
      setEmpleados(datos);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Obtener turnos para el combobox del modal
  const obtenerTurnos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/turnos");
      if (!respuesta.ok) throw new Error("Error al obtener los turnos");
      const datos = await respuesta.json();
      setTurnos(datos);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Manejar cambios en inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoRegistro(prev => ({ ...prev, [name]: value }));
  };

  // Agregar nuevo registro
  const agregarRegistro = async () => {
    if (!nuevoRegistro.id_empleado || !nuevoRegistro.id_turno || !nuevoRegistro.fecha || !nuevoRegistro.hora_entrada || !nuevoRegistro.hora_salida) return;

    try {
      const respuesta = await fetch("http://localhost:3000/api/registroasistencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoRegistro),
      });

      if (!respuesta.ok) throw new Error("Error al guardar el registro de asistencia");

      setNuevoRegistro({
        id_empleado: "",
        id_turno: "",
        fecha: "",
        hora_entrada: "",
        hora_salida: "",
      });
      setMostrarModal(false);
      await obtenerRegistros();
    } catch (error) {
      console.error("Error al agregar registro:", error);
      alert("No se pudo guardar el registro. Revisa la consola.");
    }
  };

  // Manejar búsqueda
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
    obtenerEmpleados();
    obtenerTurnos();
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
        <Col className="text-end">
          <Button
            className="color-boton-registro"
            onClick={() => setMostrarModal(true)}
          >
            + Nuevo Registro
          </Button>
        </Col>
      </Row>

      {/* Encabezado principal */}
      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Registro de Asistencia</h1>
          <p className="lead text-secondary">
            Visualiza y administra los registros de asistencia de los empleados.
          </p>
        </Col>
      </Row>

      {/* Tabla con datos */}
      <TablaRegistroAsistencia
        registros={registrosFiltrados}
        cargando={cargando}
      />

      {/* Modal para agregar nuevo registro */}
      <ModalRegistroAsistencia
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoRegistro={nuevoRegistro}
        manejarCambioInput={manejarCambioInput}
        agregarRegistro={agregarRegistro}
        empleados={empleados}
        turnos={turnos}
      />
    </Container>
  );
};

export default RegistroAsistencia;