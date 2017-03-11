import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Navbar from '../navbar/navbar';

if (process.env.BROWSER) {
  require('./app.css');
}

export const app = (props) => {
  if (!props.user) {
    return (<Redirect from="/" to="/login" />);
  }

  return (
    <div className="App">
      <Navbar username={props.user.username} title="Quoro" />
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

const mapStateToProps = state => ({ user: state.user.activeUser });

export default connect(mapStateToProps, null)(app);
