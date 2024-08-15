import React, { useState } from 'react';
import axios from 'axios';
 // Importe o arquivo de estilos, se necessário

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Limpa mensagens anteriores
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        confirmPassword
      });

      if (response.data.success) {
        // Redirecionar ou mostrar uma mensagem de sucesso
        setSuccessMessage('Registration successful! Please log in.');
      } else {
        // Exibe a mensagem de erro recebida do backend
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      // Exibe mensagem de erro genérica
      setErrorMessage('Error during registration. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h1>Crie sua conta</h1>
      <p>Insira seus dados para completar o seu cadastro</p>
      <form onSubmit={handleRegister}>
        <label>
          Nome completo
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Seu nome completo"
          />
        </label>
        <label>
          Email
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Seu email"
          />
        </label>
        <label>
          Senha
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Sua senha"
          />
        </label>
        <label>
          Confirmar Senha
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
            placeholder="Confirme sua senha"
          />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
