import React, { useCallback, useEffect, useState } from 'react';
import styles from './Comments.module.css';
import { comment } from '../../interfaces/comments';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaTrashCan } from 'react-icons/fa6';
import DeleteComment from './DeleteComment/DeleteComment';
import { useSelector } from 'react-redux';
import LoaderMini from '../LoaderMini/LoaderMini';
import { format } from 'date-fns';
import { storeInterface } from '../../redux/store';

const Comments: React.FC<comment> = ({
  _id,
  text,
  rating,
  date,
  user
}): JSX.Element => {
  const [deleteMessage, setDeleteMessage] = useState<boolean>(false);

  const { deletingComment } = useSelector(
    (state: storeInterface) => state.comments
  );

  const toggleDelete = useCallback(() => {
    setDeleteMessage(!deleteMessage);
  }, [deleteMessage]);

  useEffect(() => {
    if (deleteMessage === true) {
      document.body.addEventListener('click', toggleDelete);
    }
    return () => {
      document.body.removeEventListener('click', toggleDelete);
    };
  }, [deleteMessage, toggleDelete]);

  let totalRating = 0;

  if (rating && typeof rating === 'number') {
    totalRating = Math.floor(rating);
  }

  const { User } = useSelector((state: storeInterface) => state.user);

  const stars = Array.from({ length: 5 }, (_, index) =>
    index < totalRating ? (
      <AiFillStar key={index} size={20} style={{ color: '#131c46' }} />
    ) : (
      <AiOutlineStar key={index} size={20} style={{ color: '#131c46' }} />
    )
  );

  const newDate: Date = new Date(date ?? '');

  return (
    <>
      {deleteMessage && typeof _id === 'string' ? (
        <DeleteComment id={_id} />
      ) : null}
      <div style={{ position: 'relative' }}>
        {deletingComment === _id && (
          <div className={styles.loading}>
            <LoaderMini color='#fff' />
          </div>
        )}
        <div className={styles.comment}>
          <div className={styles.header}>
            <div style={{ marginRight: 10 }}>{stars}</div>
            <div className={styles.rigth_side}>
              {User?._id === user && (
                <div>
                  <button onClick={toggleDelete}>
                    <FaTrashCan />
                  </button>
                </div>
              )}
              <p>{format(newDate, 'dd MMM. yyyy')}</p>
            </div>
          </div>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default Comments;
