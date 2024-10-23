import React from 'react';
import styles from './DeleteComment.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { deleting } from '../../../redux/reducers/commentsReducer';
import { deleteComment } from '../../../redux/actions/deleteComment';

const DeleteComment: React.FC<{ id: string }> = ({ id }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    dispatch(deleting(id));
    dispatch(deleteComment(id));
  };
  return (
    <div className={styles.body}>
      <div className={styles.delete_message}>
        <h3>You want to delete your comment?</h3>
        <button
          onClick={() => {
            handleDelete(id);
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default DeleteComment;
