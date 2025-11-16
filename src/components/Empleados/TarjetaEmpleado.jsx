import React from "react";
import { Col, Card, Stack, Badge } from "react-bootstrap";

const TarjetaEmpleado = ({ empleado }) => {
  const { nombre, apellido, cedula, correo, telefono, direccion, nombre_rol, foto } = empleado;

  return (
    <Col lg={3} md={4} sm={6} xs={12} className="mt-3">
      <Card>
        {foto ? (
          <Card.Img
            variant="top"
            src={`data:image/png;base64,${foto}`}
            alt={`${nombre} ${apellido}`}
            style={{ maxHeight: "150px", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              height: "150px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#888",
            }}
          >
            Sin foto
          </div>
        )}
        <Card.Body>
          <Card.Title>{nombre} {apellido}</Card.Title>
          <Card.Text>
            <strong>Cédula:</strong> {cedula} <br />
            <strong>Correo:</strong> {correo || "N/A"} <br />
            <strong>Teléfono:</strong> {telefono || "N/A"} <br />
            <strong>Dirección:</strong> {direccion || "N/A"} <br />
          </Card.Text>
          <Stack direction="horizontal" gap={2}>
            <Badge bg="info">{nombre_rol || "Rol desconocido"}</Badge>
          </Stack>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaEmpleado;

