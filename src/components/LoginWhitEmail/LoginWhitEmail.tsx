import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LoginWithGoogle from '../LoginWithGoogle/LoginWithGoogle';
import { useNavigate } from 'react-router-dom';

const LoginWhitEmail: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>
          Correo Electrónico:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Iniciar Sesión</button>
      </form>
      <button
        onClick={() => {
          navigate('/signUp');
        }}
      >
        Sign Up
      </button>
      <LoginWithGoogle />
    </div>
  );
};

export default LoginWhitEmail;
