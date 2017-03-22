import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

if (process.env.BROWSER) {
  require('./alert.css');
}

const alert = (props) => {
  const { message: { isPositive, message } } = props;

  if (!message) {
    return null;
  }

  const style = isPositive ? 'alert-success' : 'alert-danger';

  return (
    <div className={`Alert alert ${style}`} >
      {message}
    </div>
  );
};

alert.propTypes = {
  message: PropTypes.object,
};

const mapStateToProps = state => ({ message: state.message });

export default connect(mapStateToProps, null)(alert);
