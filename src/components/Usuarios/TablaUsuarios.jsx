import { Table, Spinner, Button, } from "react-bootstrap";

const TablaUsuarios = ({ usuarios, cargando }) => {
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
                    <th>Login</th>
                    <th>Rol Aplicación</th>
                    <th>Última Actividad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.id_usuario}>
                        <td>{usuario.id_usuario}</td>
                        <td>{usuario.id_empleado}</td>
                        <td>{usuario.login}</td>
                        <td>{usuario.rol_aplicacion}</td>
                        <td>{usuario.ultima_actividad}</td>
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

export default TablaUsuarios;
