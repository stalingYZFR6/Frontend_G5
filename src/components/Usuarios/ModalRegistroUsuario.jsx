import { useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const ModalRegistroUsuario = ({
  mostrarModal,
  setMostrarModal,
  nuevoUsuario,
  manejarCambioInput,
  agregarUsuario,
  empleados = [] // <<< inicializamos para evitar undefined
}) => {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Selección de empleado */}
          <Form.Group className="mb-3" controlId="empleado">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={nuevoUsuario.id_empleado}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Seleccione un empleado</option>
              {empleados.length > 0
                ? empleados.map(emp => (
                    <option key={emp.id_empleado} value={emp.id_empleado}>
                      {emp.nombre} {emp.apellido}
                    </option>
                  ))
                : null}
            </Form.Select>
          </Form.Group>

          {/* Login */}
          <Form.Group className="mb-3" controlId="login">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              name="login"
              value={nuevoUsuario.login}
              onChange={manejarCambioInput}
              placeholder="Ingrese login"
              required
            />
          </Form.Group>

          {/* Password con mostrar/ocultar */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={mostrarPassword ? "text" : "password"}
                name="password"
                value={nuevoUsuario.password}
                onChange={manejarCambioInput}
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
              value={nuevoUsuario.rol_aplicacion}
              onChange={manejarCambioInput}
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
          onClick={agregarUsuario}
          disabled={
            !nuevoUsuario.id_empleado ||
            !nuevoUsuario.login ||
            !nuevoUsuario.password ||
            !nuevoUsuario.rol_aplicacion
          }
        >
          Guardar Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroUsuario;
