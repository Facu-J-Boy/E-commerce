import React, { useState } from 'react';
import styles from './CommentInput.module.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { userId } from '../../../redux/actions/userId';
import { IoSend } from 'react-icons/io5';

const Commentinput: React.FC<{ productId: string | undefined }> = ({
  productId
}): JSX.Element => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const user = userId.get();

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleTextChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('data: ', { productId, text, rating, userId: user });
  };

  return (
    <div className={styles.review_form}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleStarClick(value)}
          style={{ cursor: 'pointer' }}
        >
          {value <= rating ? (
            <AiFillStar size={20} style={{ color: '#131c46' }} />
          ) : (
            <AiOutlineStar size={20} style={{ color: '#131c46' }} />
          )}
        </span>
      ))}
      <form onSubmit={onSubmit}>
        <div className={styles.input}>
          <input
            className={styles.text_input}
            type='text'
            value={text}
            placeholder='Add a comment'
            onChange={(ev) => {
              handleTextChange(ev);
            }}
          />
          <button className={styles.submit_button} type='submit'>
            <IoSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Commentinput;
