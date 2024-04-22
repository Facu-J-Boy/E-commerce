import React from 'react';
import styles from './LoadingScreen.module.css';
import Loader from '../Loader/Loader';

const Loadingscreen: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <img src='/logo_e-commerce.png' alt='logo' />
      <Loader color='#333' />
    </div>
  );
};

export default Loadingscreen;
