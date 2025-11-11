import { Table, Spinner, Button } from "react-bootstrap";

const TablaRegistroAsistencia = ({
    registros,
    cargando,
    setMostrarModalEditar,
    setMostrarModalEliminar,
    setAsistenciaSeleccionada
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
                        {/* Fecha solo con día/mes/año */}
                        <td>
                            {registro.fecha
                                ? new Date(registro.fecha).toLocaleDateString()
                                : ''}
                        </td>
                        <td>{registro.hora_entrada}</td>
                        <td>{registro.hora_salida}</td>
                        <td>{registro.horas_trabajadas}</td>
                        <td>
                            <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                    setAsistenciaSeleccionada(registro);
                                    setMostrarModalEditar(true);
                                }}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                    setAsistenciaSeleccionada(registro);
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

export default TablaRegistroAsistencia;
