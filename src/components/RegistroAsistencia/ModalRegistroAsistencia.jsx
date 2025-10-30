import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroAsistencia = ({
  mostrarModal,
  setMostrarModal,
  nuevoRegistro,
  manejarCambioInput,
  agregarRegistro,
  empleados,
  turnos
}) => {
  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Asistencia</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Selección de empleado */}
          <Form.Group className="mb-3" controlId="empleado">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={nuevoRegistro.id_empleado}
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

          {/* Selección de turno */}
          <Form.Group className="mb-3" controlId="turno">
            <Form.Label>Turno</Form.Label>
            <Form.Select
              name="id_turno"
              value={nuevoRegistro.id_turno}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Seleccione un turno</option>
              {turnos &&
                turnos.map((turno) => (
                  <option key={turno.id_turno} value={turno.id_turno}>
                    {turno.tipo_turno} ({turno.hora_inicio} - {turno.hora_fin})
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          {/* Fecha */}
          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={nuevoRegistro.fecha}
              onChange={manejarCambioInput}
              required
            />
          </Form.Group>

          {/* Hora de entrada */}
          <Form.Group className="mb-3" controlId="horaEntrada">
            <Form.Label>Hora de Entrada</Form.Label>
            <Form.Control
              type="time"
              name="hora_entrada"
              value={nuevoRegistro.hora_entrada}
              onChange={manejarCambioInput}
              required
            />
          </Form.Group>

          {/* Hora de salida */}
          <Form.Group className="mb-3" controlId="horaSalida">
            <Form.Label>Hora de Salida</Form.Label>
            <Form.Control
              type="time"
              name="hora_salida"
              value={nuevoRegistro.hora_salida}
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
          onClick={agregarRegistro}
          disabled={
            !nuevoRegistro.id_empleado ||
            !nuevoRegistro.id_turno ||
            !nuevoRegistro.fecha ||
            !nuevoRegistro.hora_entrada ||
            !nuevoRegistro.hora_salida
          }
        >
          Guardar Registro
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroAsistencia;
