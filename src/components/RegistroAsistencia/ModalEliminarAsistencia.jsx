import { Modal, Button } from "react-bootstrap";

const ModalEliminarAsistencia = ({ mostrarModal, setMostrarModal, asistenciaSeleccionada, eliminarAsistencia }) => {
    if (!asistenciaSeleccionada) return null;

    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Registro de Asistencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Desea eliminar el registro de asistencia del empleado{" "}
                    <strong>{asistenciaSeleccionada.id_empleado}</strong> correspondiente al día{" "}
                    <strong>{asistenciaSeleccionada.fecha}</strong>?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setMostrarModal(false)}
                >
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                        eliminarAsistencia(asistenciaSeleccionada.id_registro);
                        setMostrarModal(false);
                    }}
                >
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEliminarAsistencia;