import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaUsuarios from "../components/Usuarios/TablaUsuarios";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/usuarios");
      if (!respuesta.ok) throw new Error("Error al obtener los usuarios");

      const datos = await respuesta.json();
      setUsuarios(datos);
      setUsuariosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = usuarios.filter(
      (usuario) =>
        usuario.login.toLowerCase().includes(texto) ||
        usuario.rol_aplicacion.toLowerCase().includes(texto) ||
        usuario.id_empleado.toString().includes(texto) ||
        (usuario.ultima_actividad &&
          usuario.ultima_actividad.toLowerCase().includes(texto))
    );
    setUsuariosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerUsuarios();
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
          <h1 className="display-4 fw-bold text-primary">Gestión de Usuarios</h1>
          <p className="lead text-secondary">
            Administra los usuarios registrados en el sistema.
          </p>
          <Button variant="primary" size="lg">
            Agregar Nuevo Usuario
          </Button>
        </Col>
      </Row>

      <TablaUsuarios usuarios={usuariosFiltrados} cargando={cargando} />
    </Container>
  );
};

export default Usuario;