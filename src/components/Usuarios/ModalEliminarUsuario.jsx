import { Modal, Button } from "react-bootstrap";

const ModalEliminarUsuario = ({
  mostrarModal,
  setMostrarModal,
  usuarioSeleccionado,
  eliminarUsuario
}) => {
  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          ¿Está seguro que desea eliminar al usuario{" "}
          <strong>{usuarioSeleccionado?.login}</strong>?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            eliminarUsuario(usuarioSeleccionado.id_usuario);
            setMostrarModal(false);
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarUsuario;
