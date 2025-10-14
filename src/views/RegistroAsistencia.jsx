import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

// Datos de ejemplo de empleados
const empleadosEjemplo = [
  { id: 1, nombre: "Gerson" },
  { id: 2, nombre: "Staling" },
  { id: 3, nombre: "Magdiel" },
];

const RegistroAsistencia = () => {
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");
  const [registros, setRegistros] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [horaSalida, setHoraSalida] = useState("");
  const [registroActual, setRegistroActual] = useState(null);

  const manejarEntrada = () => {
    if (!empleadoSeleccionado) {
      setMensaje("Selecciona un empleado");
      return;
    }

    const hoy = new Date().toISOString().split("T")[0];
    const registroExistente = registros.find(
      (r) => r.id_empleado === parseInt(empleadoSeleccionado) && r.fecha === hoy
    );

    const ahora = new Date();
    const horaEntrada = ahora.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    if (!registroExistente) {
      setRegistros([
        ...registros,
        {
          id_empleado: parseInt(empleadoSeleccionado),
          fecha: hoy,
          hora_entrada: horaEntrada,
          hora_salida: null,
          horas_trabajadas: null,
        },
      ]);
      setMensaje(`Entrada registrada a las ${horaEntrada}`);
    } else {
      setMensaje("Ya registraste entrada hoy");
    }
  };

  const abrirModalSalida = () => {
    if (!empleadoSeleccionado) {
      setMensaje("Selecciona un empleado");
      return;
    }

    const hoy = new Date().toISOString().split("T")[0];
    const registroExistente = registros.find(
      (r) => r.id_empleado === parseInt(empleadoSeleccionado) && r.fecha === hoy
    );

    if (!registroExistente) {
      setMensaje("Primero registra la entrada");
      return;
    }

    if (registroExistente.hora_salida) {
      setMensaje("Ya registraste la salida hoy");
      return;
    }

    setRegistroActual(registroExistente);
    setHoraSalida(""); // limpiar modal
    setShowModal(true);
  };

  const manejarSalida = () => {
    if (!horaSalida) return;

    const updatedRegistros = registros.map((r) => {
      if (r === registroActual) {
        // Convertir horaEntrada y horaSalida a Date para calcular horas trabajadas
        const [hEntrada, mEntrada, periodoEntrada] = r.hora_entrada
          .match(/(\d+):(\d+)\s?(AM|PM)/i)
          .slice(1);
        let entrada = new Date();
        let hEnt = parseInt(hEntrada);
        if (periodoEntrada.toUpperCase() === "PM" && hEnt !== 12) hEnt += 12;
        if (periodoEntrada.toUpperCase() === "AM" && hEnt === 12) hEnt = 0;
        entrada.setHours(hEnt, parseInt(mEntrada), 0);

        const [hSalida, mSalida] = horaSalida.split(":");
        let salida = new Date();
        salida.setHours(parseInt(hSalida), parseInt(mSalida), 0);

        const diffHoras = ((salida - entrada) / 3600000).toFixed(2);

        return { ...r, hora_salida: horaSalida, horas_trabajadas: diffHoras };
      }
      return r;
    });

    setRegistros(updatedRegistros);
    setMensaje(`Salida registrada a las ${horaSalida}`);
    setShowModal(false);
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col md={6} className="mx-auto">
          <h2>Registro de Asistencia</h2>
          <Form.Select
            className="my-3"
            value={empleadoSeleccionado}
            onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un empleado</option>
            {empleadosEjemplo.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.nombre}
              </option>
            ))}
          </Form.Select>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="success" onClick={manejarEntrada}>
              Registrar Entrada
            </Button>
            <Button variant="warning" onClick={abrirModalSalida}>
              Registrar Salida
            </Button>
          </div>
          {mensaje && <p className="mt-3">{mensaje}</p>}
        </Col>
      </Row>

      {/* Modal de salida */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Salida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Hora de salida</Form.Label>
            <Form.Control
              type="time"
              value={horaSalida}
              onChange={(e) => setHoraSalida(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" onClick={manejarSalida}>
            Guardar Salida
          </Button>
        </Modal.Body>
      </Modal>

      <Row className="mt-5">
        <Col>
          <h4>Registros del día</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Fecha</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Horas Trabajadas</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, idx) => {
                const emp = empleadosEjemplo.find((e) => e.id === r.id_empleado);
                return (
                  <tr key={idx}>
                    <td>{emp?.nombre}</td>
                    <td>{r.fecha}</td>
                    <td>{r.hora_entrada}</td>
                    <td>{r.hora_salida || "-"}</td>
                    <td>{r.horas_trabajadas || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistroAsistencia;
