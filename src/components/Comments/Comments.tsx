import React from 'react';
import styles from './Comments.module.css';
import { comment } from '../../interfaces/comments';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Comments: React.FC<comment> = ({ text, rating }): JSX.Element => {
  let totalRating = 0;

  if (rating && typeof rating === 'number') {
    totalRating = Math.floor(rating);
  }

  const stars = Array.from({ length: 5 }, (_, index) =>
    index < totalRating ? (
      <AiFillStar key={index} size={20} style={{ color: '#131c46' }} />
    ) : (
      <AiOutlineStar key={index} size={20} style={{ color: '#131c46' }} />
    )
  );

  return (
    <div className={styles.comment}>
      <div style={{ marginRight: 10 }}>{stars}</div>
      <p>{text}</p>
    </div>
  );
};

export default Comments;
