import React, { useEffect } from 'react';
import LoginWhitEmail from '../../components/LoginWhitEmail/LoginWhitEmail';
import { auth } from '../../Firebase';

const Login: React.FC = (): JSX.Element => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User: ', user);
      }
    });
  }, []);
  return (
    <div>
      <LoginWhitEmail />
    </div>
  );
};

export default Login;
