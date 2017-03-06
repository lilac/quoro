import React, { PropTypes } from 'react';
import SearchBox from '../search-box/search-box';

if (process.env.BROWSER) {
  require('./navbar.css');
}

const navbar = props => (
  <div className="Navbar navbar">
    <div className="Navbar-title navbar-brand">{props.title}</div>
    <SearchBox submit={query => props.searchQuestions(query)} />
    <div className="Navbar-username navbar-text">{props.username}</div>
  </div>
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
