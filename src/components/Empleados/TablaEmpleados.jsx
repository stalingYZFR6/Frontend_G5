import { Table, Spinner, Button } from "react-bootstrap";

const TablaEmpleados = ({
  empleados,
  cargando,
  setMostrarModalEditar,
  setMostrarModalEliminar,
  setEmpleadoSeleccionado,
}) => {
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
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cédula</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <tr key={empleado.id_empleado}>
            <td>{empleado.id_empleado}</td>
            <td>{empleado.nombre}</td>
            <td>{empleado.apellido}</td>
            <td>{empleado.cedula}</td>
            <td>{empleado.correo}</td>
            <td>{empleado.telefono}</td>
            <td>{empleado.direccion}</td>
            <td>{empleado.nombre_rol || empleado.id_rol}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => {
                  setEmpleadoSeleccionado(empleado);
                  setMostrarModalEditar(true);
                }}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setEmpleadoSeleccionado(empleado);
                  setMostrarModalEliminar(true);
                }}
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

export default TablaEmpleados;

