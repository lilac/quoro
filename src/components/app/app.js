import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar/navbar';

if (process.env.BROWSER) {
  require('./app.css');
}

export const app = (props) => {
  if (!props.user) {
    return (<div className="App-login">Please log in</div>);
  }

  return (
    <div className="App">
      <Navbar />
      {props.children}
    </div>
  );
};

app.propTypes = {
  user: PropTypes.object,
};

app.defaultProps = {
  children: null,
  user: null,
};

// user.activeUser

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, null)(app);
