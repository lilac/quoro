import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import template from './template';
import Routes from './components/routes/routes';

const store = createStore(reducers, undefined, applyMiddleware(thunk));

export default (req, res) => {
  const context = {};
  const html = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Provider store={store}>
        <Routes url={req.url} />
      </Provider>
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    const markup = template(html, store.getState());
    res.send(markup);
  }

  res.end();
};


  // match(
  //   { routes, location: req.url },
  //   (err, redirectLocation, renderProps) => {
  //     if (err) {
  //       return res.status(500).send(err.message);
  //     }

  //     const initialState = JSON.stringify(store.getState());

  //     let component;
  //     if (renderProps) {
  //       component = renderToString(
  //         <Provider store={store}>
  //           <RouterContext {...renderProps} />
  //         </Provider>
  //       );
  //     } else {
  //       // component = renderToString(<NotFound />);
  //       res.status(404);
  //     }
  //     return res.send(template(component, initialState));
  //   }
  // );
