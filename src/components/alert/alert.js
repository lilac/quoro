import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

if (process.env.BROWSER) {
  require('./alert.css');
}

export const alert = (props) => {
  const { isPositive, message } = props;
  if (!message) {
    return null;
  }

  const style = isPositive ? 'alert-success' : 'alert-danger';
  return (
    <div
      className={`Alert alert ${style}`}
    >
      {message}
    </div>
  );
};

alert.propTypes = {
  message: PropTypes.string.isRequired,
  isPositive: PropTypes.bool.isRequired,
};

const mapStateToProps = state =>
  ({ message: state.message.message, isPositive: state.message.isPositive });

export default connect(mapStateToProps, null)(alert);
