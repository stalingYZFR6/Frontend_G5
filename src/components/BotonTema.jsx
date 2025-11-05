import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { Button } from "react-bootstrap";

const BotonTema = () => {
    const { modoOscuro, toggleModoOscuro } = useContext(ThemeContext);

    return (
        <Button
            variant="outline-secondary"
            size="sm"
            onClick={toggleModoOscuro}
            className="d-flex align-items-center justify-content-center p-1"
        >
            {modoOscuro ? (
                <i className="bi bi-sun-fill"></i> // icono sol para modo oscuro
            ) : (
                <i className="bi bi-moon-fill"></i> // icono luna para modo claro
            )}
        </Button>
    );
};

export default BotonTema;
