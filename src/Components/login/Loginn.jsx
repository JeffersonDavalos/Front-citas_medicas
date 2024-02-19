import React, { useState, useEffect } from 'react'; // Añadir importación de useState
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      if (!rememberMe) {
        clearStoredCredentials();
      }
      navigate('/principal');
    } else {
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    }
  };

  const clearStoredCredentials = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, [navigate]); // Agregar navigate a la lista de dependencias

  return (
    <div className='wrapper'>
      <form>
        <h1>Login</h1>
        <div className="input-box">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='remember-forgot'>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Recordarme
          </label>
          <a  href="#" onClick={clearStoredCredentials}>¿Olvidaste tu contraseña?</a>
        </div>
        <button type="button" onClick={handleLogin}>Ingresar</button>
        <div className='register-link'>
          <p> ¿No tienes cuenta? <a href="#">Register</a> </p> 
        </div>
      </form>
    </div>
  );
}

export default Login;

