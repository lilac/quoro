import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from '../login-form/login-form';

if (process.env.BROWSER) {
  require('./login-box.css');
}

const loginBox = (props) => {
  const { token } = props.user;

  if (token) {
    return (<Redirect to="/" />);
  }

  return (
    <div
      className="LoginBox container"
    >
      <div
        className="welcome-text text-center"
      >
        <h1
          className="display-1"
        >
          Quoro
        </h1>
        <p
          className="lead"
        >
          Going online and asking <strong>questions</strong> is the best way to learn. - Tom Felton
        </p>
      </div>
      <div
        className="LoginBox-box"
      >
        <div
          className="row align-items-center"
        >
          <div
            className="col text-center"
          >
            <h2>Dont wish it were easier, wish you were better!</h2>
          </div>
          <div
            className="col"
          >
            <LoginForm />
            Dont have an account yet?&nbsp;
            <Link
              to="/register"
            >
              Register.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

loginBox.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, null)(loginBox);
