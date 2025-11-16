import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

const ModalRegistroEmpleado = ({
    mostrarModal,
    setMostrarModal,
    crearEmpleado, // función del padre que hace POST al backend
    roles,          // lista de roles desde la vista principal
}) => {
    const [empleadoLocal, setEmpleadoLocal] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
        telefono: "",
        direccion: "",
        id_rol: "",
        foto: "", // <-- Nuevo campo para la foto en Base64
    });

    const [error, setError] = useState("");

    // Manejar cambios en los inputs
    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setEmpleadoLocal((prev) => ({ ...prev, [name]: value }));
    };

    // Manejar cambio de la foto
    const manejarCambioFoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmpleadoLocal(prev => ({
                    ...prev,
                    foto: reader.result.split(',')[1] // Solo Base64
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Guardar empleado
    const handleGuardar = async () => {
        setError("");

        // Validaciones básicas
        if (!empleadoLocal.nombre || !empleadoLocal.apellido || !empleadoLocal.cedula || !empleadoLocal.id_rol) {
            setError("Debe llenar todos los campos obligatorios.");
            return;
        }

        try {
            await crearEmpleado(empleadoLocal);

            // Reiniciar campos
            setEmpleadoLocal({
                nombre: "",
                apellido: "",
                cedula: "",
                correo: "",
                telefono: "",
                direccion: "",
                id_rol: "",
                foto: "",
            });

            setMostrarModal(false);
        } catch (err) {
            if (err.message) setError(err.message);
            else setError("Error desconocido al crear el empleado");
        }
    };

    return (
        <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Empleado</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={empleadoLocal.nombre}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Apellido *</Form.Label>
                        <Form.Control
                            type="text"
                            name="apellido"
                            value={empleadoLocal.apellido}
                            onChange={manejarCambioInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cédula *</Form.Label>
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
                        <Form.Label>Rol *</Form.Label>
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

                    {/* Input para la foto */}
                    <Form.Group className="mb-3" controlId="formFotoEmpleado">
                        <Form.Label>Foto</Form.Label>
                        {empleadoLocal.foto && (
                            <div>
                                <img
                                    src={`data:image/png;base64,${empleadoLocal.foto}`}
                                    alt="Foto actual"
                                    style={{ maxWidth: '100px', marginBottom: '10px' }}
                                />
                            </div>
                        )}
                        <Form.Control
                            type="file"
                            name="foto"
                            accept="image/*"
                            onChange={manejarCambioFoto}
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
                    onClick={handleGuardar}
                    disabled={!empleadoLocal.nombre || !empleadoLocal.apellido || !empleadoLocal.cedula || !empleadoLocal.id_rol}
                >
                    Guardar Empleado
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroEmpleado;

