import React from "react";
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ vista }) => {
  // Verifica si el usuario está autenticado usando localStorage
  const estaLogueado = !!localStorage.getItem("usuario") && !!localStorage.getItem("contrasena");

  // Log para depuración
  console.log("Usuario autenticado:", estaLogueado);

  // Si está autenticado, renderiza la vista; si no, redirige al login
  return estaLogueado ? vista : <Navigate to="/" replace />;
};

export default RutaProtegida;