import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../actions/user';

import Avatar from '../avatar/avatar';
import LastViewedQuestions from '../last-viewed-questions/last-viewed-questions';

if (process.env.BROWSER) {
  require('./user-preview.css');
}

export const userPreview = (props) => {
  const { username, avatar } = props.user;
  return (
    <div
      className="UserPreview card"
    >
      <Avatar
        src={avatar}
        alt="User's avatar"
        className="UserPreview-image img-fluid"
      />
      <div
        className="card-block"
      >
        <h3
          className="card-title text-center"
        >
          {username}
        </h3>
        <LastViewedQuestions />
        <Link
          className="btn btn-primary"
          to="/user"
        >
          Profile
        </Link>
        <button
          className="UserPreview-logout btn btn-primary"
          onClick={() => props.logOut(username)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

userPreview.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { logOut })(userPreview);
