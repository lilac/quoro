import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut } from '../../actions/user';

import SearchBox from '../search-box/search-box';

if (process.env.BROWSER) {
  require('./navbar.css');
}

const navbar = props => (
  <nav
    className="Navbar navbar fixed-top navbar-light bg-faded"
  >
    <div
      className="d-flex justify-content-between"
    >
      <div>
        <Link
          className="Navbar-title navbar-brand"
          to="/"
        >
          Quoro
        </Link>
      </div>

      <div
        className="Navbar-search"
      >
        <SearchBox />
      </div>

      <div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => props.logOut(props.username)}
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
);

navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ username: state.user.username });

export default connect(mapStateToProps, { logOut })(navbar);


// <button
//   className="btn btn-info"
//   onClick={() => props.logOut(props.username)}
// >
//   Log out
// </button>
