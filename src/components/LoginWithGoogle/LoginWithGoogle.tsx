import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../../Firebase';
import logo from './google-logo.png';
import styles from './LoginWithGoogle.module.css';

const LoginWithGoogle: React.FC = (): JSX.Element => {
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, provider);
      await getRedirectResult(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button className={styles.LogInGoogle} onClick={handleSignInWithGoogle}>
        <img style={{ width: '30px', height: '30px' }} src={logo} alt='' />
        Continue with Google
      </button>
    </div>
  );
};

export default LoginWithGoogle;
