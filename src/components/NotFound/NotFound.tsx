import React from 'react';
import styles from './NotFound.module.css';
import { BiErrorCircle } from 'react-icons/bi';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <BiErrorCircle size={50} />
      <h1>404 Not Found</h1>
    </div>
  );
};

export default NotFound;
