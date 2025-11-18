import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaRegistroAsistencia from "../components/RegistroAsistencia/TablaRegistroAsistencia";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroAsistencia from "../components/RegistroAsistencia/ModalRegistroAsistencia";
import ModalEditarAsistencia from "../components/RegistroAsistencia/ModalEditarAsistencia";
import ModalEliminarAsistencia from "../components/RegistroAsistencia/ModalEliminarAsistencia";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const RegistroAsistencia = () => {
  const [registros, setRegistros] = useState([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [nuevoRegistro, setNuevoRegistro] = useState({
    id_empleado: "",
    id_turno: "",
    fecha: "",
    hora_entrada: "",
    hora_salida: "",
  });

  const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(null);
  const [empleados, setEmpleados] = useState([]);
  const [turnos, setTurnos] = useState([]);

  // Obtener registros
  const obtenerRegistros = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/registroasistencia");
      if (!respuesta.ok) throw new Error("Error al obtener registros de asistencia");
      const datos = await respuesta.json();
      setRegistros(datos);
      setRegistrosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };


  // generar reporte 
  const generarPDFProductos = () => {
    const doc = new jsPDF();
  }

  // Obtener empleados
  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/empleados");
      if (!respuesta.ok) throw new Error("Error al obtener empleados");
      const datos = await respuesta.json();
      setEmpleados(datos);
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener turnos
  const obtenerTurnos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/turnos");
      if (!respuesta.ok) throw new Error("Error al obtener turnos");
      const datos = await respuesta.json();
      setTurnos(datos);
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar cambios en inputs
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    if (asistenciaSeleccionada) {
      setAsistenciaSeleccionada(prev => ({ ...prev, [name]: value }));
    } else {
      setNuevoRegistro(prev => ({ ...prev, [name]: value }));
    }
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

      if (!respuesta.ok) throw new Error("Error al guardar registro de asistencia");

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

  // Editar registro
  const editarAsistencia = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/registroAsistencia/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_empleado: asistenciaSeleccionada.id_empleado,
          id_turno: asistenciaSeleccionada.id_turno,
          fecha: asistenciaSeleccionada.fecha,
          hora_entrada: asistenciaSeleccionada.hora_entrada,
          hora_salida: asistenciaSeleccionada.hora_salida
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Error al editar registro de asistencia");
      }

      setMostrarModalEditar(false);
      setAsistenciaSeleccionada(null);
      await obtenerRegistros();
    } catch (error) {
      console.error("Error al editar registro:", error);
      alert(error.message);
    }
  };

  // Eliminar registro
  const eliminarAsistencia = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/registroasistencia/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar registro de asistencia");

      setMostrarModalEliminar(false);
      setAsistenciaSeleccionada(null);
      await obtenerRegistros();
    } catch (error) {
      console.error("Error al eliminar registro:", error);
      alert("No se pudo eliminar el registro.");
    }
  };

  // Buscar registros
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = registros.filter(
      registro =>
        registro.id_registro.toString().includes(texto) ||
        registro.id_empleado?.toString().includes(texto) ||
        registro.id_turno?.toString().includes(texto) ||
        registro.fecha?.toLowerCase().includes(texto) ||
        registro.hora_entrada?.toLowerCase().includes(texto) ||
        registro.hora_salida?.toLowerCase().includes(texto) ||
        registro.horas_trabajadas?.toString().includes(texto)
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
      <Row>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setMostrarModal(true)}>
            Nuevo Registro
          </Button>
        </Col>
      </Row>


      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Registro de Asistencia</h1>
          <p className="lead text-secondary">
            Visualiza y administra los registros de asistencia de los empleados.
          </p>
        </Col>
      </Row>

      {/* Tabla */}
      <TablaRegistroAsistencia
        registros={registrosFiltrados}
        cargando={cargando}
        setMostrarModalEditar={setMostrarModalEditar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        setAsistenciaSeleccionada={setAsistenciaSeleccionada}
      />

      {/* Modal Agregar */}
      <ModalRegistroAsistencia
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoRegistro={nuevoRegistro}
        manejarCambioInput={manejarCambioInput}
        agregarRegistro={agregarRegistro}
        empleados={empleados}
        turnos={turnos}
      />

      {/* Modal para editar */}
      {asistenciaSeleccionada && (
        <ModalEditarAsistencia
          mostrarModal={mostrarModalEditar}
          setMostrarModal={setMostrarModalEditar}
          asistenciaSeleccionada={asistenciaSeleccionada}
          manejarCambioInput={manejarCambioInput}
          editarAsistencia={editarAsistencia}
          empleados={empleados}   // <-- Se pasan los empleados
          turnos={turnos}         // <-- Se pasan los turnos
        />
      )}


      {/* Modal Eliminar */}
      {asistenciaSeleccionada && (
        <ModalEliminarAsistencia
          mostrarModal={mostrarModalEliminar}
          setMostrarModal={setMostrarModalEliminar}
          asistenciaSeleccionada={asistenciaSeleccionada}
          eliminarAsistencia={eliminarAsistencia}
        />
      )}
    </Container>
  );
};

export default RegistroAsistencia;
