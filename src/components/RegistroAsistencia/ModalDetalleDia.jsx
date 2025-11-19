// src/components/RegistroAsistencia/ModalDetalleDia.jsx
import { useState, useEffect } from "react";
import { Modal, Table, Button, Alert, Row, Col, Badge } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


import ModalConfirmar from "./ModalConfirmar";

const ModalDetalleDia = ({ mostrar, cerrar, jornada: jornadaProp, detalles, empleados, onRefrescar }) => {
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [mostrarConfirmarCerrar, setMostrarConfirmarCerrar] = useState(false);
  
  // ESTADO LOCAL PARA ACTUALIZAR AL INSTANTE EL ESTADO DE LA JORNADA
  const [jornada, setJornada] = useState(jornadaProp);

  // Actualiza el estado local cuando cambia la prop
  useEffect(() => {
    setJornada(jornadaProp);
  }, [jornadaProp]);

  const options = empleados.map(e => ({
    value: e.id_empleado,
    label: `${e.nombre} ${e.apellido}`
  }));

  const loadOptions = (input, callback) => {
    const filtered = options.filter(o => 
      o.label.toLowerCase().includes(input.toLowerCase())
    );
    callback(filtered);
  };

// FUNCIÓN MARCAR ENTRADA CORRECTA Y FUNCIONANDO
  const marcarEntrada = async () => {
    if (!selectedEmpleado) {
      alert("Selecciona un empleado");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/marcar-entrada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_jornada: Number(jornada.id_jornada),
          id_empleado: Number(selectedEmpleado.value)
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        alert(error.message || "Este empleado ya marcó entrada hoy");
        setSelectedEmpleado(null);
        return;
      }

      // ÉXITO
      setSelectedEmpleado(null);
      onRefrescar();

      if (window.updateJornadaMarcas) {
        window.updateJornadaMarcas(jornada.id_jornada);
      }

    } catch (err) {
      console.error("Error:", err);
      alert("Error de conexión");
    }
  };

  const marcarSalida = async (id_detalle) => {
    await fetch(`http://localhost:3000/api/marcar-salida/${id_detalle}`, { method: "PUT" });
    onRefrescar();
  };

  const eliminar = async (id_detalle) => {
    if (!confirm("¿Eliminar esta marca?")) return;
    await fetch(`http://localhost:3000/api/detalle-asistencia/${id_detalle}`, { method: "DELETE" });
    onRefrescar();
  };

  // CERRAR JORNADA CON ACTUALIZACIÓN AL INSTANTE
  const cerrarJornada = async () => {
    await fetch(`http://localhost:3000/api/cerrar-jornada/${jornada.id_jornada}`, { method: "PUT" });
    
    // ACTUALIZA AL INSTANTE EN EL MODAL Y EN LA LISTA PRINCIPAL
    setJornada(prev => ({ ...prev, estado: "cerrada" }));
    onRefrescar();
    
    // Actualiza la lista principal
    if (window.cargarJornadas) window.cargarJornadas();
  };

  // PDF Y EXCEL BONITOS
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("REPORTE DE ASISTENCIA", 14, 20);
    doc.setFontSize(12);
    doc.text(new Date(jornada.fecha).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase(), 14, 30);
    doc.setFontSize(10);
    doc.text(`Impreso: ${new Date().toLocaleString("es-ES")}`, 14, 38);

    const filas = detalles.map(d => [
      `${d.nombre} ${d.apellido}`,
      d.hora_entrada ? new Date(d.hora_entrada).toLocaleTimeString("es-ES") : "-",
      d.hora_salida ? new Date(d.hora_salida).toLocaleTimeString("es-ES") : "-",
      d.horas_trabajadas ? Number(d.horas_trabajadas).toFixed(2) + " h" : "-"
    ]);

    autoTable(doc, { head: [["Empleado", "Entrada", "Salida", "Horas"]], body: filas, startY: 45 });
    doc.save(`Asistencia_${jornada.fecha}.pdf`);
  };

  const exportarExcel = () => {
    const data = detalles.map(d => ({
      Empleado: `${d.nombre} ${d.apellido}`,
      Entrada: d.hora_entrada ? new Date(d.hora_entrada).toLocaleString("es-ES") : "",
      Salida: d.hora_salida ? new Date(d.hora_salida).toLocaleString("es-ES") : "",
      Horas: d.horas_trabajadas ? Number(d.horas_trabajadas).toFixed(2) : ""
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistencia");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), `Asistencia_${jornada.fecha}.xlsx`);
  };

  return (
    <>
      <Modal show={mostrar} onHide={cerrar} size="xl" fullscreen="lg-down">
        <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
          <Modal.Title>
            Asistencia - {new Date(jornada.fecha).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </Modal.Title>

          {/* BOTÓN CERRAR JORNADA O ESTADO CERRADA */}
          <div>
            {jornada.estado === "abierta" ? (
              <Button 
                variant="outline-danger" 
                size="lg"
                onClick={() => setMostrarConfirmarCerrar(true)}
              >
                Cerrar Jornada
              </Button>
            ) : (
              <Badge bg="secondary" className="fs-4 px-4 py-2">JORNADA CERRADA</Badge>
            )}
          </div>
        </Modal.Header>

        <Modal.Body>
          {/* BOTONES DE REPORTE */}
          <div className="mb-3 text-end">
            <Button variant="secondary" onClick={exportarExcel} className="me-2">
              Exportar Excel
            </Button>
            <Button variant="danger" onClick={exportarPDF}>
              Exportar PDF
            </Button>
          </div>

          {/* BUSCADOR PARA MARCAR ENTRADA */}
          {jornada.estado === "abierta" && (
            <Alert variant="success" className="mb-4">
              <Row className="align-items-center">
                <Col md={9}>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptions}
                    placeholder="Buscar empleado para marcar entrada..."
                    onChange={setSelectedEmpleado}
                    value={selectedEmpleado}
                    isClearable
                  />
                </Col>
                <Col md={3}>
                  <Button variant="primary" className="w-100" onClick={marcarEntrada}>
                    Marcar Entrada
                  </Button>
                </Col>
              </Row>
            </Alert>
          )}

          {/* TABLA DE ASISTENCIA */}
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Empleado</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Horas</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detalles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-muted">
                    No hay registros de asistencia para este día
                  </td>
                </tr>
              ) : (
                detalles.map(d => {
                  const tieneEntrada = !!d.hora_entrada;
                  const tieneSalida = !!d.hora_salida;

                  return (
                    <tr key={d.id_detalle}>
                      <td><strong>{d.nombre} {d.apellido}</strong></td>
                      <td>{tieneEntrada ? new Date(d.hora_entrada).toLocaleString("es-ES") : "—"}</td>
                      <td>{tieneSalida ? new Date(d.hora_salida).toLocaleString("es-ES") : "—"}</td>
                      <td>
                        {d.horas_trabajadas != null 
                          ? Number(d.horas_trabajadas).toFixed(2) + " h" 
                          : "—"
                        }
                      </td>
                      <td>
                        {tieneEntrada && tieneSalida && <Badge bg="success">Completo</Badge>}
                        {tieneEntrada && !tieneSalida && <Badge bg="warning" text="dark">En turno</Badge>}
                        {!tieneEntrada && <Badge bg="secondary">Sin marcar</Badge>}
                      </td>
                      <td>
                        {jornada.estado === "abierta" && tieneEntrada && !tieneSalida && (
                          <Button size="sm" variant="warning" onClick={() => marcarSalida(d.id_detalle)}>
                            Marcar Salida
                          </Button>
                        )}
                        {jornada.estado === "abierta" && (
                          <Button size="sm" variant="danger" className="ms-1" onClick={() => eliminar(d.id_detalle)}>
                            Eliminar
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={cerrar}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL CONFIRMACIÓN CERRAR JORNADA */}
      <ModalConfirmar
        mostrar={mostrarConfirmarCerrar}
        cerrar={() => setMostrarConfirmarCerrar(false)}
        titulo="Cerrar Jornada"
        mensaje={`¿Estás seguro de cerrar la jornada del ${new Date(jornada.fecha).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}?

Después de cerrar:
• No se podrán marcar más entradas/salidas
• No se podrán eliminar marcas
• Solo se podrá ver el reporte

Esta acción no se puede deshacer.`}
        onConfirmar={cerrarJornada}
      />
    </>
  );
};

export default ModalDetalleDia;