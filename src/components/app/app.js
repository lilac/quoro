import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar/navbar';

if (process.env.BROWSER) {
  require('./app.css');
}

export const app = (props) => {
  if (!props.user) {
    return (<h2 className="hehe">Please log in</h2>);
  }

  return (
    <div className="App">
      <Navbar />
      {props.children}
    </div>
  );
};

app.propTypes = {
  children: PropTypes.object,
  user: PropTypes.object,
};

app.defaultProps = {
  children: null,
  user: null,
};

const mapStateToProps = state => ({ user: state.users.user });

export default connect(mapStateToProps, null)(app);
