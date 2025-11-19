// src/views/RegistroAsistencia.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import TablaJornadas from "../components/RegistroAsistencia/TablaJornadas";
import ModalDetalleDia from "../components/RegistroAsistencia/ModalDetalleDia";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda.jsx";

const RegistroAsistencia = () => {
  const [jornadas, setJornadas] = useState([]);
  const [jornadaSel, setJornadaSel] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const hoy = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD correcto

  const cargarJornadas = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/jornadas-asistencia");
      const data = await res.json();
      setJornadas(data);
      setCargando(false);
    } catch (err) {
      console.error(err);
      setCargando(false);
    }
  };

  // ABRIR DÍA DE HOY - 100% SEGURO
  const abrirDiaDeHoy = async () => {
  await cargarJornadas();

  let jornadaHoy = jornadas.find(j => j.fecha === hoy);

  if (!jornadaHoy) {
    const crearRes = await fetch("http://localhost:3000/api/jornadas-asistencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fecha: hoy })
    });

    if (!crearRes.ok) {
      alert("Error real al crear la jornada. Intenta de nuevo.");
      return;
    }

    await cargarJornadas();
    jornadaHoy = jornadas.find(j => j.fecha === hoy);
  }

  if (jornadaHoy) {
    verDetalle(jornadaHoy);
  }
};

  const verDetalle = async (jornada) => {
    if (!jornada || !jornada.id_jornada) {
      console.error("Jornada inválida:", jornada);
      return;
    }

    setJornadaSel(jornada);
    try {
      const res = await fetch(`http://localhost:3000/api/detalle-asistencia/${jornada.id_jornada}`);
      if (res.ok) {
        const data = await res.json();
        setDetalles(data);
      } else {
        setDetalles([]);
      }
    } catch (err) {
      console.error("Error cargando detalle:", err);
      setDetalles([]);
    }
  };

  const refrescarTodo = async () => {
    await cargarJornadas();
    if (jornadaSel) {
      verDetalle(jornadaSel);
    }
  };

  const eliminarJornada = async (id_jornada) => {
    if (!window.confirm("¿Estás seguro de eliminar esta jornada?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/jornadas-asistencia/${id_jornada}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("Jornada eliminada con éxito.");
        await cargarJornadas();
        setJornadaSel(null);
      } else {
        alert("Error al eliminar la jornada. Intenta de nuevo.");
      }
    } catch (err) {
      console.error("Error eliminando jornada:", err);
      alert("Error al eliminar la jornada. Intenta de nuevo.");
    }
  };

  useEffect(() => {
    window.updateJornadaMarcas = (id_jornada) => {
      setJornadas(prev => prev.map(j =>
        j.id_jornada === id_jornada 
          ? { ...j, total_marcas: (j.total_marcas || 0) + 1 } 
          : j
      ));
    };

    window.cargarJornadas = cargarJornadas;
  }, []);

  useEffect(() => {
    cargarJornadas();
    fetch("http://localhost:3000/api/empleados")
      .then(r => r.json())
      .then(setEmpleados);
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Control de Asistencia por Día</h2>

      <Row className="mb-3 align-items-center">
        <Col lg={5} md={6}>
          <CuadroBusquedas placeholder="Buscar por fecha..." />
        </Col>
        <Col className="text-end">
          <Button variant="success" size="lg" onClick={abrirDiaDeHoy}>
            Abrir Día de Hoy
            <Badge bg="light" text="dark" className="ms-2">
              {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
            </Badge>
          </Button>
        </Col>
      </Row>

      <TablaJornadas
        jornadas={jornadas}
        cargando={cargando}
        verDetalle={verDetalle}
        eliminarJornada={eliminarJornada}   // ← ESTA LÍNEA ES LA QUE FALTABA
        hoy={hoy}
      />

      {jornadaSel && jornadaSel.id_jornada && (
        <ModalDetalleDia
          mostrar={true}
          cerrar={() => setJornadaSel(null)}
          jornada={jornadaSel}
          detalles={detalles}
          empleados={empleados}
          onRefrescar={refrescarTodo}
        />
      )}
    </Container>
  );
};

export default RegistroAsistencia;