import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaEmpleados from "../components/Empleados/TablaEmpleados";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";

import ModalRegistroEmpleado from "../components/Empleados/ModalRegistroEmpleado";
import ModalEditarEmpleado from "../components/Empleados/ModalEditarEmpleado";
import ModalEliminarEmpleado from "../components/Empleados/ModalEliminarEmpleado";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: "",
    id_rol: "",
  });

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [roles, setRoles] = useState([]);

  // Obtener empleados
  const obtenerEmpleados = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/empleados");
      if (!res.ok) throw new Error("Error al obtener los empleados");
      const data = await res.json();
      setEmpleados(data);
      setEmpleadosFiltrados(data);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  // Obtener roles
  const obtenerRoles = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/rol");
      if (!res.ok) throw new Error("Error al obtener los roles");
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Filtrar empleados
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = empleados.filter(
      (empleado) =>
        empleado.nombre.toLowerCase().includes(texto) ||
        empleado.apellido.toLowerCase().includes(texto) ||
        empleado.cedula.toLowerCase().includes(texto) ||
        (empleado.correo && empleado.correo.toLowerCase().includes(texto)) ||
        (empleado.telefono && empleado.telefono.toLowerCase().includes(texto)) ||
        (empleado.direccion && empleado.direccion.toLowerCase().includes(texto)) ||
        empleado.id_rol.toString().includes(texto)
    );
    setEmpleadosFiltrados(filtrados);
  };

  // Manejar inputs del modal registro
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    if (mostrarModalRegistro) {
      setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
    } else if (mostrarModalEditar) {
      setEmpleadoSeleccionado((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Crear empleado
  const crearEmpleado = async (datosEmpleado) => {
    try {
      const res = await fetch("http://localhost:3000/api/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosEmpleado),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear empleado");
      }

      setNuevoEmpleado({
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
        telefono: "",
        direccion: "",
        id_rol: "",
      });
      setMostrarModalRegistro(false);
      await obtenerEmpleados();
    } catch (error) {
      alert("No se pudo agregar el empleado: " + error.message);
    }
  };

  // Editar empleado
  const editarEmpleado = async (id, datosEmpleado) => {
    try {
      const res = await fetch(`http://localhost:3000/api/empleados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosEmpleado),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar empleado");
      }

      setEmpleadoSeleccionado(null);
      setMostrarModalEditar(false);
      await obtenerEmpleados();
    } catch (error) {
      alert("No se pudo actualizar el empleado: " + error.message);
    }
  };

  // Eliminar empleado
  const eliminarEmpleado = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/empleados/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al eliminar empleado");
      }

      setEmpleadoSeleccionado(null);
      setMostrarModalEliminar(false);
      await obtenerEmpleados();
    } catch (error) {
      alert("No se pudo eliminar el empleado: " + error.message);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
    obtenerRoles();
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
          <h1 className="display-4 fw-bold text-primary">Gestión de Empleados</h1>
          <p className="lead text-secondary">
            Visualiza y administra los empleados de manera sencilla.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setMostrarModalRegistro(true)}
          >
            Agregar Nuevo Empleado
          </Button>
        </Col>
      </Row>

      <TablaEmpleados
        empleados={empleadosFiltrados}
        cargando={cargando}
        setMostrarModalEditar={setMostrarModalEditar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        setEmpleadoSeleccionado={setEmpleadoSeleccionado}
      />

      {/* Modales */}
      <ModalRegistroEmpleado
        mostrarModal={mostrarModalRegistro}
        setMostrarModal={setMostrarModalRegistro}
        crearEmpleado={crearEmpleado}
        roles={roles}
      />

      <ModalEditarEmpleado
        mostrarModal={mostrarModalEditar}
        setMostrarModal={setMostrarModalEditar}
        empleadoSeleccionado={empleadoSeleccionado}
        editarEmpleado={editarEmpleado}
        roles={roles}
      />

      <ModalEliminarEmpleado
        mostrarModal={mostrarModalEliminar}
        setMostrarModal={setMostrarModalEliminar}
        empleadoSeleccionado={empleadoSeleccionado}
        eliminarEmpleado={eliminarEmpleado}
      />
    </Container>
  );
};

export default Empleados;
