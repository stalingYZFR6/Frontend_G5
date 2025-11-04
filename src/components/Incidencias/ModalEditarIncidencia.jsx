import { Modal, Form, Button } from "react-bootstrap";

const ModalEditarIncidencia = ({
    mostrarModal,
    setMostrarModal,
    incidenciaSeleccionada,
    manejarCambioInput,
    editarIncidencia,
    empleados
}) => {
    if (!incidenciaSeleccionada) return null;

    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Incidencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Empleado */}
                    <Form.Group className="mb-3" controlId="idEmpleado">
                        <Form.Label>Empleado</Form.Label>
                        <Form.Select
                            name="id_empleado"
                            value={incidenciaSeleccionada.id_empleado}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">Seleccione un empleado</option>
                            {empleados.map((empleado) => (
                                <option key={empleado.id_empleado} value={empleado.id_empleado}>
                                    {empleado.nombre} {empleado.apellido}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Tipo de incidencia */}
                    <Form.Group className="mb-3" controlId="tipoIncidencia">
                        <Form.Label>Tipo de Incidencia</Form.Label>
                        <Form.Select
                            name="tipo_incidencia"
                            value={incidenciaSeleccionada.tipo_incidencia}
                            onChange={manejarCambioInput}
                            required
                        >
                            <option value="">Seleccione un tipo</option>
                            <option value="retraso">Retraso</option>
                            <option value="ausencia">Ausencia</option>
                            <option value="permiso">Permiso</option>
                            <option value="otro">Otro</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Descripción */}
                    <Form.Group className="mb-3" controlId="descripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={incidenciaSeleccionada.descripcion || ""}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    {/* Fecha incidencia */}
                    <Form.Group className="mb-3" controlId="fechaIncidencia">
                        <Form.Label>Fecha de la Incidencia</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha_incidencia"
                            value={incidenciaSeleccionada.fecha_incidencia?.split("T")[0] || ""}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        editarIncidencia(incidenciaSeleccionada.id_incidencia);
                        setMostrarModal(false);
                    }}
                >
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarIncidencia;
