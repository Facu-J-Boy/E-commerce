import React from 'react';
import styles from './LoadingScreen.module.css';

const Loadingscreen: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <img src='/logo_e-commerce.png' alt='logo' />
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loadingscreen;
