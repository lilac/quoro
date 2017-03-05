import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';

import reducers from './reducers/index';
import template from './template';
import routes from './routes';

const store = createStore(reducers);

export default (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      const initialState = JSON.stringify(store.getState());

      let component;
      if (renderProps) {
        component = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
      } else {
        // component = renderToString(<NotFound />);
        res.status(404);
      }
      return res.send(template(component, initialState));
    }
  );
};
