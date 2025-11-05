import { Table, Spinner, Button } from "react-bootstrap";

const TablaTurnos = ({ turnos, cargando, seleccionarTurnoEditar, seleccionarTurnoEliminar }) => {
  if (cargando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive className="text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Empleado</th>
          <th>Fecha</th>
          <th>Hora Inicio</th>
          <th>Hora Fin</th>
          <th>Tipo Turno</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {turnos.map((turno) => (
          <tr key={turno.id_turno}>
            <td>{turno.id_turno}</td>
            <td>{turno.nombre_empleado} {turno.apellido_empleado}</td>
            <td>{turno.fecha}</td>
            <td>{turno.hora_inicio}</td>
            <td>{turno.hora_fin}</td>
            <td>{turno.tipo_turno}</td>
            <td>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => seleccionarTurnoEditar(turno)}
              >
                Editar
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => seleccionarTurnoEliminar(turno)}
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

export default TablaTurnos;
