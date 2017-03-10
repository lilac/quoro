import React from 'react';
import { Route } from 'react-router';
import App from './components/app/app';
import Question from './components/question/question';

export default (
  <Route path="/" component={App}>
    <Route path="/question/:id" component={Question} />
  </Route>
);
