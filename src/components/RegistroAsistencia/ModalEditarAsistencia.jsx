import { Modal, Form, Button } from "react-bootstrap";

const ModalEditarAsistencia = ({
    mostrarModal,
    setMostrarModal,
    asistenciaSeleccionada,
    manejarCambioInput,
    editarAsistencia,
    empleados = [],
    turnos = []
}) => {
    if (!asistenciaSeleccionada) return null;

    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Registro de Asistencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Selección de empleado */}
                    <Form.Group className="mb-3" controlId="id_empleado">
                        <Form.Label>Empleado</Form.Label>
                        <Form.Control
                            as="select"
                            name="id_empleado"
                            value={asistenciaSeleccionada.id_empleado}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">-- Seleccione empleado --</option>
                            {empleados.map(emp => (
                                <option key={emp.id_empleado} value={emp.id_empleado}>
                                    {emp.nombre} {emp.apellido}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {/* Selección de turno */}
                    <Form.Group className="mb-3" controlId="id_turno">
                        <Form.Label>Turno</Form.Label>
                        <Form.Control
                            as="select"
                            name="id_turno"
                            value={asistenciaSeleccionada.id_turno}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">-- Seleccione turno --</option>
                            {turnos.map(turno => (
                                <option key={turno.id_turno} value={turno.id_turno}>
                                    {turno.tipo_turno} ({turno.hora_inicio} - {turno.hora_fin})
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {/* Fecha */}
                    <Form.Group className="mb-3" controlId="fecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha"
                            value={asistenciaSeleccionada.fecha.split('T')[0]}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    {/* Hora entrada */}
                    <Form.Group className="mb-3" controlId="hora_entrada">
                        <Form.Label>Hora de Entrada</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora_entrada"
                            value={asistenciaSeleccionada.hora_entrada || ""}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    {/* Hora salida */}
                    <Form.Group className="mb-3" controlId="hora_salida">
                        <Form.Label>Hora de Salida</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora_salida"
                            value={asistenciaSeleccionada.hora_salida || ""}
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
                    onClick={() => editarAsistencia(asistenciaSeleccionada.id_registro)}
                >
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarAsistencia;
