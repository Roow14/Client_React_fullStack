import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Importando o arquivo CSS

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerName, setRegisterName] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });
      setToken(response.data.token); // Armazena o token de autenticação
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/users/register', { email: registerEmail, password: registerPassword, name: registerName });
      alert('Registration successful');
      setShowRegister(false); // Oculta o formulário de registro após o sucesso
    } catch (err) {
      setRegisterError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      {!showRegister ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
            <button type="button" onClick={() => setShowRegister(true)}>Cadastre-se</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Crie sua conta</h2>
          <p>Insira seus dados para completar o seu cadastro</p>
          <form onSubmit={handleRegisterSubmit}>
            <div>
              <label>Nome completo:</label>
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Digite seu nome completo"
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>
            <div>
              <label>Confirmar Senha:</label>
              <input
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                required
              />
            </div>
            {registerError && <p className="error">{registerError}</p>}
            <button type="submit">Cadastrar</button>
            <button type="button" onClick={() => setShowRegister(false)}>Voltar ao Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
