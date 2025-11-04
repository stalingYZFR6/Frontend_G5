import { Modal, Form, Button } from "react-bootstrap";

const ModalEditarAsistencia = ({
    mostrarModal,
    setMostrarModal,
    asistenciaSeleccionada,
    manejarCambioInput,
    editarAsistencia
}) => {
    if (!asistenciaSeleccionada) return null;

    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Registro de Asistencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="horaEntrada">
                        <Form.Label>Hora de Entrada</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora_entrada"
                            value={asistenciaSeleccionada.hora_entrada}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="horaSalida">
                        <Form.Label>Hora de Salida</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora_salida"
                            value={asistenciaSeleccionada.hora_salida}
                            onChange={manejarCambioInput}
                            required
                        />
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
                        editarAsistencia(asistenciaSeleccionada.id_registro);
                        setMostrarModal(false);
                    }}
                >
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarAsistencia;