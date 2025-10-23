import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaRoles from "../components/Rol/TablaRoles";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda";

const Roles = () => {
    const [roles, setRoles] = useState([]);
  const [rolesFiltrados, setRolesFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

    const obtenerRoles = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/rol");
            if (!respuesta.ok) throw new Error("Error al obtener los roles");

            const datos = await respuesta.json();
            setRoles(datos);
            setRolesFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    };
    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = roles.filter(
            (rol) =>
                rol.id_rol.toString().includes(texto) ||
                (rol.nombre && rol.nombre.toLowerCase().includes(texto))
        );
        setRolesFiltrados(filtrados);
    };

    useEffect(() => {
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

            {/* Sección principal con título y descripción */}
            <Row className="align-items-center text-center text-md-start mb-4">
                <Col>
                    <h1 className="display-4 fw-bold text-primary">Gestión de Roles</h1>
                    <p className="lead text-secondary">
                        Visualiza y administra los roles de los empleados en el sistema.
                    </p>
                    <Button variant="primary" size="lg">
                        Agregar Nuevo Rol
                    </Button>
                </Col>
            </Row>
                    <TablaRoles
                        roles={rolesFiltrados}
                        cargando={cargando}
                    />

        </Container>
    );
};

export default Roles;
