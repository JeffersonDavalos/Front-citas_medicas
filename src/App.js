//se hizo el cambio para que se pueda ver el login

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/login/Loginn';
import CrearCita from './Components/Principal/Crear_cita';
import Calendario from './Components/Principal/Calendario';
import Principal from './Components/Principal/Principal';
import Consultarcitas from './Components/Principal/Consultarcitas';
//import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/principal" element={<Principal />} />
        <Route path="/" element={<Login />} />
        <Route path="/crear-cita" element={<CrearCita />} />
        <Route path="/calendario" element={<Calendario />} /> 
        <Route path="/consultarCita" element={<Consultarcitas />} /> 
        <Route path="/Loginn" element={<Login />} /> 


      </Routes>
    </Router>
  );
}

export default App;
