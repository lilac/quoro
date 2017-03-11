import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import Routes from './routes';

const store = createStore(reducer, window.PRELOADED_STATE, applyMiddleware(thunk));

console.log(window.PRELOADED_STATE);

window.onload = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <Routes />
      </Provider>
    </BrowserRouter>, document.getElementById('root'));
};

export default store;
