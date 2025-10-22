import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaTurnos from "../components/Turnos/TablaTurnos";

const Turnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerTurnos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/turnos");
            if (!respuesta.ok) throw new Error("Error al obtener los turnos");

            const datos = await respuesta.json();
            setTurnos(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerTurnos();
    }, []);

    return (
        <Container className="mt-5">
            {/* Sección principal con título y descripción */}
            <Row className="align-items-center text-center text-md-start mb-4">
                <Col>
                    <h1 className="display-4 fw-bold text-primary">Gestión de Turnos</h1>
                    <p className="lead text-secondary">
                        Visualiza y administra los turnos de los empleados de manera sencilla.
                    </p>
                    <Button variant="primary" size="lg">
                        Agregar Nuevo Turno
                    </Button>
                </Col>
            </Row>

            {/* Tabla de turnos */}
            <Row>
                <Col>
                    <TablaTurnos
                        turnos={turnos}
                        cargando={cargando}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Turnos;
