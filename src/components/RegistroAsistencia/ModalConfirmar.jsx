// src/components/shared/ModalConfirmar.jsx
import { Modal, Button } from "react-bootstrap";

const ModalConfirmar = ({ mostrar, cerrar, titulo, mensaje, onConfirmar }) => {
  return (
    <Modal show={mostrar} onHide={cerrar} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo || "Confirmar Acción"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{mensaje}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrar}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => {
          onConfirmar();
          cerrar();
        }}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmar;