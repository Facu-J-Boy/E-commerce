import React, { useEffect, useState } from 'react';
import Comments from '../Comments/Comments';
import styles from './CommentsColumn.module.css';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../redux/store';
import { getComments } from '../../redux/actions/getComments';
import { useParams } from 'react-router-dom';
import { comment } from '../../interfaces/comments';
import { clearComments } from '../../redux/reducers/commentsReducer';
import CommentInput from './CommentInput/CommentInput';

const CommentsColumn: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { comments, currentPage, totalPages, commentsLoading, totalCount } =
    useSelector((state: storeInterface) => state.comments);

  const { error } = useSelector((state: storeInterface) => state.product);

  const { id } = useParams();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getComments({ id, page }));
  }, [dispatch, id, page]);

  useEffect(() => {
    return () => {
      dispatch(clearComments());
    };
  }, [dispatch]);

  const handleShowMore = async (number: number) => {
    setPage(number);
  };
  return (
    <>
      {!error ? (
        <div className={styles.container}>
          <hr />
          <h2 className={styles.title}>Comments</h2>
          <CommentInput productId={id} />
          <div className={styles.commentsContainer}>
            {!commentsLoading && comments.length === 0 ? (
              <p className={styles.message}>There are no comments</p>
            ) : null}
            {comments?.map((e: comment) => (
              <Comments
                key={e._id}
                _id={e._id}
                rating={e.rating}
                text={e.text}
                date={e.date}
                user={e.user}
              />
            ))}
            {commentsLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Loader color='#333' />
              </div>
            )}

            <button
              className={styles.show_more_button}
              style={
                currentPage === totalPages ||
                commentsLoading ||
                totalCount === 0
                  ? { visibility: 'hidden' }
                  : {}
              }
              onClick={() => {
                handleShowMore(page + 1);
              }}
            >
              Show more
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CommentsColumn;
