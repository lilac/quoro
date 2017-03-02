import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./app.css');
}

const app = props => (
  <div className="App">
    <h1>SSR!</h1>
    {props.children}
  </div>
);

app.propTypes = {
  children: PropTypes.array,
};

export default app;
