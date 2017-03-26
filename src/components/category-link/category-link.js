import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const categoryLink = (props) => {
  const { categoryId, title } = props;
  return (
    <Link
      className="CategoryLink list-group-item"
      to={`/categories/${categoryId}`}
    >
      {title}
    </Link>
  );
};

categoryLink.propTypes = {
  categoryId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default categoryLink;
