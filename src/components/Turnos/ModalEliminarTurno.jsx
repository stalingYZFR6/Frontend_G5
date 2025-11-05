import { Modal, Button } from "react-bootstrap";

const ModalEliminarTurno = ({
  mostrarModal,
  setMostrarModal,
  turnoSeleccionado,
  obtenerTurnos
}) => {

  // Función para eliminar el turno
  const eliminarTurno = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/turnos/${turnoSeleccionado.id_turno}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al eliminar el turno");
      }

      // Actualizar lista de turnos y cerrar modal
      obtenerTurnos();
      setMostrarModal(false);
    } catch (error) {
      console.error("No se pudo eliminar el turno:", error);
      alert("No se pudo eliminar el turno. Revisa la consola.");
    }
  };

  if (!turnoSeleccionado) return null;

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de eliminar el turno del empleado <strong>{turnoSeleccionado.id_empleado}</strong> en la fecha <strong>{turnoSeleccionado.fecha}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={eliminarTurno}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarTurno;
