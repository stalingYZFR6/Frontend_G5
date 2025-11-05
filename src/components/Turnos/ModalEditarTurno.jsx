import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEditarTurno = ({
    mostrarModal,
    setMostrarModal,
    turnoSeleccionado,
    setTurnoSeleccionado,
    empleados,
    obtenerTurnos
}) => {
    const [guardando, setGuardando] = useState(false);

    if (!turnoSeleccionado) return null;

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setTurnoSeleccionado(prev => ({ ...prev, [name]: value }));
    };

    const guardarCambios = async () => {
        setGuardando(true);
        try {
            // Formatear la fecha a YYYY-MM-DD
            const fechaFormateada = turnoSeleccionado.fecha.split("T")[0];

            const res = await fetch(
                `http://localhost:3000/api/turnos/${turnoSeleccionado.id_turno}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_empleado: turnoSeleccionado.id_empleado,
                        fecha: fechaFormateada,
                        hora_inicio: turnoSeleccionado.hora_inicio,
                        hora_fin: turnoSeleccionado.hora_fin,
                        tipo_turno: turnoSeleccionado.tipo_turno
                    })
                }
            );

            if (!res.ok) throw new Error("Error al actualizar turno");

            setMostrarModal(false);
            await obtenerTurnos();
        } catch (error) {
            console.error("No se pudo actualizar el turno:", error);
            alert("No se pudo actualizar el turno. Revisa la consola.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Turno</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Empleado */}
                    <Form.Group className="mb-3" controlId="empleado">
                        <Form.Label>Empleado</Form.Label>
                        <Form.Select
                            name="id_empleado"
                            value={turnoSeleccionado.id_empleado}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">Seleccione un empleado</option>
                            {empleados &&
                                empleados.map(emp => (
                                    <option key={emp.id_empleado} value={emp.id_empleado}>
                                        {emp.nombre} {emp.apellido}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Fecha */}
                    <Form.Group className="mb-3" controlId="fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha"
                            value={turnoSeleccionado.fecha ? turnoSeleccionado.fecha.split("T")[0] : ""}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    {/* Hora de inicio */}
                    <Form.Group className="mb-3" controlId="horaInicio">
                        <Form.Label>Hora de Inicio</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora_inicio"
                            value={turnoSeleccionado.hora_inicio}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    {/* Hora de fin */}
                    <Form.Group className="mb-3" controlId="horaFin">
                        <Form.Label>Hora de Fin</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora_fin"
                            value={turnoSeleccionado.hora_fin}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    {/* Tipo de turno */}
                    <Form.Group className="mb-3" controlId="tipoTurno">
                        <Form.Label>Tipo de Turno</Form.Label>
                        <Form.Select
                            name="tipo_turno"
                            value={turnoSeleccionado.tipo_turno}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">Seleccione un tipo</option>
                            <option value="mañana">Mañana</option>
                            <option value="tarde">Tarde</option>
                            <option value="noche">Noche</option>
                            <option value="flexible">Flexible</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setMostrarModal(false)}
                    disabled={guardando}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={guardarCambios}
                    disabled={guardando}
                >
                    {guardando ? "Guardando..." : "Guardar cambios"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarTurno;
