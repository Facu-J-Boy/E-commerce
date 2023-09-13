import React from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LoginWithGoogle from '../LoginWithGoogle/LoginWithGoogle';
import { useNavigate } from 'react-router-dom';

const LoginWhitEmail: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Correo Electrónico:
          <input type='email' {...register('email')} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type='password' {...register('password')} />
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
