import { Modal, Button } from "react-bootstrap";

const ModalEliminarIncidencia = ({
    mostrarModal,
    setMostrarModal,
    incidenciaSeleccionada,
    eliminarIncidencia
}) => {
    if (!incidenciaSeleccionada) return null;

    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Incidencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Estás seguro de que deseas eliminar la incidencia de{" "}
                    <strong>
                        {incidenciaSeleccionada.id_empleado}
                    </strong>{" "}
                    del día{" "}
                    <strong>
                        {incidenciaSeleccionada.fecha_incidencia?.split("T")[0]}
                    </strong>
                    ?
                </p>
                {incidenciaSeleccionada.descripcion && (
                    <p>
                        <strong>Descripción:</strong> {incidenciaSeleccionada.descripcion}
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        eliminarIncidencia(incidenciaSeleccionada.id_incidencia);
                        setMostrarModal(false);
                    }}
                >
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEliminarIncidencia;
