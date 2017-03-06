import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers/index';

const mockState = (Component, preloadedState) => {
  const store = createStore(reducers, preloadedState);
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

export default mockState;
