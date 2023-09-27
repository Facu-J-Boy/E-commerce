import React from 'react';
import { commentsState } from '../../redux/reducers/commentsReducer';
import Comments from '../Comments/Comments';

const CommentsColumn: React.FC<commentsState> = ({
  comments,
  commentsLoading
}): JSX.Element => {
  return (
    <div>
      {commentsLoading ? (
        <>loading...</>
      ) : (
        <>
          {comments.map((e) => (
            <Comments email={e.email} body={e.body} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentsColumn;
