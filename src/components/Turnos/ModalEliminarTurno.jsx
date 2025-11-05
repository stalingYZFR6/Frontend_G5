import { Modal, Button } from "react-bootstrap";

const ModalEliminarTurno = ({
  mostrarModal,
  setMostrarModal,
  turnoSeleccionado,
  eliminarTurno, //  función recibida del padre
}) => {
  if (!turnoSeleccionado) return null;

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger fw-bold">
          Eliminar Turno
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="fs-5">
          ¿Estás seguro de que deseas eliminar el turno de{" "}
          <strong>
            {turnoSeleccionado.nombre_empleado}{" "}
            {turnoSeleccionado.apellido_empleado}
          </strong>{" "}
          del día{" "}
          <strong>{turnoSeleccionado.fecha}</strong>?
        </p>
        <p className="text-muted mb-0">
          Esta acción no se puede deshacer.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModal(false)}
        >
          Cancelar
        </Button>

        <Button
          variant="danger"
          onClick={() => eliminarTurno(turnoSeleccionado.id_turno)} //  usa la función del padre
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarTurno;

