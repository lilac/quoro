import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';

import Navbar from '../navbar/navbar';
import App from '../app/app';
import Question from '../question/question';
import UserPanel from '../user-panel/user-panel';
import NotFound from '../not-found/not-found';
import CategoryQuestions from '../category-questions/category-questions';

if (process.env.BROWSER) {
  require('./authorized.css');
}

const authorized = (props) => {
  const { token, login, username, id } = props.user;
  if (!token || !login || !username || !id) {
    return (<Redirect to="/login" />);
  }

  return (
    <div
      className="Authorized"
    >
      <header>
        <Route
          path="/"
          component={Navbar}
        />
      </header>
      <section
        className="Authorized-content"
      >
        <Switch>
          <Route
            path="/categories/:id"
            component={CategoryQuestions}
          />
          <Route
            path="/questions/:id"
            component={Question}
          />
          <Route
            path="/user"
            component={UserPanel}
          />
          <Route
            path="/"
            exact
            component={App}
          />
          <Route
            component={NotFound}
          />
        </Switch>
      </section>
    </div>
  );
};

authorized.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, null)(authorized);
