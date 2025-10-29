import { Modal, Button } from "react-bootstrap";

const ModalEliminarTurno = ({ mostrarModal, setMostrarModal, turnoSeleccionado, eliminarTurno }) => {
    if (!turnoSeleccionado) return null;

    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Turno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Desea eliminar el turno de <strong>{turnoSeleccionado.id_empleado}</strong> del día <strong>{turnoSeleccionado.fecha}</strong>?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                        eliminarTurno(turnoSeleccionado.id_turno);
                        setMostrarModal(false);
                    }}
                >
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEliminarTurno;
