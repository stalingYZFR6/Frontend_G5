import { Modal, Button } from "react-bootstrap";

const ModalEliminarRol = ({ mostrarModal, setMostrarModal, rolSeleccionado, eliminarRol }) => {
  if (!rolSeleccionado) return null;

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Desea eliminar el rol <strong>{rolSeleccionado.nombre}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => eliminarRol(rolSeleccionado.id_rol)}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarRol;
