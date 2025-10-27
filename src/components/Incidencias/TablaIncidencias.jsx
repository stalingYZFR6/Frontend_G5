import { Table, Spinner } from "react-bootstrap";

const TablaIncidencias = ({ incidencias, cargando }) => {

    if (cargando){
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
                            <td>{incidencia.fecha_incidencia}</td>
                            <td>Acción</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TablaIncidencias;