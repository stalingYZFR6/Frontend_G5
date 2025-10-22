import { Table, Spinner, Button } from "react-bootstrap";

const TablaRoles = ({ roles, cargando }) => {
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
                    <th>Nombre del Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {roles.map((rol) => (
                    <tr key={rol.id_rol}>
                        <td>{rol.id_rol}</td>
                        <td>{rol.nombre}</td>
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

export default TablaRoles;
