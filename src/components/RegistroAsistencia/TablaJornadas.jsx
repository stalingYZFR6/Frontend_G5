// src/components/RegistroAsistencia/TablaJornadas.jsx
import { Table, Button, Badge } from "react-bootstrap";

const TablaJornadas = ({ jornadas, cargando, verDetalle, eliminarJornada, hoy }) => {
  if (cargando) return <div className="text-center my-5">Cargando jornadas...</div>;

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>Fecha</th>
          <th>Creada</th>
          <th>Marcas</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {jornadas.map((j) => (
          <tr key={j.id_jornada} className={j.fecha === hoy ? "table-success" : ""}>
            <td>
              <strong>
                {new Date(j.fecha).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {j.fecha === hoy && <Badge bg="success" className="ms-2">HOY</Badge>}
              </strong>
            </td>
            <td>{new Date(j.creado_el).toLocaleString("es-ES")}</td>
            <td>{j.total_marcas || 0} empleados</td>
            <td>
              <Badge bg={j.estado === "abierta" ? "primary" : "secondary"}>
                {j.estado}
              </Badge>
            </td>
            <td>
              <Button size="sm" variant="primary" className="me-2" onClick={() => verDetalle(j)}>
                Ver Detalle →
              </Button>
              <Button 
                size="sm" 
                variant="danger" 
                onClick={() => eliminarJornada(j.id_jornada)}  // ← SOLO EL ID
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaJornadas;