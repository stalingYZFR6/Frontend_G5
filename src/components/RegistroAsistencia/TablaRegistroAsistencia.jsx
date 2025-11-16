import { Table, Spinner, Button, Image } from "react-bootstrap";

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
                    <th>Empleado</th>
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

                        {/* Empleado con imagen */}
                        <td className="d-flex align-items-center">
                            {registro.foto ? (
                                <Image
                                    src={`data:image/png;base64,${registro.foto}`}
                                    alt={registro.nombre + " " + registro.apellido}
                                    roundedCircle
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        backgroundColor: '#ccc',
                                        borderRadius: '50%',
                                        marginRight: '10px'
                                    }}
                                />
                            )}
                            <span>{registro.nombre} {registro.apellido}</span>
                        </td>

                        <td>{registro.id_turno}</td>

                        <td>{registro.fecha ? new Date(registro.fecha).toLocaleDateString() : ''}</td>
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
