import React, { PropTypes } from 'react';

const closeButton = (props) => {
  const { onClick, isVisible } = props;

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className="close"
      aria-label="Close"
      onClick={() => onClick()}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

closeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
};

closeButton.defaultProps = {
  isVisible: true,
};

export default closeButton;
