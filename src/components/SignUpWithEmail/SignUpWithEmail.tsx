import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignUpWithEmail.module.css';

interface FormData {
  email: string;
  password: string;
}

const SignUpWithEmail: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  console.log('errors:', errors);

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
    <div className={styles.formContainer}>
      <div className={styles.form}>
        {loading === true ? <p>loading...</p> : null}
        <div className={styles.logo}>
          <img
            style={{ width: '150px' }}
            src='logo_e-commerce.png'
            alt='E-commerce'
          />
        </div>
        <h2 style={{ color: '#333' }}>Sign up to E-commerce</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            E-mail:
            <input
              style={errors.email && { borderColor: 'red' }}
              placeholder='name@company.com'
              {...register('email', {
                required: { value: true, message: 'e-mail is required' }, // Si no hay nada escrito en el input de email se coloca un mensaje
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Si en el input no se cumple con esta expreción regular se coloca un mensaje distinto
                  message: 'Invalid email'
                }
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span> // Si hay un error en el registro de usuario se muestra el mensaje en un span
            )}
          </label>
          <br />
          <label>
            Password:
            <input
              type='password'
              style={errors.password && { borderColor: 'red' }}
              placeholder='••••••••'
              {...register('password', {
                required: { value: true, message: 'Password is required' },
                minLength: { value: 6, message: 'Min 6 character' }
              })}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </label>
          <br />
          <button className={styles.submit} type='submit'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpWithEmail;
