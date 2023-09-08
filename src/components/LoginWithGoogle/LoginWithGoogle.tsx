import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../../Firebase';

const LoginWithGoogle = () => {
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
      <button onClick={handleSignInWithGoogle}>Google</button>
    </div>
  );
};

export default LoginWithGoogle;
