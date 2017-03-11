import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../search-box/search-box';

if (process.env.BROWSER) {
  require('./navbar.css');
}

const navbar = props => (
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
      <span className="navbar-toggler-icon" />
    </button>
    <Link className="Navbar-title navbar-brand" to="/">{props.title}</Link>

    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/question">Add Question</Link>
        </li>
      </ul>
      <SearchBox submit={query => console.log(query)} />
      <div className="Navbar-username navbar-text">
        <span>{props.username}</span>
      </div>
    </div>
  </nav>
);

navbar.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string,
  searchQuestions: PropTypes.func,
};

navbar.defaultProps = {
  title: 'Quoro',
  username: 'Unknown',
};

export default navbar;
