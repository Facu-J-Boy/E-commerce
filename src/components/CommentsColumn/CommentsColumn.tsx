import React from 'react';
import { commentsState } from '../../redux/reducers/commentsReducer';
import Comments from '../Comments/Comments';
import styles from './CommentsColumn.module.css';

const CommentsColumn: React.FC<commentsState> = ({
  comments,
  commentsLoading
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <hr />
      <h2 className={styles.title}>Comments</h2>
      {commentsLoading ? (
        <>loading...</>
      ) : (
        <div className={styles.commentsContainer}>
          {comments.map((e) => (
            <Comments email={e.email} body={e.body} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsColumn;
