import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaRoles from "../components/Rol/TablaRoles";

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerRoles = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/rol");
            if (!respuesta.ok) throw new Error("Error al obtener los roles");

            const datos = await respuesta.json();
            setRoles(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerRoles();
    }, []);

    return (
        <Container className="mt-5">
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

            {/* Tabla de roles */}
            <Row>
                <Col>
                    <TablaRoles
                        roles={roles}
                        cargando={cargando}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Roles;
