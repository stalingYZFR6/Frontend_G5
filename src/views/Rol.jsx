import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaRoles from "../components/Rol/TablaRoles";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroRol from "../components/Rol/ModalRegistroRol";
import ModalEditarRol from "../components/Rol/ModalEditarRol";
import ModalEliminarRol from "../components/Rol/ModalEliminarRol";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [rolesFiltrados, setRolesFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [nuevoRol, setNuevoRol] = useState({ nombre: "" });
  const [rolSeleccionado, setRolSeleccionado] = useState({ id_rol: null, nombre: "" });

  // Obtener roles
  const obtenerRoles = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/rol");
      if (!res.ok) throw new Error("Error al obtener los roles");
      const data = await res.json();
      setRoles(data);
      setRolesFiltrados(data);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerRoles();
  }, []);

  // Búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    setRolesFiltrados(
      roles.filter(
        (rol) =>
          rol.id_rol.toString().includes(texto) ||
          (rol.nombre && rol.nombre.toLowerCase().includes(texto))
      )
    );
  };

  // Agregar
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoRol((prev) => ({ ...prev, [name]: value }));
  };

  const agregarRol = async () => {
    if (!nuevoRol.nombre.trim()) return;
    try {
      const res = await fetch("http://localhost:3000/api/rol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoRol),
      });
      if (!res.ok) throw new Error("Error al guardar el rol");
      setNuevoRol({ nombre: "" });
      setMostrarModalAgregar(false);
      await obtenerRoles();
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar el rol");
    }
  };

  // Editar
  const manejarCambioInputEditar = (e) => {
    const { name, value } = e.target;
    setRolSeleccionado((prev) => ({ ...prev, [name]: value }));
  };

  const editarRol = async () => {
    if (!rolSeleccionado.nombre.trim()) return;
    try {
      const res = await fetch(`http://localhost:3000/api/rol/${rolSeleccionado.id_rol}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: rolSeleccionado.nombre }),
      });
      if (!res.ok) throw new Error("Error al actualizar rol");
      setMostrarModalEditar(false);
      setRolSeleccionado({ id_rol: null, nombre: "" });
      await obtenerRoles();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el rol");
    }
  };

  // Eliminar
  const eliminarRol = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/rol/${rolSeleccionado.id_rol}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar rol");
      setMostrarModalEliminar(false);
      setRolSeleccionado({ id_rol: null, nombre: "" });
      await obtenerRoles();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el rol");
    }
  };

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
          <h1 className="display-4 fw-bold text-primary">Gestión de Roles</h1>
          <p className="lead text-secondary">
            Visualiza y administra los roles de los empleados en el sistema.
          </p>
        </Col>
        <Col className="text-end">
          <Button className="color-boton-registro" onClick={() => setMostrarModalAgregar(true)}>
            + Nuevo Rol
          </Button>
        </Col>
      </Row>

      <TablaRoles
        roles={rolesFiltrados}
        cargando={cargando}
        setMostrarModalEditar={setMostrarModalEditar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        setRolSeleccionado={setRolSeleccionado}
      />

      <ModalRegistroRol
        mostrarModal={mostrarModalAgregar}
        setMostrarModal={setMostrarModalAgregar}
        nuevoRol={nuevoRol}
        manejarCambioInput={manejarCambioInput}
        agregarRol={agregarRol}
      />

      <ModalEditarRol
        mostrarModal={mostrarModalEditar}
        setMostrarModal={setMostrarModalEditar}
        rolSeleccionado={rolSeleccionado}
        manejarCambioInput={manejarCambioInputEditar}
        editarRol={editarRol}
      />

      <ModalEliminarRol
        mostrarModal={mostrarModalEliminar}
        setMostrarModal={setMostrarModalEliminar}
        rolSeleccionado={rolSeleccionado}
        eliminarRol={eliminarRol}
      />
    </Container>
  );
};

export default Roles;
