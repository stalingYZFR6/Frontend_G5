import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaRegistroAsistencia from "../components/RegistroAsistencia/TablaRegistroAsistencia";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroAsistencia from "../components/RegistroAsistencia/ModalRegistroAsistencia";
import ModalEditarAsistencia from "../components/RegistroAsistencia/ModalEditarAsistencia";
import ModalEliminarAsistencia from "../components/RegistroAsistencia/ModalEliminarAsistencia";

import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";

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

  // ────────────────────── OBTENER REGISTROS ──────────────────────
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

  const obtenerEmpleados = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/empleados");
      if (!res.ok) throw new Error("Error al obtener empleados");
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerTurnos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/turnos");
      if (!res.ok) throw new Error("Error al obtener turnos");
      const data = await res.json();
      setTurnos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerRegistros();
    obtenerEmpleados();
    obtenerTurnos();
  }, []);

  // ────────────────────── BUSQUEDA ──────────────────────
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = registros.filter(
      (registro) =>
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

  // ────────────────────── MANEJO DE INPUT ──────────────────────
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    if (asistenciaSeleccionada) {
      setAsistenciaSeleccionada((prev) => ({ ...prev, [name]: value }));
    } else {
      setNuevoRegistro((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ────────────────────── CRUD ──────────────────────
  const agregarRegistro = async () => {
    if (
      !nuevoRegistro.id_empleado ||
      !nuevoRegistro.id_turno ||
      !nuevoRegistro.fecha ||
      !nuevoRegistro.hora_entrada ||
      !nuevoRegistro.hora_salida
    )
      return;

    try {
      const res = await fetch("http://localhost:3000/api/registroasistencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoRegistro),
      });
      if (!res.ok) throw new Error("Error al guardar registro");

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
      console.error(error);
      alert("No se pudo guardar el registro.");
    }
  };

  const editarAsistencia = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/registroAsistencia/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asistenciaSeleccionada),
      });
      if (!res.ok) throw new Error("Error al editar registro");
      setMostrarModalEditar(false);
      setAsistenciaSeleccionada(null);
      await obtenerRegistros();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const eliminarAsistencia = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/registroasistencia/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar registro");
      setMostrarModalEliminar(false);
      setAsistenciaSeleccionada(null);
      await obtenerRegistros();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el registro.");
    }
  };

  // ────────────────────── EXPORTAR A EXCEL ──────────────────────
  const exportarExcel = () => {
    const datos = registrosFiltrados.map((r) => ({
      ID: r.id_registro,
      Empleado: r.id_empleado,
      Turno: r.id_turno,
      Fecha: r.fecha,
      "Hora Entrada": r.hora_entrada,
      "Hora Salida": r.hora_salida,
      "Horas Trabajadas": r.horas_trabajadas,
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Asistencia");

    const buffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const fecha = new Date();
    saveAs(blob, `RegistroAsistencia_${fecha.getDate()}${fecha.getMonth() + 1}${fecha.getFullYear()}.xlsx`);
  };

  // ────────────────────── EXPORTAR A PDF ──────────────────────
  const generarPDF = () => {
  const doc = new jsPDF();
  const columnas = ["ID Registro", "Empleado", "Turno", "Fecha", "Hora Entrada", "Hora Salida", "Horas Trabajadas"];

  const filas = registrosFiltrados.map(registro => {
    const empleado = empleados.find(e => e.id_empleado === registro.id_empleado);

    // Formatear fecha: DD/MM/YYYY
    const fecha = new Date(registro.fecha);
    const fechaFormateada = `${fecha.getDate().toString().padStart(2, "0")}/${(fecha.getMonth()+1).toString().padStart(2,"0")}/${fecha.getFullYear()}`;

    return [
      registro.id_registro,
      empleado ? empleado.nombre : registro.id_empleado,
      registro.id_turno,
      fechaFormateada,  // <-- fecha ya formateada
      registro.hora_entrada,
      registro.hora_salida,
      registro.horas_trabajadas
    ];
  });

  autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 20,
    theme: "grid",
    styles: { fontSize: 12, cellPadding: 2 },
  });

  const fechaHoy = new Date();
  const nombreArchivo = `RegistroAsistencia_${fechaHoy.getDate()}${fechaHoy.getMonth() + 1}${fechaHoy.getFullYear()}.pdf`;
  doc.save(nombreArchivo);
};


  // ────────────────────── RENDER ──────────────────────
  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas textoBusqueda={textoBusqueda} manejarCambioBusqueda={manejarCambioBusqueda} />
        </Col>
        <Col className="text-end">
          <Button variant="primary" size="lg" onClick={() => setMostrarModal(true)}>
            Nuevo Registro
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button variant="secondary" onClick={exportarExcel} style={{ width: "100%" }}>
            Exportar Excel
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button variant="secondary" onClick={generarPDF} style={{ width: "100%" }}>
            Exportar PDF
          </Button>
        </Col>
      </Row>

      <TablaRegistroAsistencia
        registros={registrosFiltrados}
        cargando={cargando}
        setMostrarModalEditar={setMostrarModalEditar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        setAsistenciaSeleccionada={setAsistenciaSeleccionada}
      />

      <ModalRegistroAsistencia
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoRegistro={nuevoRegistro}
        manejarCambioInput={manejarCambioInput}
        agregarRegistro={agregarRegistro}
        empleados={empleados}
        turnos={turnos}
      />

      {asistenciaSeleccionada && (
        <ModalEditarAsistencia
          mostrarModal={mostrarModalEditar}
          setMostrarModal={setMostrarModalEditar}
          asistenciaSeleccionada={asistenciaSeleccionada}
          manejarCambioInput={manejarCambioInput}
          editarAsistencia={editarAsistencia}
          empleados={empleados}
          turnos={turnos}
        />
      )}

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
