import { useState } from 'react'
import './App.css'
import imagen from './assets/zzzzzz.webp'; // tu imagen

const App = () => {
  return (
    <>
      <h1>Sistema gestor de empleados</h1>
      <img src={imagen} alt="Imagen de la página" />
      <div className="buttons">
        <button>Iniciar Sesión</button>
        <button>Regístrate</button>
      </div>
    </>
  )

}
export default App;

