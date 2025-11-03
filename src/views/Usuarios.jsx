import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaUsuarios from "../components/Usuarios/TablaUsuarios";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";
import ModalRegistroUsuario from "../components/Usuarios/ModalRegistroUsuario";
import ModalEditarUsuario from "../components/Usuarios/ModalEditarUsuario";
import ModalEliminarUsuario from "../components/Usuarios/ModalEliminarUsuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [empleados, setEmpleados] = useState([]);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    id_empleado: "",
    login: "",
    password: "",
    rol_aplicacion: ""
  });

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // --- Obtener usuarios y empleados ---
  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios");
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const data = await res.json();
      setUsuarios(data);
      setUsuariosFiltrados(data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
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
      console.error("Error al cargar empleados:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
    obtenerEmpleados();
  }, []);

  // --- Manejo de inputs ---
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  // --- Agregar usuario ---
  const agregarUsuario = async () => {
    if (!nuevoUsuario.id_empleado || !nuevoUsuario.login || !nuevoUsuario.password || !nuevoUsuario.rol_aplicacion)
      return;

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al crear usuario");
      }

      setNuevoUsuario({ id_empleado: "", login: "", password: "", rol_aplicacion: "" });
      setMostrarModalAgregar(false);
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert(`No se pudo guardar el usuario: ${error.message}`);
    }
  };

  // --- Editar usuario ---
  const guardarCambios = async (usuarioEdit) => {
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${usuarioSeleccionado.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEdit)
      });
      if (!res.ok) throw new Error("Error al actualizar usuario");
      await obtenerUsuarios();
      setMostrarModalEditar(false);
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el usuario");
    }
  };

  // --- Eliminar usuario ---
  const eliminarUsuario = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      await obtenerUsuarios();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el usuario");
    }
  };

  // --- Busqueda ---
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = usuarios.filter(
      (u) =>
        u.login.toLowerCase().includes(texto) ||
        u.rol_aplicacion.toLowerCase().includes(texto) ||
        u.id_empleado.toString().includes(texto)
    );
    setUsuariosFiltrados(filtrados);
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
        <Col className="text-end">
          <Button
            className="color-boton-registro"
            onClick={() => setMostrarModalAgregar(true)}
          >
            + Nuevo Usuario
          </Button>
        </Col>
      </Row>

      <TablaUsuarios
        usuarios={usuariosFiltrados}
        cargando={cargando}
        setMostrarModalEditar={setMostrarModalEditar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        setUsuarioSeleccionado={setUsuarioSeleccionado}
      />

      <ModalRegistroUsuario
        mostrarModal={mostrarModalAgregar}
        setMostrarModal={setMostrarModalAgregar}
        nuevoUsuario={nuevoUsuario}
        manejarCambioInput={manejarCambioInput}
        agregarUsuario={agregarUsuario}
        empleados={empleados}
      />

      {usuarioSeleccionado && (
        <>
          <ModalEditarUsuario
            mostrarModal={mostrarModalEditar}
            setMostrarModal={setMostrarModalEditar}
            usuarioSeleccionado={usuarioSeleccionado}
            guardarCambios={guardarCambios}
            empleados={empleados}
          />

          <ModalEliminarUsuario
            mostrarModal={mostrarModalEliminar}
            setMostrarModal={setMostrarModalEliminar}
            usuarioSeleccionado={usuarioSeleccionado}
            eliminarUsuario={eliminarUsuario}
          />
        </>
      )}
    </Container>
  );
};

export default Usuarios;
