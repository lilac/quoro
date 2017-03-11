import React from 'react';
import { Switch, Route } from 'react-router';

import App from './components/app/app';
import Question from './components/question/question';
import LoginBox from './components/login-box/login-box';
import NotFound from './components/not-found/not-found';
import RegisterForm from './components/register-form/register-form';

const routes = () => (
  <Switch>
    <Route path="/login" component={LoginBox} />
    <Route path="/register" component={RegisterForm} />
    <Route path="/questions/:id" component={Question} />
    <Route path="/" exact component={App} />
    <Route component={NotFound} />
  </Switch>
);

export default routes;
