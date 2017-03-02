import { config } from 'dotenv';
import { Server } from 'http';
import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';

import reducers from './reducers/index';
import template from './template';
import routes from './routes';
import apiRoutes from './features/index';

config();

const app = Express();
const appServer = Server(app);
const store = createStore(reducers);

app.use('/static', Express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
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
});

const port = process.env.PORT || 3000;

appServer.listen(port, (err) => {
  if (err) {
    return console.error(err.message);
  }
  return console.info(`Server is running at localhost:${port}`);
});
