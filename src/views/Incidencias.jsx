import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaIncidencias from "../components/Incidencias/TablaIncidencias";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroIncidencia from "../components/Incidencias/ModalRegistroIncidencia";

const Incidencias = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaIncidencia, setNuevaIncidencia] = useState({
    id_empleado: "",
    tipo_incidencia: "",
    descripcion: "",
    fecha_incidencia: "",
  });

  const [empleados, setEmpleados] = useState([]);

  // Obtener incidencias del backend
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

  // Obtener empleados para el combobox
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

  // Maneja cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaIncidencia((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar nueva incidencia
  const agregarIncidencia = async () => {
    if (
      !nuevaIncidencia.id_empleado ||
      !nuevaIncidencia.tipo_incidencia ||
      !nuevaIncidencia.fecha_incidencia
    )
      return;

    try {
      const respuesta = await fetch("http://localhost:3000/api/incidencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaIncidencia),
      });

      if (!respuesta.ok) throw new Error("Error al guardar la incidencia");

      setNuevaIncidencia({
        id_empleado: "",
        tipo_incidencia: "",
        descripcion: "",
        fecha_incidencia: "",
      });
      setMostrarModal(false);
      await obtenerIncidencias();
    } catch (error) {
      console.error("Error al agregar incidencia:", error);
      alert("No se pudo guardar la incidencia. Revisa la consola.");
    }
  };

  // Maneja el filtrado de búsqueda
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

      <Row className="align-items-center text-center text-md-start mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Gestión de Incidencias</h1>
          <p className="lead text-secondary">
            Visualiza y administra las incidencias de los empleados fácilmente.
          </p>
          <Button variant="primary" size="lg" onClick={() => setMostrarModal(true)}>
            Agregar Nueva Incidencia
          </Button>
        </Col>
      </Row>

      <TablaIncidencias incidencias={incidenciasFiltradas} cargando={cargando} />

      <ModalRegistroIncidencia
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaIncidencia={nuevaIncidencia}
        manejarCambioInput={manejarCambioInput}
        agregarIncidencia={agregarIncidencia}
        empleados={empleados}
      />
    </Container>
  );
};

export default Incidencias;