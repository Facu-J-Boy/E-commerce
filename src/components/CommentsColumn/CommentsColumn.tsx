import React, { useEffect, useState } from 'react';
import Comments from '../Comments/Comments';
import styles from './CommentsColumn.module.css';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getComments } from '../../redux/actions/getComments';
import { useParams } from 'react-router-dom';
import { comment } from '../../interfaces/comments';
import Commentinput from './CommentInput/Commentinput';

const CommentsColumn: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { comments, currentPage, totalPages, commentsLoading } = useSelector(
    (state: any) => state.comments
  );

  const { id } = useParams();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getComments({ id, page }));
  }, [dispatch, id, page]);

  const handleShowMore = async (number: number) => {
    setPage(number);
  };
  return (
    <div className={styles.container}>
      <hr />
      <h2 className={styles.title}>Comments</h2>
      {comments.length === 0 ? null : <Commentinput productId={id} />}

      <div className={styles.commentsContainer}>
        {comments?.map((e: comment) => (
          <Comments key={e._id} rating={e.rating} text={e.text} />
        ))}
        {commentsLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Loader />
          </div>
        )}
        {!commentsLoading && (
          <button
            className={styles.show_more_button}
            style={currentPage === totalPages ? { visibility: 'hidden' } : {}}
            onClick={() => {
              handleShowMore(page + 1);
            }}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentsColumn;
