import React from 'react';
import { commentsState } from '../../redux/reducers/commentsReducer';
import Comments from '../Comments/Comments';
import styles from './CommentsColumn.module.css';
import Loader from '../Loader/Loader';

const CommentsColumn: React.FC<commentsState> = ({
  comments,
  commentsLoading
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <hr />
      <h2 className={styles.title}>Comments</h2>
      {commentsLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className={styles.commentsContainer}>
          {comments?.map((e) => (
            <Comments key={e._id} rating={e.rating} text={e.text} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsColumn;
