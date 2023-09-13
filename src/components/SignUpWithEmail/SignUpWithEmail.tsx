import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';

const SignUpWithEmail: React.FC = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error: ', error);
      // Maneja el error de creación de usuario según tus necesidades
    }
  };
  return (
    <div>
      <h2>Registrarse</h2>
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
        <button type='submit'>Registrarse</button>
      </form>
    </div>
  );
};

export default SignUpWithEmail;
