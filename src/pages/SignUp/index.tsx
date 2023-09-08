import React, { useEffect } from 'react';
import SignUpWithEmail from '../../components/SignUpWithEmail/SignUpWithEmail';
import { auth } from '../../Firebase';

const SignUp: React.FC = (): JSX.Element => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User: ', user);
      }
    });
  }, []);
  return (
    <div>
      <SignUpWithEmail />
    </div>
  );
};

export default SignUp;
