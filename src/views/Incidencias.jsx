import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaIncidencias from "../components/Incidencias/TablaIncidencias";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroIncidencia from "../components/Incidencias/ModalRegistroIncidencia";
import ModalEditarIncidencia from "../components/Incidencias/ModalEditarIncidencia";
import ModalEliminarIncidencia from "../components/Incidencias/ModalEliminarIncidencia";

const Incidencias = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [nuevaIncidencia, setNuevaIncidencia] = useState({
    id_empleado: "",
    tipo_incidencia: "",
    descripcion: "",
    fecha_incidencia: "",
  });

  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);
  const [empleados, setEmpleados] = useState([]);

  // Obtener incidencias
  const obtenerIncidencias = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/incidencias");
      if (!res.ok) throw new Error("Error al obtener las incidencias");
      const data = await res.json();
      setIncidencias(data);
      setIncidenciasFiltradas(data);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  // Obtener empleados
  const obtenerEmpleados = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/empleados");
      if (!res.ok) throw new Error("Error al obtener los empleados");
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Manejo de inputs
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    if (incidenciaSeleccionada) {
      setIncidenciaSeleccionada((prev) => ({ ...prev, [name]: value }));
    } else {
      setNuevaIncidencia((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Agregar incidencia
  const agregarIncidencia = async () => {
    if (!nuevaIncidencia.id_empleado || !nuevaIncidencia.tipo_incidencia || !nuevaIncidencia.fecha_incidencia) return;

    try {
      const res = await fetch("http://localhost:3000/api/incidencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaIncidencia),
      });
      if (!res.ok) throw new Error("Error al guardar la incidencia");

      setNuevaIncidencia({
        id_empleado: "",
        tipo_incidencia: "",
        descripcion: "",
        fecha_incidencia: "",
      });
      setMostrarModal(false);
      await obtenerIncidencias();
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar la incidencia.");
    }
  };

  // Editar incidencia
  const editarIncidencia = async () => {
    if (!incidenciaSeleccionada) return;

    try {
      const res = await fetch(`http://localhost:3000/api/incidencias/${incidenciaSeleccionada.id_incidencia}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incidenciaSeleccionada),
      });
      if (!res.ok) throw new Error("Error al actualizar incidencia");

      setMostrarModalEditar(false);
      setIncidenciaSeleccionada(null);
      await obtenerIncidencias();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la incidencia.");
    }
  };

  // Eliminar incidencia
  const eliminarIncidencia = async () => {
    if (!incidenciaSeleccionada) return;

    try {
      const res = await fetch(`http://localhost:3000/api/incidencias/${incidenciaSeleccionada.id_incidencia}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar incidencia");

      setMostrarModalEliminar(false);
      setIncidenciaSeleccionada(null);
      await obtenerIncidencias();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la incidencia.");
    }
  };

  // Filtrado de búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = incidencias.filter(
      (incidencia) =>
        incidencia.tipo_incidencia.toLowerCase().includes(texto) ||
        (incidencia.descripcion && incidencia.descripcion.toLowerCase().includes(texto)) ||
        incidencia.fecha_incidencia.toLowerCase().includes(texto) ||
        incidencia.id_empleado.toString().includes(texto)
    );
    setIncidenciasFiltradas(filtradas);
  };

  useEffect(() => {
    obtenerIncidencias();
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
        <Col className="text-end">
          <Button variant="primary" size="lg" onClick={() => setMostrarModal(true)}>
            Agregar Nueva Incidencia
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Gestión de Incidencias</h1>
          <p className="lead text-secondary">
            Visualiza y administra las incidencias de los empleados fácilmente.
          </p>
        </Col>
      </Row>

      <TablaIncidencias
        incidencias={incidenciasFiltradas}
        cargando={cargando}
        setMostrarModalEditar={setMostrarModalEditar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        setIncidenciaSeleccionada={setIncidenciaSeleccionada}
      />

      <ModalRegistroIncidencia
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaIncidencia={nuevaIncidencia}
        manejarCambioInput={manejarCambioInput}
        agregarIncidencia={agregarIncidencia}
        empleados={empleados}
      />

      {incidenciaSeleccionada && (
        <ModalEditarIncidencia
          mostrarModal={mostrarModalEditar}
          setMostrarModal={setMostrarModalEditar}
          incidenciaSeleccionada={incidenciaSeleccionada}
          manejarCambioInput={manejarCambioInput}
          editarIncidencia={editarIncidencia}
          empleados={empleados}
        />
      )}

      {incidenciaSeleccionada && (
        <ModalEliminarIncidencia
          mostrarModal={mostrarModalEliminar}
          setMostrarModal={setMostrarModalEliminar}
          incidenciaSeleccionada={incidenciaSeleccionada}
          eliminarIncidencia={eliminarIncidencia}
        />
      )}
    </Container>
  );
};

export default Incidencias;
