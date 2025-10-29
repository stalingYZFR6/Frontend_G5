import { Table, Spinner, Button } from "react-bootstrap";

const TablaTurnos = ({ turnos, cargando, setMostrarModalEditar, setMostrarModalEliminar, setTurnoSeleccionado }) => {
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
                        <td>{turno.id_empleado}</td>
                        <td>{turno.fecha}</td>
                        <td>{turno.hora_inicio}</td>
                        <td>{turno.hora_fin}</td>
                        <td>{turno.tipo_turno}</td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2"
                                onClick={() => { setTurnoSeleccionado(turno); setMostrarModalEditar(true); }}
                            >Editar</Button>
                            <Button variant="danger" size="sm"
                                onClick={() => { setTurnoSeleccionado(turno); setMostrarModalEliminar(true); }}
                            >Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TablaTurnos;
