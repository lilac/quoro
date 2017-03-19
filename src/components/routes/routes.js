import React from 'react';
import { Switch, Route } from 'react-router';
import App from '../app/app';
import Question from '../question/question';
import LoginBox from '../login-box/login-box';
import NotFound from '../not-found/not-found';
import RegisterForm from '../register-form/register-form';
import Navbar from '../navbar/navbar';
import Alert from '../alert/alert';

if (process.env.BROWSER) {
  require('./routes.css');
}

const routes = () => (
  <div className="site-wrapper">
    <Route path="/" component={Navbar} />
    <div className="content-wrapper">
      <Switch>
        <Route path="/login" component={LoginBox} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/questions/:id" component={Question} />
        <Route path="/" exact component={App} />
        <Route component={NotFound} />
      </Switch>
      <Alert />
    </div>
  </div>
);

export default routes;
