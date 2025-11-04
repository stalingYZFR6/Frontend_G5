import { Table, Spinner, Button } from "react-bootstrap";

const TablaIncidencias = ({
    incidencias,
    cargando,
    setMostrarModalEditar,
    setMostrarModalEliminar,
    setIncidenciaSeleccionada
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
                    <th>Tipo de Incidencia</th>
                    <th>Descripción</th>
                    <th>Fecha de Incidencia</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {incidencias.map((incidencia) => (
                    <tr key={incidencia.id_incidencia}>
                        <td>{incidencia.id_incidencia}</td>
                        <td>{incidencia.id_empleado}</td>
                        <td>{incidencia.tipo_incidencia}</td>
                        <td>{incidencia.descripcion}</td>
                        <td>{incidencia.fecha_incidencia?.split("T")[0]}</td>
                        <td>
                            <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                    setIncidenciaSeleccionada(incidencia);
                                    setMostrarModalEditar(true);
                                }}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                    setIncidenciaSeleccionada(incidencia);
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

export default TablaIncidencias;
