import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LoginWithGoogle from '../LoginWithGoogle/LoginWithGoogle';
import { Link } from 'react-router-dom';
import styles from './LoginWithEmail.module.css';
import { FormData } from '../../interfaces/formData';

const LoginWhitEmail: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    setLoading(true); // Comienza  a ejecutarse la funcion
    const { email, password } = data;
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false); // Si el usuario se logueó correctamente termina el loading
    } catch (error) {
      setLoading(false); // Si hay un error también
      console.error('Error: ', error);
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
        <h2 style={{ color: '#333' }}> Sign in to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Your e-mail:
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
              style={errors.password && { borderColor: 'red' }}
              type='password'
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
            Sign in
          </button>
        </form>
        <div className={styles.signUp}>
          <p>Don’t have an account yet? </p>
          <Link style={{ fontSize: 'small' }} to='/signUp'>
            Sign Up
          </Link>
        </div>
        <div className={styles.flexItemsCenter}>
          <hr />
          <span>or</span>
          <hr />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <LoginWithGoogle />
        </div>
      </div>
    </div>
  );
};

export default LoginWhitEmail;
