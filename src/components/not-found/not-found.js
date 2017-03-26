import React from 'react';
import { Link } from 'react-router-dom';

if (process.env.BROWSER) {
  require('./not-found.css');
}

const notFound = () => (
  <div
    className="container"
  >
    <h1>Not found</h1>
    <Link
      to="/"
    >
      Home
    </Link>
  </div>
);

export default notFound;
