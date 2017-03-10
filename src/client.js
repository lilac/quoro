import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppRoutes from './components/app-routes/app-routes';
import reducer from './reducers/index';

let preloadedState;

try {
  preloadedState = JSON.parse(window.PRELOADED_STATE) || undefined;
} catch (e) {
  preloadedState = undefined;
}

console.log('preloaded state', preloadedState);

const store = createStore(reducer, preloadedState, applyMiddleware(thunk));

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRoutes />
    </Provider>, document.getElementById('root'));
};

export default store;
