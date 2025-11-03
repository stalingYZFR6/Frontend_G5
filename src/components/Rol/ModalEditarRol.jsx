import { Modal, Form, Button } from "react-bootstrap";

const ModalEditarRol = ({ mostrarModal, setMostrarModal, rolSeleccionado, manejarCambioInput, editarRol }) => {
  if (!rolSeleccionado) return null;

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreRol">
            <Form.Label>Nombre del Rol</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={rolSeleccionado.nombre}
              onChange={manejarCambioInput}
              placeholder="Ingrese el nombre del rol"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => editarRol(rolSeleccionado.id_rol)}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditarRol;
