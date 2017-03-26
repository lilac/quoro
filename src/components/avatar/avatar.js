import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./avatar.css');
}

export const avatar = (props) => {
  const { src, alt, className } = props;

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`Avatar ${className}`}
    />
  );
};

avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

avatar.defaultProps = {
  alt: 'Avatar',
  src: '',
  className: '',
};

export default avatar;
