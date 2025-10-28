import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroTurno = ({
    mostrarModal,
    setMostrarModal,
    nuevoTurno,
    manejarCambioInput,
    agregarTurno,
}) => {
    return (
        <Modal backdrop='static' show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Turno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="empleado">
                        <Form.Label>Empleado</Form.Label>
                        <Form.Control
                            type="number"
                            name="id_empleado"
                            value={nuevoTurno.id_empleado}
                            onChange={manejarCambioInput}
                            placeholder="ID del empleado"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha"
                            value={nuevoTurno.fecha}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="horaInicio">
                        <Form.Label>Hora de Inicio</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora_inicio"
                            value={nuevoTurno.hora_inicio}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="horaFin">
                        <Form.Label>Hora de Fin</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora_fin"
                            value={nuevoTurno.hora_fin}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="tipoTurno">
                        <Form.Label>Tipo de Turno</Form.Label>
                        <Form.Select
                            name="tipo_turno"
                            value={nuevoTurno.tipo_turno}
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
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={agregarTurno}
                    disabled={!nuevoTurno.id_empleado || !nuevoTurno.fecha || !nuevoTurno.hora_inicio || !nuevoTurno.hora_fin || !nuevoTurno.tipo_turno}
                >
                    Guardar Turno
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroTurno;
