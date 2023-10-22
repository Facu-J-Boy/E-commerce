import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = (): JSX.Element => {
  return (
    <>
      <span className={styles.loader}></span>
    </>
  );
};

export default Loader;
