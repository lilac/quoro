import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const questionPreview = (props) => {
  console.log(props);
  if (!props.id) {
    return null;
  }

  return (
    <Link
      to={`/questions/${props.id}`}
      className="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.title}</h5>
        <small>3 days ago</small>
      </div>
      <p className="mb-1">
        {props.content}
      </p>
      <small>Donec id elit non mi porta.</small>
    </Link>
  );
};

export default questionPreview;
