import React from 'react';
import { Switch, Route } from 'react-router';
import LoginBox from '../login-box/login-box';
import NotFound from '../not-found/not-found';
import RegisterForm from '../register-form/register-form';
import Authorized from '../authorized/authorized';
import Alert from '../alert/alert';
import Spinner from '../spinner/spinner';

if (process.env.BROWSER) {
  require('./routes.css');
}

const routes = () => (
  <div className="site-wrapper">
    <Switch>
      <Route path="/login" component={LoginBox} />
      <Route path="/register" component={RegisterForm} />
      <Authorized />
      <Route component={NotFound} />
    </Switch>
    <Spinner />
    <Alert />
  </div>
);

export default routes;
