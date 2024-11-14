import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styleRegister.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Criar nova conta</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="username"
              type="text"
              required
              className="register-input"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              required
              className="register-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              required
              className="register-input"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="confirmPassword"
              type="password"
              required
              className="register-input"
              placeholder="Confirmar Senha"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="register-error-message">{error}</div>
          )}

          <button type="submit" className="register-button">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
