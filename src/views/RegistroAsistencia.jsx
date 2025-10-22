import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaRegistroAsistencia from "../components/RegistroAsistencia/TablaRegistroAsistencia";

const RegistroAsistencia = () => {
    const [registros, setRegistros] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerRegistros = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/registroAsistencia"); {/*ojooooooooooooooooooooooooooooo */}
            if (!respuesta.ok) throw new Error("Error al obtener los registros de asistencia");

            const datos = await respuesta.json();
            setRegistros(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerRegistros();
    }, []);

    return (
        <Container className="mt-5">
            {/* Sección principal con título y descripción */}
            <Row className="align-items-center text-center text-md-start mb-4">
                <Col>
                    <h1 className="display-4 fw-bold text-primary">Registro de Asistencia</h1>
                    <p className="lead text-secondary">
                        Visualiza y administra los registros de asistencia de los empleados.
                    </p>
                    <Button variant="primary" size="lg">
                        Agregar Nuevo Registro
                    </Button>
                </Col>
            </Row>

            {/* Tabla de registros */}
            <Row>
                <Col>
                    <TablaRegistroAsistencia
                        registros={registros}
                        cargando={cargando}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default RegistroAsistencia;
