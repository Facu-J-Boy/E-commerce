import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LoginWithGoogle from '../LoginWithGoogle/LoginWithGoogle';
import { Link } from 'react-router-dom';
import styles from './LoginWithEmail.module.css';

const LoginWhitEmail: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();

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
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <label className={styles.label}>Your e-mail:</label>
            <input
              className={styles.input}
              type='email'
              placeholder='name@company.com'
              {...register('email')}
            />
          </>
          <br />
          <>
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type='password'
              placeholder='••••••••'
              {...register('password')}
            />
          </>
          <br />
          <button type='submit'>Iniciar Sesión</button>
        </form>
        <div className={styles.signUp}>
          <p>Don’t have an account yet? </p>
          <Link to='/signUp'>Sign Up</Link>
        </div>
        <div className={styles.flexItemsCenter}>
          <hr />
          <span>or</span>
          <hr />
        </div>
        <LoginWithGoogle />
      </div>
    </div>
  );
};

export default LoginWhitEmail;
