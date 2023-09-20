import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignUpWithEmail.module.css';

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
              type='email'
              placeholder='name@company.com'
              {...register('email')}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type='password'
              placeholder='••••••••'
              {...register('password')}
            />
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
