import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

if (process.env.BROWSER) {
  require('./spinner.css');
}

export const spinner = (props) => {
  if (!props.isLoading) {
    return null;
  }

  return (
    <div
      className="Spinner"
    >
      <div
        className="rect1"
      />
      <div
        className="rect2"
      />
      <div
        className="rect3"
      />
      <div
        className="rect4"
      />
      <div
        className="rect5"
      />
    </div>
  );
};

spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.isLoading.state });

export default connect(mapStateToProps, null)(spinner);
