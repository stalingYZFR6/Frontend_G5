import { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const ModalEditarUsuario = ({
  mostrarModal,
  setMostrarModal,
  usuarioSeleccionado,
  guardarCambios,
  empleados
}) => {
  const [usuarioEdit, setUsuarioEdit] = useState({ ...usuarioSeleccionado });
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Cada vez que cambie el usuarioSeleccionado, actualizar estado local
  useEffect(() => {
    setUsuarioEdit({ ...usuarioSeleccionado });
  }, [usuarioSeleccionado]);

  if (!usuarioSeleccionado) return null;

  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Empleado */}
          <Form.Group className="mb-3" controlId="empleado">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={usuarioEdit.id_empleado}
              onChange={(e) =>
                setUsuarioEdit({ ...usuarioEdit, id_empleado: e.target.value })
              }
              required
            >
              <option value="">Seleccione un empleado</option>
              {empleados?.map((emp) => (
                <option key={emp.id_empleado} value={emp.id_empleado}>
                  {emp.nombre} {emp.apellido}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Login */}
          <Form.Group className="mb-3" controlId="login">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              name="login"
              value={usuarioEdit.login || ""}
              onChange={(e) =>
                setUsuarioEdit({ ...usuarioEdit, login: e.target.value })
              }
              placeholder="Ingrese login"
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={mostrarPassword ? "text" : "password"}
                name="password"
                value={usuarioEdit.password || ""}
                onChange={(e) =>
                  setUsuarioEdit({ ...usuarioEdit, password: e.target.value })
                }
                placeholder="Ingrese contraseña"
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? "Ocultar" : "Mostrar"}
              </Button>
            </InputGroup>
          </Form.Group>

          {/* Rol */}
          <Form.Group className="mb-3" controlId="rol">
            <Form.Label>Rol Aplicación</Form.Label>
            <Form.Select
              name="rol_aplicacion"
              value={usuarioEdit.rol_aplicacion || ""}
              onChange={(e) =>
                setUsuarioEdit({ ...usuarioEdit, rol_aplicacion: e.target.value })
              }
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="cajero">Cajero</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
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
          onClick={() => guardarCambios(usuarioEdit)}
          disabled={
            !usuarioEdit.id_empleado ||
            !usuarioEdit.login ||
            !usuarioEdit.password ||
            !usuarioEdit.rol_aplicacion
          }
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditarUsuario;
