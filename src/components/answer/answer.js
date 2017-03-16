import React from 'react';

const answer = (props) => {
  const { content, answerId } = props;
  return (
    <div className="Answer">
      <p>{content}</p>
    </div>
  );
};

export default answer;
