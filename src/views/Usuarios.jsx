import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaUsuarios from "../components/Usuarios/TablaUsuarios";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerUsuarios = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/usuarios");
            if (!respuesta.ok) throw new Error("Error al obtener los usuarios");

            const datos = await respuesta.json();
            setUsuarios(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return (
        <Container className="mt-5">
            {/* Sección principal con título y descripción */}
            <Row className="align-items-center text-center text-md-start mb-4">
                <Col>
                    <h1 className="display-4 fw-bold text-primary">Gestión de Usuarios</h1>
                    <p className="lead text-secondary">
                        Visualiza y administra los usuarios del sistema de manera sencilla.
                    </p>
                    <Button variant="primary" size="lg">
                        Agregar Nuevo Usuario
                    </Button>
                </Col>
            </Row>

            {/* Tabla de usuarios */}
            <Row>
                <Col>
                    <TablaUsuarios
                        usuarios={usuarios}
                        cargando={cargando}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Usuarios;
