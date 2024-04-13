import React, { useState } from 'react';
import styles from './CommentInput.module.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { userId } from '../../../redux/actions/userId';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { postComment } from '../../../redux/actions/postComment';
import LoaderMini from '../../LoaderMini/LoaderMini';

const Commentinput: React.FC<{ productId: string | undefined }> = ({
  productId
}): JSX.Element => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const user = userId.get();

  const dispatch = useDispatch<AppDispatch>();

  const { inputLoading } = useSelector((state: any) => state.comments);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleTextChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postComment({ productId, userId: user, text, rating }));
  };

  return (
    <div style={{ position: 'relative' }}>
      {inputLoading && (
        <div className={styles.loading}>
          <LoaderMini color='#fff' />
        </div>
      )}
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
    </div>
  );
};

export default Commentinput;
