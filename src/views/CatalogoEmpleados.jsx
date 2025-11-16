import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import TarjetaEmpleado from "../components/Empleados/TarjetaEmpleado";

const CatalogoEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerEmpleados = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/empleados");
      if (!res.ok) throw new Error("Error al obtener empleados");
      const data = await res.json();
      setEmpleados(data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  if (cargando)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );

  return (
    <Container className="mt-5">
      <h4>Catálogo de Empleados</h4>
      <Row>
        {empleados.map((empleado) => (
          <TarjetaEmpleado key={empleado.id_empleado} empleado={empleado} />
        ))}
      </Row>
    </Container>
  );
};

export default CatalogoEmpleados;


