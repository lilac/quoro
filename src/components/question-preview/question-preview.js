import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../avatar/avatar';

if (process.env.BROWSER) {
  require('./question-preview.css');
}

const questionPreview = (props) => {
  const { id, title, content, addedAt, image } = props;
  const { day } = addedAt;

  return (
    <Link
      to={`/questions/${id}`}
      className="QuestionPreview list-group-item list-group-item-action flex-column align-items-start"
    >
      <div
        className="d-flex w-100 justify-content-between text-center"
      >
        <h5
          className="display-5"
        >
          {title}
        </h5>
        <small>Added at {day}</small>
      </div>
      <div
        className="justify-content-between w-100 d-flex"
      >
        <p>
          {content}
        </p>
        <Avatar
          src={image}
          alt={title}
          className="QuestionPreview-image rounded"
        />
      </div>
    </Link>
  );
};

questionPreview.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  addedAt: PropTypes.object.isRequired,
  image: PropTypes.string,
};

questionPreview.defaultProps = {
  image: '',
};

export default questionPreview;
