import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroRol = ({
    mostrarModal,
    setMostrarModal,
    nuevoRol,
    manejarCambioInput,
    agregarRol,
}) => {
    return (
        <Modal backdrop='static' show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Rol</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nombreRol">
                        <Form.Label>Nombre del Rol</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={nuevoRol.nombre}
                            onChange={manejarCambioInput}
                            placeholder="Ej: Cajero"
                            maxLength={25}
                            required
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={agregarRol}
                    disabled={!nuevoRol.nombre.trim()}
                >
                    Guardar Rol
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroRol;
