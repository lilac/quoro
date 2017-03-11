import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import LoginForm from '../login-form/login-form';


const loginBox = (props) => {
  if (props.user) {
    return (<Redirect to="/" />);
  }

  return (
    <div className="LoginBox container">
      <div className="welcome-text text-center">
        <h1>Quoro</h1>
        <p>Description</p>
      </div>
      <div className="LoginBox-box">
        <div className="row align-items-center">
          <div className="col text-center">
            <p>Dont wish it were easier, wish you were better!</p>
          </div>
          <div className="col">
            <LoginForm />
            <Link to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ user: state.user.activeUser });

export default connect(mapStateToProps, null)(loginBox);
