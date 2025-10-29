import { Modal, Form, Button } from "react-bootstrap";

const ModalEditarTurno = ({
    mostrarModal,
    setMostrarModal,
    turnoSeleccionado,
    manejarCambioInput,
    editarTurno,
    empleados
}) => {
    if (!turnoSeleccionado) return null;

    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Turno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="empleado">
                        <Form.Label>Empleado</Form.Label>
                        <Form.Select
                            name="id_empleado"
                            value={turnoSeleccionado.id_empleado}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">Seleccione un empleado</option>
                            {empleados && empleados.map(emp => (
                                <option key={emp.id_empleado} value={emp.id_empleado}>
                                    {emp.nombre} {emp.apellido}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha"
                            value={turnoSeleccionado.fecha}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

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
                <Button variant="secondary" type="button" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    type="button"
                    onClick={() => {
                        editarTurno(turnoSeleccionado.id_turno);
                        setMostrarModal(false);
                    }}
                >
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarTurno;
