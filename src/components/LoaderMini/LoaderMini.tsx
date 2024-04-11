import React from 'react';
import styles from './LoaderMini.module.css';

const LoaderMini: React.FC<{ color: string }> = ({ color }): JSX.Element => {
  return (
    <span
      style={{ border: `2px solid ${color}`, borderBottomColor: 'transparent' }}
      className={styles.LoaderMini}
    ></span>
  );
};

export default LoaderMini;
