import React from 'react';
import { Link } from 'react-router-dom';

const categoryLink = (props) => {
  const { categoryId, title } = props;
  return (
    <Link
      className="list-group-item"
      to={`/categories/${categoryId}`}
    >
      {title}
    </Link>
  );
};

export default categoryLink;
