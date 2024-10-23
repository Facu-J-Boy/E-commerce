import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC<{ color: string }> = ({ color }): JSX.Element => {
  return (
    <>
      <span
        style={{
          border: `5px solid ${color}`,
          borderBottomColor: 'transparent'
        }}
        className={styles.loader}
      ></span>
    </>
  );
};

export default Loader;
