import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SignUpWithEmail: React.FC = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true); // Comienza  a ejecutarse la funcion
    const { email, password } = data;
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false); // Si el usuario se logueó correctamente termina el loading
    } catch (error) {
      setLoading(false); // Si hay un error también
      console.error('Error: ', error);
      // Maneja el error de creación de usuario según tus necesidades
    }
  };
  return (
    <div>
      {loading === true ? <p>loading...</p> : null}
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
