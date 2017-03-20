import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBox from '../search-box/search-box';
import { logOut } from '../../actions/user';

if (process.env.BROWSER) {
  require('./navbar.css');
}

const navbar = (props) => {
  const { location: { pathname } } = props;
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  return (
    <nav className="Navbar navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span
          className="navbar-toggler-icon"
        />
      </button>
      <Link
        className="Navbar-title navbar-brand"
        to="/"
      >
        Quoro
      </Link>

      <SearchBox />

      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav">
          <li className="nav-item">
            Hello, <Link to="/user">{props.username}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

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
