import React from 'react';

interface comments {
  email: string;
  body: string;
}

const Comments: React.FC<comments> = ({ email, body }): JSX.Element => {
  return (
    <div>
      <h1>{email}</h1>
      <p>{body}</p>
    </div>
  );
};

export default Comments;
