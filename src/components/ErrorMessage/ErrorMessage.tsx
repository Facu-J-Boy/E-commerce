import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage: React.FC<{ message: string }> = ({
  message
}): JSX.Element => {
  return (
    <div className={styles.Message}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
