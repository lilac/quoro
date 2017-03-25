import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const questionLink = (props) => {
  const { id, title } = props;

  return (
    <Link to={`/questions/${id}`}>{title}</Link>
  );
};

questionLink.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default questionLink;
