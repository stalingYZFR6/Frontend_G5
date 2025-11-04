import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const ModalEditarEmpleado = ({
    mostrarModal,
    setMostrarModal,
    empleadoSeleccionado,
    editarEmpleado,
    roles,
}) => {
    const [empleadoLocal, setEmpleadoLocal] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
        telefono: "",
        direccion: "",
        id_rol: "",
    });

    // Cada vez que cambia el empleado seleccionado, se copia al estado local
    useEffect(() => {
        if (empleadoSeleccionado) {
            setEmpleadoLocal({ ...empleadoSeleccionado });
        }
    }, [empleadoSeleccionado]);

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setEmpleadoLocal((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardar = async () => {
        if (!empleadoLocal.nombre || !empleadoLocal.apellido || !empleadoLocal.cedula || !empleadoLocal.id_rol) {
            return alert("Debe llenar todos los campos obligatorios");
        }
        await editarEmpleado(empleadoLocal.id_empleado, empleadoLocal);
        setMostrarModal(false);
    };

    return (
        <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Empleado</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={empleadoLocal.nombre}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="apellido"
                            value={empleadoLocal.apellido}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cédula</Form.Label>
                        <Form.Control
                            type="text"
                            name="cedula"
                            value={empleadoLocal.cedula}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            name="correo"
                            value={empleadoLocal.correo || ""}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="telefono"
                            value={empleadoLocal.telefono || ""}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="direccion"
                            value={empleadoLocal.direccion || ""}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Select
                            name="id_rol"
                            value={empleadoLocal.id_rol}
                            onChange={manejarCambioInput}
                        >
                            <option value="">Seleccione un rol</option>
                            {roles.map((rol) => (
                                <option key={rol.id_rol} value={rol.id_rol}>
                                    {rol.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={handleGuardar}
                    disabled={!empleadoLocal.nombre || !empleadoLocal.apellido || !empleadoLocal.cedula || !empleadoLocal.id_rol}
                >
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarEmpleado;
