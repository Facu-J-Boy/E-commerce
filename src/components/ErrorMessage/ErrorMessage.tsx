import React from 'react';
import styles from './ErrorMessage.module.css';
import { MdErrorOutline } from 'react-icons/md';

interface errorProps {
  type: string;
  message: string;
}

const ErrorMessage: React.FC<errorProps> = ({ type, message }): JSX.Element => {
  return (
    <>
      {type === 'search' ? (
        <div className={styles.searchError}>
          <p>{message}</p>
        </div>
      ) : type === 'fetch' ? (
        <div className={styles.errorMessage}>
          <div className={styles.icon}>
            <MdErrorOutline />
          </div>
          <h1>{message}</h1>
        </div>
      ) : null}
    </>
  );
};

export default ErrorMessage;
