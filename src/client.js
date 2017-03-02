import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppRoutes from './components/app-routes/app-routes';
import reducers from './reducers/index';

let preloadedState;

try {
  preloadedState = JSON.parse(window.PRELOADED_STATE);
} catch (e) {
  preloadedState = null;
}

console.log('preloaded state', preloadedState);

const store = createStore(reducers, preloadedState);

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRoutes />
    </Provider>, document.getElementById('root'));
};
