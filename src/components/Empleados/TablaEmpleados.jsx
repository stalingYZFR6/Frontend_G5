import { Table, Spinner } from "react-bootstrap";

const TablaEmpleados = ({ empleados, cargando }) => {
  if (cargando) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive>
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
          {empleados.map((empleado) => {
            return (
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
                  <button className="btn btn-warning btn-sm me-2">Editar</button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TablaEmpleados;
