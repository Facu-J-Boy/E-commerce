import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignUpWithEmail.module.css';
import { FormData } from '../../interfaces/formData';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { signUp } from '../../redux/actions/signUp';
import LoaderMini from '../LoaderMini/LoaderMini';
import Notification from '../Notification/Notification';

const SignUpWithEmail: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { userLoading, userError } = useSelector((state: any) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    dispatch(signUp({ email, password }));
  };

  return (
    <>
      {userError && <Notification text={userError} />}
      <div className={styles.formContainer}>
        <div className={styles.form}>
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
                  required: { value: true, message: 'Email is required' }, // Si no hay nada escrito en el input de email se coloca un mensaje
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
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  alignItems: 'center'
                }}
              >
                <input
                  type={!showPassword ? 'password' : 'text'} // Si showPassword es false no se mostrará la contraseña
                  style={errors.password && { borderColor: 'red' }}
                  placeholder='••••••••'
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required'
                    },
                    minLength: { value: 6, message: 'Min 6 character' }
                  })}
                />
                <button
                  type='button'
                  style={{
                    position: 'absolute',
                    right: '3px',
                    padding: '5px',
                    borderRadius: '50px',
                    backgroundColor: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {!showPassword ? (
                    <AiOutlineEyeInvisible size={25} /> // Si showPasword es false el icono será el ojo tachado
                  ) : (
                    <AiOutlineEye size={25} /> // Si showPassword es true el icono será el ojo normal
                  )}
                </button>
              </div>
              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </label>
            <br />
            <button
              className={!userLoading ? styles.submit : styles.submit_disable}
              disabled={userLoading}
              type='submit'
            >
              {!userLoading ? 'Sign Up' : <LoaderMini />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpWithEmail;
