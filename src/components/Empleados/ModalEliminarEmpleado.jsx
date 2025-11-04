import { Modal, Button } from "react-bootstrap";

const ModalEliminarEmpleado = ({
    mostrarModal,
    setMostrarModal,
    empleadoSeleccionado,
    eliminarEmpleado
}) => {
    return (
        <Modal
            backdrop="static"
            show={mostrarModal}
            onHide={() => setMostrarModal(false)}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Empleado</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>¿Está seguro que desea eliminar al empleado <strong>{empleadoSeleccionado?.nombre} {empleadoSeleccionado?.apellido}</strong>?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    onClick={() => eliminarEmpleado(empleadoSeleccionado.id_empleado)}
                >
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEliminarEmpleado;
