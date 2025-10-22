import { Table, Spinner, Button } from "react-bootstrap";

const TablaRegistroAsistencia = ({ registros, cargando }) => {
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
                    <th>ID Empleado</th>
                    <th>ID Turno</th>
                    <th>Fecha</th>
                    <th>Hora Entrada</th>
                    <th>Hora Salida</th>
                    <th>Horas Trabajadas</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {registros.map((registro) => (
                    <tr key={registro.id_registro}>
                        <td>{registro.id_registro}</td>
                        <td>{registro.id_empleado}</td>
                        <td>{registro.id_turno}</td>
                        <td>{registro.fecha}</td>
                        <td>{registro.hora_entrada}</td>
                        <td>{registro.hora_salida}</td>
                        <td>{registro.horas_trabajadas}</td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2">Editar</Button>
                            <Button variant="danger" size="sm">Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TablaRegistroAsistencia;
