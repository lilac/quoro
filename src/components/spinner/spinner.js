import React from 'react';

if (process.env.BROWSER) {
  require('./spinner.css');
}

const spinner = () => (
  <div className="Spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

export default spinner;
