import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroIncidencia = ({
  mostrarModal,
  setMostrarModal,
  nuevaIncidencia,
  manejarCambioInput,
  agregarIncidencia,
  empleados // lista de empleados
}) => {
  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Incidencia</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Selección de empleado */}
          <Form.Group className="mb-3" controlId="empleado">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={nuevaIncidencia.id_empleado}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Seleccione un empleado</option>
              {empleados &&
                empleados.map((emp) => (
                  <option key={emp.id_empleado} value={emp.id_empleado}>
                    {emp.nombre} {emp.apellido}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          {/* Selección del tipo de incidencia */}
          <Form.Group className="mb-3" controlId="tipoIncidencia">
            <Form.Label>Tipo de Incidencia</Form.Label>
            <Form.Select
              name="tipo_incidencia"
              value={nuevaIncidencia.tipo_incidencia}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Seleccione tipo</option>
              <option value="retraso">Retraso</option>
              <option value="ausencia">Ausencia</option>
              <option value="permiso">Permiso</option>
              <option value="otro">Otro</option>
            </Form.Select>
          </Form.Group>

          {/* Descripción opcional */}
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción (opcional)"
              name="descripcion"
              value={nuevaIncidencia.descripcion}
              onChange={manejarCambioInput}
            />
          </Form.Group>

          {/* Fecha de incidencia */}
          <Form.Group className="mb-3" controlId="fechaIncidencia">
            <Form.Label>Fecha de Incidencia</Form.Label>
            <Form.Control
              type="date"
              name="fecha_incidencia"
              value={nuevaIncidencia.fecha_incidencia}
              onChange={manejarCambioInput}
              required
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
          onClick={agregarIncidencia}
          disabled={
            !nuevaIncidencia.id_empleado ||
            !nuevaIncidencia.tipo_incidencia ||
            !nuevaIncidencia.fecha_incidencia
          }
        >
          Guardar Incidencia
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroIncidencia;