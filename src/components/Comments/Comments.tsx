import React from 'react';
import styles from './Comments.module.css';

interface comments {
  email: string;
  body: string;
}

const Comments: React.FC<comments> = ({ email, body }): JSX.Element => {
  return (
    <div className={styles.comment}>
      <h4>{email}</h4>
      <p>{body}</p>
    </div>
  );
};

export default Comments;
